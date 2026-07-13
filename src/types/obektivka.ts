export interface Qarindosh {
  qarindoshligi: string
  fio: string
  tugilganYiliJoyi: string
  ishJoyiVaLavozimi: string
  yashashJoyi: string
}

export interface MehnatFaoliyati {
  dan: string
  gacha: string
  lavozim: string
}

export interface ObektivkaFormData {
  familiya: string
  ism: string
  sharif: string
  rasm: string | null
  joriyLavozimSanasi: string
  joriyLavozimToliq: string
  tugilganSana: string
  tugilganJoyi: string
  millati: string
  malumoti: string
  partiyaviyligi: string
  tamomlagan: string
  malumotiMutaxassisligi: string
  ilmiyDarajasi: string
  ilmiyUnvoni: string
  harbiyUnvoni: string
  qaysiChetTillarini: string
  davlatMukofotlari: string
  xalqDeputatlari: string
  telefon: string
  mehnatFaoliyatiRoyxat: MehnatFaoliyati[]
  qarindoshlar: Qarindosh[]
}
