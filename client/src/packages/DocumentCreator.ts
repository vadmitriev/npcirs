import { IOrganization } from './../interfaces/Organization';
import { IRegion } from './../interfaces/Region';
import {
  AlignmentType,
  Document,
  Paragraph,
  TextRun,
  PageOrientation,
  TableCell,
  Table,
  TableRow,
  convertInchesToTwip,
  WidthType,
  Run,
  VerticalAlign,
} from 'docx';

export default class DocumentCreator {
  // tslint:disable-next-line: typedef
  public create(region: IRegion, data: IOrganization[]): Document {
    const document = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                orientation: PageOrientation.LANDSCAPE,
              },
              margin: {
                right: convertInchesToTwip(1.25),
              },
            },
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: {
                before: 200,
                after: 200,
              },
              children: [
                new TextRun({
                  text: 'шаблон печатного документа по таблице Ведение возможностей поставок',
                  italics: true,
                  size: this.getFontSize(14),
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'СВЕДЕНИЯ',
                  size: this.getFontSize(14),
                  break: 2,
                }),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'о возможностях организаций, находящихся в ведении или сфере деятельности',
                  size: this.getFontSize(14),
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: region.p02,
                  size: this.getFontSize(14),
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: '______________________________________________________________________________',
                  size: this.getFontSize(14),
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new Run({
                  size: this.getFontSize(10),
                  text: '(наименование федерального органа исполнительной власти, субъекта Российской Федерации)',
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({}),
            new Table({
              alignment: AlignmentType.CENTER,
              rows: [
                ...this.generateTableHeading(),
                ...this.generateTableRows(data),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new Run({
                  size: this.getFontSize(14),
                  text: 'Руководитель (заместитель руководителя)',
                  break: 2,
                }),
              ],
              spacing: {
                before: 200,
              },
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new Run({
                  size: this.getFontSize(14),
                  text: '“___” _______ 20__г.',
                }),
              ],
            }),
          ],
        },
      ],
    });

    return document;
  }

  private generateTableHeading(): TableRow[] {
    return [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Организации-исполнители, местонахождение, ИНН',
                  }),
                ],
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            rowSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Плазма \n свежозамор' }),
                ],
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Эритроцитарная \n масса' }),
                ],
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Иммуноглобулин \n человека' }),
                ],
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 2,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Альбумин \n 10-процентный' }),
                ],
              }),
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 2,
          }),
        ],
      }),
      new TableRow({
        children: Array(8)
          .fill('')
          .map((_, idx) => {
            return new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text:
                        idx % 2 === 0
                          ? 'Макс.об. (тыс. литров)'
                          : 'Цена (тыс. руб. за один литр)',
                    }),
                  ],
                }),
              ],
            });
          }),
      }),
    ];
  }

  private generateTableRows(data: IOrganization[]): TableRow[] {
    const keys = [
      'plazma_max',
      'plazma_cena',
      'erm_max',
      'erm_cena',
      'immg_max',
      'immg_cena',
      'alb_max',
      'alb_cena',
    ];

    const dataCells = (item: IOrganization) =>
      keys.map(
        (key) =>
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `${Number(item[key]).toFixed(2)}`,
                  }),
                ],
              }),
            ],
          }),
      );

    return data.map(
      (item) =>
        new TableRow({
          children: [
            new TableCell({
              verticalAlign: VerticalAlign.CENTER,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: item.naim_org,
                    }),
                    new TextRun({
                      text: item.adr_fact,
                      break: 1,
                    }),
                    new TextRun({
                      text: `ИНН: ${item.inn}`,
                      break: 1,
                    }),
                  ],
                }),
              ],
            }),
            ...dataCells(item),
          ],
        }),
    );
  }

  private getFontSize(size: number): number {
    return size * 2;
  }
}
