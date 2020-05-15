import React from "react";
import Spreadsheet from "../spreadsheet";

class Rating extends React.Component {
    state = {
        sp: new Spreadsheet(),
        time: 0,
        check: false
    };
    loadQuiz = () => {

        this.setState(() => {
            return {
                // sp: new Spreadsheet(),
                // check: false,

            };
        });
    };

    componentDidMount() {
        this.loadQuiz();
    }

    render() {


        if (localStorage < 7)
            document.location.href = "#/";
        if (this.state.check === false) {
            this.state.sp.GetRaiting(
                localStorage.getItem("Phone"),
                localStorage.getItem("School")
            );
            this.setState({check: true});
        }
        if (this.state.sp.checked) {
            let textN = "Нету";/*
            console.log(this.state.sp.events);
            console.log(this.state.sp.events.length);
            this.state.sp.events.forEach(row => {
                text += row['Телефон'] + " " +
                    row['Школа'] + " " +
                    row['Сумма'] + " баллов"+ <br/> ;
            });*/
            /*let div = document.createElement('div');
            div.setAttribute('id', 'mydiv');
            document.getElementById("here").appendChild(div);*/
            return (
                <div>
                    <div className="card">
                        <div className="result_text">Рейтинг</div>
                        <div className="registr_text_0">
                            <table>
                                <tbody>
                                <tr><td>Место</td><td>Телефон</td><td>Школа</td><td>Сумма баллов</td></tr>
                                {
                                this.state.sp.events.map((row, i) => {

                                    if( row['Телефон'] === localStorage.getItem("Phone") && row['Школа'] === localStorage.getItem("School"))
                                        return (
                                        <tr className="card_option4_true" key={i}>
                                            <td>{i+this.state.sp.Rate_index}</td><td>{row['Телефон']}</td><td>{row['Школа']}</td><td>{row['Сумма'] >= 0 ?  row['Сумма']:textN }</td></tr>);
                                    return (
                                    <tr className="card_option5_true" key={i}>
                                    <td>{i+this.state.sp.Rate_index}</td><td>{row['Телефон']}</td><td>{row['Школа']}</td><td>{row['Сумма'] >= 0 ?  row['Сумма']:textN }</td></tr>);
                                })
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="button_next" onClick={() => {
                            document.location.href = "#/";
                        }}>
                            <div className="inner">На главную</div>
                        </div>

                    </div>
                </div>
            );
        } else {
            // Если данные еще не получены переодически обновляем страницу в ожидании
            if (this.state.check)
                setTimeout(() => {
                    if (this.state.time < 20) {

                        console.log(this.state.time);
                        this.setState({time: this.state.time + 1});
                    } else
                        this.setState({check: false, time: 0, sp: new Spreadsheet()});
                }, 1000);
            return (
                <div>


                    <div className="card">
                        <div className="result_text">Рейтинг</div>
                        <div className="registr_text">Запрос рейтинга...</div>
                        <div className="button_next" onClick={() => {
                            document.location.href = "#/";
                        }}>
                            <div className="inner">На главную</div>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

export default Rating