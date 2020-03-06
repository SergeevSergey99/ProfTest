const {GoogleSpreadsheet} = require('google-spreadsheet');

const creds = require('./client_secret.json');

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
        'Телефон':'',
        'Школа':'',
        'Х':'',
        'С':'',
        'Е':'',
        'Т':'',
        'Ц':''
    };
    done = false;
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

//console.log(AddRowToSheet('123456', '1213'));
export default Spreadsheet;