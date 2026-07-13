import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ImageRun,
  VerticalAlign,
} from 'docx'
import { saveAs } from 'file-saver'
import type { ObektivkaFormData } from '@/types/obektivka'

const mmToTwip = (mm: number) => Math.round(mm * 56.69)
const mmToPx = (mm: number) => Math.round((mm / 25.4) * 96)

const yoq = "yo'q"

const noBorderTable = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideH: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideV: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
}

const noBorderCell = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
}

const bottomSepCell = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
}

const solidBorderTable = {
  top: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
  bottom: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
  left: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
  right: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
  insideH: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
  insideV: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
}

const solidBorderCell = {
  top: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
  bottom: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
  left: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
  right: { style: BorderStyle.SINGLE, size: 6, color: '555555' },
}

function fieldRow2(l1: string, v1: string, l2: string, v2: string): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorderTable,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: bottomSepCell,
            children: [
              new Paragraph({ children: [new TextRun({ text: l1, bold: true, size: 19 })] }),
              new Paragraph({ children: [new TextRun({ text: v1 || yoq, size: 21 })] }),
            ],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: bottomSepCell,
            children: [
              new Paragraph({ children: [new TextRun({ text: l2, bold: true, size: 19 })] }),
              new Paragraph({ children: [new TextRun({ text: v2 || yoq, size: 21 })] }),
            ],
          }),
        ],
      }),
    ],
  })
}

function fieldRowFull(label: string, value: string): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorderTable,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: bottomSepCell,
            children: [
              new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 19 })] }),
              new Paragraph({ children: [new TextRun({ text: value || yoq, size: 21 })] }),
            ],
          }),
        ],
      }),
    ],
  })
}

function fieldRowInline(label: string, value: string): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorderTable,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: bottomSepCell,
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: label, bold: true, size: 19 }),
                  new TextRun({ text: '  ' + (value || ''), size: 21 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })
}

function emptyPara() {
  return new Paragraph({ text: '' })
}

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const mon = String(d.getMonth() + 1).padStart(2, '0')
  return `${day}.${mon}.${d.getFullYear()}`
}

export async function generateObektivkaDocx(data: ObektivkaFormData) {
  const fullName = [data.familiya, data.ism, data.sharif].filter(Boolean).join(' ')

  let photoRun: ImageRun | null = null
  if (data.rasm) {
    try {
      const commaIdx = data.rasm.indexOf(',')
      const base64 = commaIdx >= 0 ? data.rasm.slice(commaIdx + 1) : data.rasm
      const mime = commaIdx >= 0 ? data.rasm.slice(5, data.rasm.indexOf(';')) : 'image/jpeg'
      const imgType = mime.includes('png') ? 'png' : 'jpg'
      const bin = atob(base64)
      const arr = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i)
      photoRun = new ImageRun({
        data: arr,
        transformation: { width: mmToPx(28), height: mmToPx(37) },
        type: imgType as 'png' | 'jpg',
      })
    } catch {
      // skip photo if conversion fails
    }
  }

  const pageMargin = {
    top: mmToTwip(16),
    right: mmToTwip(18),
    bottom: mmToTwip(14),
    left: mmToTwip(18),
  }

  const mehnatRows = data.mehnatFaoliyatiRoyxat?.length
    ? data.mehnatFaoliyatiRoyxat.map(
        (item) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: mmToTwip(35), type: WidthType.DXA },
                borders: noBorderCell,
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${item.dan}-${item.gacha} yy.-`,
                        bold: true,
                        size: 20,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                borders: noBorderCell,
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: item.lavozim, size: 20 })],
                  }),
                ],
              }),
            ],
          }),
      )
    : [
        new TableRow({
          children: [
            new TableCell({
              borders: noBorderCell,
              children: [new Paragraph({ children: [new TextRun({ text: '—', size: 20 })] })],
            }),
          ],
        }),
      ]

  const relRows = data.qarindoshlar?.length
    ? data.qarindoshlar.map(
        (q) =>
          new TableRow({
            children: [
              new TableCell({
                borders: solidBorderCell,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: q.qarindoshligi || '', bold: true, size: 18 })],
                  }),
                ],
              }),
              new TableCell({
                borders: solidBorderCell,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: q.fio || '', size: 18 })],
                  }),
                ],
              }),
              new TableCell({
                borders: solidBorderCell,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: q.tugilganYiliJoyi || '', size: 18 })],
                  }),
                ],
              }),
              new TableCell({
                borders: solidBorderCell,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: q.ishJoyiVaLavozimi || '', size: 18 })],
                  }),
                ],
              }),
              new TableCell({
                borders: solidBorderCell,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: q.yashashJoyi || '', size: 18 })],
                  }),
                ],
              }),
            ],
          }),
      )
    : Array.from(
        { length: 7 },
        () =>
          new TableRow({
            height: { value: mmToTwip(15), rule: 'atLeast' as const },
            children: Array.from(
              { length: 5 },
              () =>
                new TableCell({
                  borders: solidBorderCell,
                  children: [new Paragraph({ text: '' })],
                }),
            ),
          }),
      )

  const doc = new Document({
    sections: [
      {
        properties: { page: { margin: pageMargin } },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: mmToTwip(3) },
            children: [new TextRun({ text: "MA'LUMOTNOMA", bold: true, size: 30 })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: noBorderTable,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: noBorderCell,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: fullName, bold: true, size: 26 })],
                      }),
                      ...(data.joriyLavozimSanasi
                        ? [
                            new Paragraph({
                              children: [
                                new TextRun({ text: `${data.joriyLavozimSanasi}:`, size: 20 }),
                              ],
                            }),
                          ]
                        : []),
                      ...(data.joriyLavozimToliq
                        ? [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: data.joriyLavozimToliq,
                                  bold: true,
                                  size: 20,
                                }),
                              ],
                            }),
                          ]
                        : []),
                    ],
                  }),
                  new TableCell({
                    borders: noBorderCell,
                    width: { size: mmToTwip(34), type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: photoRun
                          ? [photoRun]
                          : [new TextRun({ text: '3×4', size: 18, color: 'AAAAAA' })],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          emptyPara(),
          fieldRow2(
            "Tug'ilgan yili:",
            formatDate(data.tugilganSana),
            "Tug'ilgan joyi:",
            data.tugilganJoyi,
          ),
          fieldRow2('Millati:', data.millati, 'Partiyaviyligi:', data.partiyaviyligi),
          fieldRow2("Ma'lumoti:", data.malumoti, 'Tamomlagan:', data.tamomlagan),
          fieldRowInline("Ma'lumoti bo'yicha mutaxassisligi:", data.malumotiMutaxassisligi),
          fieldRow2(
            'Ilmiy darajasi:',
            data.ilmiyDarajasi || yoq,
            'Ilmiy unvoni:',
            data.ilmiyUnvoni || yoq,
          ),
          fieldRowFull('Qaysi chet tillarini biladi:', data.qaysiChetTillarini),
          ...(data.harbiyUnvoni
            ? [fieldRowFull('Harbiy (maxsus) unvoni:', data.harbiyUnvoni)]
            : []),
          fieldRowFull(
            'Davlat mukofotlari bilan taqdirlanganmi (qanaqa):',
            data.davlatMukofotlari,
          ),
          fieldRowFull(
            "Xalq deputatlari, respublika, viloyat, shahar va tuman Kengashi deputatimi yoki boshqa saylanadigan organlarning a'zosimi (to'liq ko'rsatilishi lozim)",
            data.xalqDeputatlari,
          ),
          emptyPara(),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: mmToTwip(2) },
            children: [
              new TextRun({ text: 'MEHNAT FAOLIYATI', bold: true, size: 24, underline: {} }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: noBorderTable,
            rows: mehnatRows,
          }),
        ],
      },
      {
        properties: { page: { margin: pageMargin } },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `${fullName}ning yaqin qarindoshlari haqida`, size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: mmToTwip(5) },
            children: [new TextRun({ text: "MA'LUMOT", bold: true, size: 24 })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: solidBorderTable,
            rows: [
              new TableRow({
                tableHeader: true,
                children: [
                  new TableCell({
                    borders: solidBorderCell,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'Yaqin qarindoshlari', bold: true, size: 18 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: solidBorderCell,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'Familiyasi, ismi va otasining ismi',
                            bold: true,
                            size: 18,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: solidBorderCell,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "Tug'ilgan yili va joyi", bold: true, size: 18 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: solidBorderCell,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'Ish joyi va lavozimi', bold: true, size: 18 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: solidBorderCell,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: 'Turar joyi', bold: true, size: 18 })],
                      }),
                    ],
                  }),
                ],
              }),
              ...relRows,
            ],
          }),
          emptyPara(),
          new Paragraph({
            children: [
              new TextRun({ text: 'Telefon raqami: ', bold: true, size: 21 }),
              new TextRun({ text: data.telefon || '___________________________', size: 21 }),
            ],
          }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${fullName || 'obektivka'}_obektivka.docx`)
}
