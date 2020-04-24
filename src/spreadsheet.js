const {GoogleSpreadsheet} = require('google-spreadsheet');

const creds = require('./client_secret.json');
const {google} = require('googleapis');
const Gsheets = google.sheets('v4');
class Spreadsheet {
    printStudent() {
        console.log('Телефон: ' + this.student['Телефон']);
        console.log('Школа: ' + this.student['Школа']);
        console.log('Естественные: ' + this.student['Е']);
        console.log('Артистические: ' + this.student['Х']);
        console.log('Технические: ' + this.student['Т']);
        console.log('Цифровые: ' + this.student['Ц']);
        console.log('Социальные: ' + this.student['С']);
        console.log(' ');
    }

    async accesSpreadsheet() {
        const doc = new GoogleSpreadsheet('1iMeDgVk4racpEhVD5751OFsiCvJMBk2k7DJdt4YoPyo');
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();
        console.log(doc.title);

        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

        console.log(sheet.title);
        const rows = await sheet.getRows();

        //    const rows = await sheet.getRows(); // can pass in { limit, offset }

//        console.log(rows[0]['Телефон']);
        //      console.log(rows[1]['Телефон']);
        /*      rows.forEach(row => {
                  printStudent(row)
              })
      */

        return rows;
    }

    student = {
        'Телефон': '',
        'Школа': '',
        'Х': '',
        'С': '',
        'Е': '',
        'Т': '',
        'Ц': ''
    };
    events = [];
    done = false;
    checked = false;

    async AddRowToSheet(phone, school) {

        const doc = new GoogleSpreadsheet('1iMeDgVk4racpEhVD5751OFsiCvJMBk2k7DJdt4YoPyo');
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

//    console.log(sheet.title);
        const rows = await sheet.getRows();

        let Search = false;
        let i = 0;
        rows.forEach(row => {

            if (row['Телефон'] === phone && row['Школа'] === school) {
                Search = true;
            }
            if (!Search)
                i++;
        })

        if (Search) {
            this.student = rows[i];
            this.done = true;
            return rows[i];
        }
        const larryRow = await sheet.addRow({
            'Телефон': phone,
            'Школа': school,
            'Е': 0,
            'Х': 0,
            'Т': 0,
            'Ц': 0,
            'С': 0
        });
        this.student = larryRow;
        this.done = true;
        return larryRow;

    }

    async GetEvent(e, h, t, c, s) {

        const doc = new GoogleSpreadsheet('1iMeDgVk4racpEhVD5751OFsiCvJMBk2k7DJdt4YoPyo');
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id]

//    console.log(sheet.title);
        const rows = await sheet.getRows();

        let arr = [
            {"name": "Е", "value": e},
            {"name": "Х", "value": h},
            {"name": "Т", "value": t},
            {"name": "Ц", "value": c},
            {"name": "С", "value": s}
        ];
        arr.sort(function (a, b) {
            return a["value"] - b["value"];
        });

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();


        /*  console.log(dd);
          console.log(mm);
          console.log(yyyy);*/
        rows.forEach(row => {
//            console.log(row);
            if (row['Направление 1'] === arr[3]["name"] || row['Направление 2'] === arr[3]["name"] ||
                row['Направление 1'] === arr[4]["name"] || row['Направление 2'] === arr[4]["name"]) {
                /*                console.log(row["Дата"]);
                                console.log(row["Месяц"]);
                                console.log(row["Год"]);
                                console.log(dd);
                                console.log(mm);
                                console.log(yyyy);
                                //01.03.2020*/
                if (parseInt(row["Год"]) > parseInt(yyyy) ||
                    (parseInt(row["Год"]) === parseInt(yyyy) && row["Месяц"] > parseInt(mm)) ||
                    (parseInt(row["Год"]) === parseInt(yyyy) && parseInt(row["Месяц"]) === parseInt(mm) && parseInt(row["Дата"]) >= parseInt(dd))) {
                    this.events.push(row);
                    //                          console.log(row);
                }
            }
        });
        this.checked = true;

    }

    async GetQestions(e, h, t, c, s) {

        const doc = new GoogleSpreadsheet('1iMeDgVk4racpEhVD5751OFsiCvJMBk2k7DJdt4YoPyo');
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[1];
        const rows = await sheet.getRows();

        let arr = [
            {"name": "Е", "value": e},
            {"name": "Х", "value": h},
            {"name": "Т", "value": t},
            {"name": "Ц", "value": c},
            {"name": "С", "value": s}
        ];
        arr.sort(function (a, b) {
            return a["value"] - b["value"];
        });

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        rows.forEach(row => {
            if (row['Направление 1'] === arr[3]["name"] || row['Направление 2'] === arr[3]["name"] ||
                row['Направление 1'] === arr[4]["name"] || row['Направление 2'] === arr[4]["name"]) {
                if (parseInt(row["Год"]) < parseInt(yyyy) ||
                    (parseInt(row["Год"]) === parseInt(yyyy) && row["Месяц"] < parseInt(mm)) ||
                    (parseInt(row["Год"]) === parseInt(yyyy) && parseInt(row["Месяц"]) === parseInt(mm) && parseInt(row["Дата"]) <= parseInt(dd))) {
                    this.events.push(row);
                }
            }
        });
        this.checked = true;

    }

    async AddAnswer(phone, school, event_name, result) {

        const doc = new GoogleSpreadsheet('1iMeDgVk4racpEhVD5751OFsiCvJMBk2k7DJdt4YoPyo');
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
        const rows = await sheet.getRows();
  //      let Search = false;
   //     let i = 0;
        rows.forEach(row => {

                if (row['Телефон'] === phone && row['Школа'] === school) {
                    //Search = true;
                    if (!String(row['Результаты']).includes(event_name)) {
                        if (row['Результаты'] === undefined) {
                            row['Результаты'] = "";
                            row['Сумма'] = 0;
                        }
                        row['Результаты'] += event_name + ":" + result + ";";
                        row['Сумма'] = parseInt(row['Сумма']) + parseInt(result);
                        row.save();
                    }
                    return row;
                }
//            if (!Search)
  //              i++;
            }
        );

    }

    async updateRow(phone, school, e, h, t, c, s) {
        const doc = new GoogleSpreadsheet('1iMeDgVk4racpEhVD5751OFsiCvJMBk2k7DJdt4YoPyo');
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        rows.forEach(row => {
            if (row['Телефон'] === phone && row['Школа'] === school) {
                row['Е'] = e;
                row['Х'] = h;
                row['Т'] = t;
                row['Ц'] = c;
                row['С'] = s;
                row.save();
            }
        })

    }
}
//let sp = new Spreadsheet();
//sp.AddAnswer('79500090535', '30','a','1');
export default Spreadsheet;