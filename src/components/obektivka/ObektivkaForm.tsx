import { useRef, useMemo } from 'react'
import type { ObektivkaFormData, Qarindosh, MehnatFaoliyati } from '@/types/obektivka'
import './ObektivkaForm.css'

interface Props {
  value: ObektivkaFormData
  onChange: (value: ObektivkaFormData) => void
}

const QARINDOSHLIGI_OPTIONS = [
  "Otasi",
  'Onasi',
  "Turmush o'rtog'i",
  'Qaynotasi',
  'Qaynonasi',
  'Akasi',
  'Ukasi',
  'Opasi',
  'Singlisi',
  "O'g'li",
  'Qizi',
]

export default function ObektivkaForm({ value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.size <= 1024 * 1024) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange({ ...value, rasm: reader.result as string })
      }
      reader.readAsDataURL(file)
    } else {
      alert('Fayl 1MB dan oshmasligi kerak')
    }
  }

  const updateField = <K extends keyof ObektivkaFormData>(field: K, val: ObektivkaFormData[K]) => {
    onChange({ ...value, [field]: val })
  }

  const updateQarindosh = (index: number, field: keyof Qarindosh, val: string) => {
    const list = [...value.qarindoshlar]
    list[index] = { ...list[index], [field]: val }
    onChange({ ...value, qarindoshlar: list })
  }
  const addQarindosh = () => {
    const item: Qarindosh = {
      qarindoshligi: '',
      fio: '',
      tugilganYiliJoyi: '',
      ishJoyiVaLavozimi: '',
      yashashJoyi: '',
    }
    onChange({ ...value, qarindoshlar: [...value.qarindoshlar, item] })
  }
  const removeQarindosh = (index: number) => {
    onChange({ ...value, qarindoshlar: value.qarindoshlar.filter((_, i) => i !== index) })
  }

  const updateMehnat = (index: number, field: keyof MehnatFaoliyati, val: string) => {
    const list = [...value.mehnatFaoliyatiRoyxat]
    list[index] = { ...list[index], [field]: val }
    onChange({ ...value, mehnatFaoliyatiRoyxat: list })
  }
  const addMehnat = () => {
    const item: MehnatFaoliyati = { dan: '', gacha: '', lavozim: '' }
    onChange({ ...value, mehnatFaoliyatiRoyxat: [...value.mehnatFaoliyatiRoyxat, item] })
  }
  const removeMehnat = (index: number) => {
    onChange({
      ...value,
      mehnatFaoliyatiRoyxat: value.mehnatFaoliyatiRoyxat.filter((_, i) => i !== index),
    })
  }

  const photoLabel = value.rasm ? 'Rasm tanlandi ✓' : 'Rasm tanlang (3x4)'

  const currentYear = new Date().getFullYear()
  const years = useMemo(
    () => Array.from({ length: currentYear - 1959 }, (_, i) => currentYear - i),
    [currentYear],
  )

  return (
    <div className="form-card">
      <h2 className="form-title">Ma'lumotlarni kiriting</h2>

      {/* Shaxsiy ma'lumot */}
      <section className="form-section">
        <h3 className="section-title">1. Shaxsiy ma'lumot</h3>

        <div className="grid-3">
          <div className="field">
            <label className="label">
              Familiya <span className="req">*</span>
            </label>
            <input
              value={value.familiya}
              onChange={(e) => updateField('familiya', e.target.value)}
              type="text"
              placeholder="Abdullayev"
              className="inp"
            />
          </div>
          <div className="field">
            <label className="label">
              Ism <span className="req">*</span>
            </label>
            <input
              value={value.ism}
              onChange={(e) => updateField('ism', e.target.value)}
              type="text"
              placeholder="Botir"
              className="inp"
            />
          </div>
          <div className="field">
            <label className="label">
              Sharif <span className="req">*</span>
            </label>
            <input
              value={value.sharif}
              onChange={(e) => updateField('sharif', e.target.value)}
              type="text"
              placeholder="Bahodirovich"
              className="inp"
            />
          </div>
        </div>

        <div className="field mt-2">
          <label className="label">
            Rasm (3×4) <span className="req">*</span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            className={'photo-btn' + (value.rasm ? ' photo-btn--done' : '')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span>{photoLabel}</span>
          </button>
          <p className="hint">Format: .jpg, .png | Maks: 1MB</p>
        </div>

        <div className="grid-2 mt-2">
          <div className="field">
            <label className="label">
              Tug'ilgan sana <span className="req">*</span>
            </label>
            <input
              value={value.tugilganSana}
              onChange={(e) => updateField('tugilganSana', e.target.value)}
              type="date"
              className="inp"
            />
          </div>
          <div className="field">
            <label className="label">
              Tug'ilgan joyi <span className="req">*</span>
            </label>
            <input
              value={value.tugilganJoyi}
              onChange={(e) => updateField('tugilganJoyi', e.target.value)}
              type="text"
              placeholder="Qashqadaryo viloyati, Shahrisabz tumani"
              className="inp"
            />
          </div>
        </div>

        <div className="grid-2 mt-2">
          <div className="field">
            <label className="label">
              Millati <span className="req">*</span>
            </label>
            <input
              value={value.millati}
              onChange={(e) => updateField('millati', e.target.value)}
              type="text"
              placeholder="o'zbek"
              className="inp"
            />
          </div>
          <div className="field">
            <label className="label">Partiyaviyligi</label>
            <input
              value={value.partiyaviyligi}
              onChange={(e) => updateField('partiyaviyligi', e.target.value)}
              type="text"
              placeholder="Partiyasiz"
              className="inp"
            />
          </div>
        </div>
      </section>

      {/* Ta'lim */}
      <section className="form-section">
        <h3 className="section-title">2. Ta'lim</h3>

        <div className="grid-2">
          <div className="field">
            <label className="label">
              Ma'lumoti <span className="req">*</span>
            </label>
            <select
              value={value.malumoti}
              onChange={(e) => updateField('malumoti', e.target.value)}
              className="inp"
            >
              <option value="">Tanlang</option>
              <option value="Oliy">Oliy</option>
              <option value="O'rta maxsus">O'rta maxsus</option>
              <option value="O'rta">O'rta</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Ma'lumoti bo'yicha mutaxassisligi</label>
            <input
              value={value.malumotiMutaxassisligi}
              onChange={(e) => updateField('malumotiMutaxassisligi', e.target.value)}
              type="text"
              placeholder="Falsafa"
              className="inp"
            />
          </div>
        </div>

        <div className="field mt-2">
          <label className="label">Qaysi o'quv yurtini tamomlagan (yil va nomi)</label>
          <input
            value={value.tamomlagan}
            onChange={(e) => updateField('tamomlagan', e.target.value)}
            type="text"
            placeholder="1997 yilda Toshkent davlat universiteti"
            className="inp"
          />
        </div>

        <div className="grid-2 mt-2">
          <div className="field">
            <label className="label">Ilmiy darajasi</label>
            <input
              value={value.ilmiyDarajasi}
              onChange={(e) => updateField('ilmiyDarajasi', e.target.value)}
              type="text"
              placeholder="Yo'q"
              className="inp"
            />
          </div>
          <div className="field">
            <label className="label">Ilmiy unvoni</label>
            <input
              value={value.ilmiyUnvoni}
              onChange={(e) => updateField('ilmiyUnvoni', e.target.value)}
              type="text"
              placeholder="Yo'q"
              className="inp"
            />
          </div>
        </div>
      </section>

      {/* Qo'shimcha */}
      <section className="form-section">
        <h3 className="section-title">3. Qo'shimcha ma'lumot</h3>

        <div className="grid-2">
          <div className="field">
            <label className="label">Qaysi chet tillarini biladi</label>
            <input
              value={value.qaysiChetTillarini}
              onChange={(e) => updateField('qaysiChetTillarini', e.target.value)}
              type="text"
              placeholder="Rus tili (erkin), Ingliz tili (o'rta)"
              className="inp"
            />
          </div>
          <div className="field">
            <label className="label">Harbiy (maxsus) unvoni</label>
            <input
              value={value.harbiyUnvoni}
              onChange={(e) => updateField('harbiyUnvoni', e.target.value)}
              type="text"
              placeholder="yo'q"
              className="inp"
            />
          </div>
        </div>

        <div className="field mt-2">
          <label className="label">Davlat mukofotlari bilan taqdirlanganmi (qanaqa)</label>
          <input
            value={value.davlatMukofotlari}
            onChange={(e) => updateField('davlatMukofotlari', e.target.value)}
            type="text"
            placeholder="yo'q"
            className="inp"
          />
        </div>

        <div className="field mt-2">
          <label className="label">
            Xalq deputatlari Kengashi deputatimi yoki boshqa saylanadigan organlar a'zosimi
          </label>
          <input
            value={value.xalqDeputatlari}
            onChange={(e) => updateField('xalqDeputatlari', e.target.value)}
            type="text"
            placeholder="yo'q"
            className="inp"
          />
        </div>

        <div className="field mt-2">
          <label className="label">Telefon raqami</label>
          <input
            value={value.telefon}
            onChange={(e) => updateField('telefon', e.target.value)}
            type="text"
            placeholder="+998 (90) 123-45-67"
            className="inp"
          />
        </div>
      </section>

      {/* Joriy lavozim */}
      <section className="form-section">
        <h3 className="section-title">4. Joriy lavozim</h3>

        <div className="field">
          <label className="label">Joriy lavozimi (to'liq)</label>
          <input
            value={value.joriyLavozimToliq}
            onChange={(e) => updateField('joriyLavozimToliq', e.target.value)}
            type="text"
            placeholder="O'zbekiston Milliy universiteti rektori"
            className="inp"
          />
        </div>
        <div className="field mt-2">
          <label className="label">Lavozimga tayinlangan sana</label>
          <input
            value={value.joriyLavozimSanasi}
            onChange={(e) => updateField('joriyLavozimSanasi', e.target.value)}
            type="text"
            placeholder="2010 yil 6 sentabrdan"
            className="inp"
          />
        </div>
      </section>

      {/* Mehnat faoliyati */}
      <section className="form-section">
        <div className="section-header">
          <h3 className="section-title">5. Mehnat faoliyati</h3>
          <button onClick={addMehnat} type="button" className="add-btn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Qo'shish
          </button>
        </div>
        <p className="hint mb-2">
          Yangi ish joyini qo'shing. "Gacha"da hozirgi vaqt uchun <strong>h.v.</strong> ni tanlang.
        </p>

        {value.mehnatFaoliyatiRoyxat.length === 0 && (
          <div className="empty-state">
            Mehnat faoliyati qo'shilmagan. "Qo'shish" tugmasini bosing.
          </div>
        )}

        {value.mehnatFaoliyatiRoyxat.map((item, index) => (
          <div key={index} className="mehnat-item">
            <div className="mehnat-item-header">
              <span className="mehnat-num">{index + 1}</span>
              <button onClick={() => removeMehnat(index)} type="button" className="remove-btn">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="grid-2 mt-1">
              <div className="field">
                <label className="label">Dan (boshlanish)</label>
                <select
                  value={item.dan}
                  onChange={(e) => updateMehnat(index, 'dan', e.target.value)}
                  className="inp"
                >
                  <option value="">— yilni tanlang —</option>
                  {years.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label">Gacha (tugash)</label>
                <select
                  value={item.gacha}
                  onChange={(e) => updateMehnat(index, 'gacha', e.target.value)}
                  className="inp"
                >
                  <option value="">— yilni tanlang —</option>
                  <option value="h.v.">h.v. (hozirgi vaqtgacha)</option>
                  {years.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field mt-1">
              <label className="label">Ish joyi, lavozimi va tashkilot nomi</label>
              <input
                value={item.lavozim}
                onChange={(e) => updateMehnat(index, 'lavozim', e.target.value)}
                type="text"
                placeholder="O'qituvchi, Toshkent davlat universiteti"
                className="inp"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Qarindoshlar */}
      <section className="form-section" style={{ borderBottom: 'none' }}>
        <div className="section-header">
          <h3 className="section-title">6. Yaqin qarindoshlari</h3>
          <button onClick={addQarindosh} type="button" className="add-btn">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Qo'shish
          </button>
        </div>

        {value.qarindoshlar.length === 0 && (
          <div className="empty-state">Qarindosh qo'shilmagan. "Qo'shish" tugmasini bosing.</div>
        )}

        {value.qarindoshlar.map((q, index) => (
          <div key={index} className="qarindosh-item">
            <div className="mehnat-item-header">
              <span className="mehnat-num">{index + 1}. Qarindosh</span>
              <button onClick={() => removeQarindosh(index)} type="button" className="remove-btn">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid-2 mt-1">
              <div className="field">
                <label className="label">Qarindoshligi</label>
                <select
                  value={q.qarindoshligi}
                  onChange={(e) => updateQarindosh(index, 'qarindoshligi', e.target.value)}
                  className="inp"
                >
                  <option value="">Tanlang</option>
                  {QARINDOSHLIGI_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label">F.I.Sh.</label>
                <input
                  value={q.fio}
                  onChange={(e) => updateQarindosh(index, 'fio', e.target.value)}
                  type="text"
                  placeholder="Abdullayev Ali Bahodirovich"
                  className="inp"
                />
              </div>
            </div>
            <div className="grid-2 mt-1">
              <div className="field">
                <label className="label">Tug'ilgan yili va joyi</label>
                <input
                  value={q.tugilganYiliJoyi}
                  onChange={(e) => updateQarindosh(index, 'tugilganYiliJoyi', e.target.value)}
                  type="text"
                  placeholder="1955 yil, Toshkent"
                  className="inp"
                />
              </div>
              <div className="field">
                <label className="label">Yashash joyi</label>
                <input
                  value={q.yashashJoyi}
                  onChange={(e) => updateQarindosh(index, 'yashashJoyi', e.target.value)}
                  type="text"
                  placeholder="Toshkent sh., Chilonzor t."
                  className="inp"
                />
              </div>
            </div>
            <div className="field mt-1">
              <label className="label">Ish joyi va lavozimi</label>
              <input
                value={q.ishJoyiVaLavozimi}
                onChange={(e) => updateQarindosh(index, 'ishJoyiVaLavozimi', e.target.value)}
                type="text"
                placeholder="Pensioner yoki O'qituvchi, 15-maktab"
                className="inp"
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
