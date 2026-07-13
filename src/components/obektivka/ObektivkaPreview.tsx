import type { ObektivkaFormData } from '@/types/obektivka'
import './ObektivkaPreview.css'

interface Props {
  value: ObektivkaFormData
}

const yoq = "yo'q"

function formatBirthDate(date: string): string {
  if (!date) return ''
  try {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    return `${day}.${month}.${d.getFullYear()}-yil`
  } catch {
    return date
  }
}

function fullName(data: ObektivkaFormData): string {
  return [data.familiya, data.ism, data.sharif].filter(Boolean).join(' ')
}

function mehnatStr(dan: string, gacha: string): string {
  if (!dan && !gacha) return ''
  const from = dan || '?'
  const to = gacha || 'h.v.'
  const isHV = /h\.v\.?|hozirgi/i.test(to)
  return isHV ? `${from}-${to}-` : `${from}-${to} yy.-`
}

export default function ObektivkaPreview({ value }: Props) {
  return (
    <div className="ob-doc">
      {/* PAGE 1 */}
      <div className="ob-page obektivka-pdf-page">
        <h1 className="ob-main-title">MA'LUMOTNOMA</h1>

        <div className="ob-topblock">
          <div className="ob-name-col">
            <p className="ob-fullname">
              {fullName(value) || '______________________________________'}
            </p>
            {(value.joriyLavozimSanasi || value.joriyLavozimToliq) && (
              <p className="ob-current-pos">
                {value.joriyLavozimSanasi && (
                  <>
                    <span>{value.joriyLavozimSanasi}:</span>
                    <br />
                  </>
                )}
                {value.joriyLavozimToliq && <strong>{value.joriyLavozimToliq}</strong>}
              </p>
            )}
          </div>

          <div className="ob-photo-box">
            {value.rasm ? (
              <img src={value.rasm} alt="Xodim rasmi" className="ob-photo" />
            ) : (
              <div className="ob-photo-ph">
                3×4
                <br />
                rasm
              </div>
            )}
          </div>
        </div>

        <table className="ob-info-tbl">
          <colgroup>
            <col style={{ width: '50%' }} />
            <col style={{ width: '50%' }} />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <b className="fl">Tug'ilgan yili:</b>
                <br />
                <span className="fv">{formatBirthDate(value.tugilganSana) || '_______________'}</span>
              </td>
              <td>
                <b className="fl">Tug'ilgan joyi:</b>
                <br />
                <span className="fv">{value.tugilganJoyi || '_______________'}</span>
              </td>
            </tr>
            <tr>
              <td>
                <b className="fl">Millati:</b>
                <br />
                <span className="fv">{value.millati || '_______________'}</span>
              </td>
              <td>
                <b className="fl">Partiyaviyligi:</b>
                <br />
                <span className="fv">{value.partiyaviyligi || yoq}</span>
              </td>
            </tr>
            <tr>
              <td>
                <b className="fl">Ma'lumoti:</b>
                <br />
                <span className="fv">{value.malumoti || '_______________'}</span>
              </td>
              <td>
                <b className="fl">Tamomlagan:</b>
                <br />
                <span className="fv">{value.tamomlagan || '_______________'}</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="td-inline">
                <b className="fl">Ma'lumoti bo'yicha mutaxassisligi:</b>
                <span className="fv fv-gap">{value.malumotiMutaxassisligi || '_______________'}</span>
              </td>
            </tr>
            <tr>
              <td>
                <b className="fl">Ilmiy darajasi:</b>
                <br />
                <span className="fv">{value.ilmiyDarajasi || yoq}</span>
              </td>
              <td>
                <b className="fl">Ilmiy unvoni:</b>
                <br />
                <span className="fv">{value.ilmiyUnvoni || yoq}</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <b className="fl">Qaysi chet tillarini biladi:</b>
                <br />
                <span className="fv">{value.qaysiChetTillarini || '_______________'}</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <b className="fl">Davlat mukofotlari bilan taqdirlanganmi (qanaqa):</b>
                <br />
                <span className="fv">{value.davlatMukofotlari || yoq}</span>
              </td>
            </tr>
            <tr className="tr-last">
              <td colSpan={2}>
                <b className="fl">
                  Xalq deputatlari, respublika, viloyat, shahar va tuman Kengashi deputatimi yoki
                  boshqa saylanadigan organlarning a'zosimi (to'liq ko'rsatilishi lozim):
                </b>
                <br />
                <span className="fv">{value.xalqDeputatlari || yoq}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="ob-section-h">MEHNAT FAOLIYATI</h2>

        {value.mehnatFaoliyatiRoyxat && value.mehnatFaoliyatiRoyxat.length > 0 ? (
          <table className="ob-work-tbl">
            <colgroup>
              <col style={{ width: '24%' }} />
              <col style={{ width: '76%' }} />
            </colgroup>
            <tbody>
              {value.mehnatFaoliyatiRoyxat.map((item, i) => (
                <tr key={i} className="work-row">
                  <td className="work-period">{mehnatStr(item.dan, item.gacha)}</td>
                  <td className="work-pos">{item.lavozim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="ob-dash">—</p>
        )}
      </div>

      {/* PAGE 2 */}
      <div className="ob-page obektivka-pdf-page">
        <p className="ob-p2-line1">
          {fullName(value) || '___________________________'}ning yaqin qarindoshlari haqida
        </p>
        <p className="ob-p2-line2">MA'LUMOT</p>

        <table className="ob-rel-tbl">
          <thead>
            <tr>
              <th>
                Yaqin
                <br />
                qarindoshlari
              </th>
              <th>
                Familiyasi, ismi
                <br />
                va otasining ismi
              </th>
              <th>
                Tug'ilgan yili
                <br />
                va joyi
              </th>
              <th>
                Ish joyi va
                <br />
                lavozimi
              </th>
              <th>Turar joyi</th>
            </tr>
          </thead>
          <tbody>
            {value.qarindoshlar && value.qarindoshlar.length > 0
              ? value.qarindoshlar.map((q, i) => (
                  <tr key={i}>
                    <td className="td-rel-name">{q.qarindoshligi}</td>
                    <td>{q.fio}</td>
                    <td>{q.tugilganYiliJoyi}</td>
                    <td>{q.ishJoyiVaLavozimi}</td>
                    <td>{q.yashashJoyi}</td>
                  </tr>
                ))
              : Array.from({ length: 9 }, (_, n) => (
                  <tr key={n} className="tr-empty">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
          </tbody>
        </table>

        <p className="ob-phone">
          <b>Telefon raqami:</b> {value.telefon || '___________________________'}
        </p>
      </div>
    </div>
  )
}
