import React from "react";
//import Spreadsheet from "../spreadsheet";
import axios from "axios";

class Rating extends React.Component {
    state = {
        //sp: new Spreadsheet(),
        students: [],
        Rate_index: 0,
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
        axios.get('/api/students/', {headers: {'Access-Control-Allow-Origin': true}})
            .then(res => {

                res.data.sort(function (a, b) {
                    if (b["Results"] === "")
                        return -10000;
                    if (a["Results"] === "")
                        return 10000;
                    return b["Results"] - a["Results"];
                });

                console.log(res.data);
                let i = 0;
                res.data.every(student => {

                    if (parseInt(localStorage.getItem('Id')) === student["id"])
                        return false;
                    else {

                        i++;

                        return true;
                    }
                });
                console.log("i = " + i);
                let datas = res.data;

                res.data = datas.slice(Math.max(i - 10, 0), Math.min(i + 10,datas.length));
                this.setState({
                    students: res.data,
                    Rate_index: Math.max(1, i - 10+1)
                });
                console.log(res.data);

            });

        this.loadQuiz();
    }

    render() {


        if (localStorage < 7)
            document.location.href = "#/";
        /*if (this.state.check === false) {
            this.state.sp.GetRaiting(
                localStorage.getItem("Phone"),
                localStorage.getItem("School")
            );
            this.setState({check: true});
        }*/
        if (this.state.students.length > 0) {

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
                        <div className="reiting">
                            <table>
                                <tbody>
                                <tr>
                                    <td>Место</td>
                                    <td>Имя</td>
                                    <td>Фамилия</td>
                                    <td>Школа</td>
                                    <td>Сумма баллов</td>
                                </tr>
                                {
                                    this.state.students.map((row, i) => {

                                        if (row['phone'] === localStorage.getItem("Phone") && row['School'] === localStorage.getItem("School"))
                                            return (
                                                <tr className="card_option4_true" key={i}>
                                                    <td>{i + this.state.Rate_index}</td>
                                                    <td>{row['firstName'].length > 7 ? row['firstName'].substring(0,6) +'...':row['firstName']}</td>
                                                    <td>{row['lastName'].length > 11 ? row['lastName'].substring(0,10) +'...':row['lastName']}</td>
                                                    <td>{row['School']}</td>
                                                    <td>{row['Results'] >= 0 ? row['Results'] : textN}</td>
                                                </tr>);
                                        return (
                                            <tr className="card_option5_true" key={i}>
                                                <td>{i + this.state.Rate_index}</td>
                                                <td>{row['firstName'].length > 7 ? row['firstName'].substring(0,6) +'...':row['firstName']}</td>
                                                <td>{row['lastName'].length > 11 ? row['lastName'].substring(0,10) +'...':row['lastName']}</td>
                                                <td>{row['School']}</td>
                                                <td>{row['Results'] >= 0 ? row['Results'] : textN}</td>
                                            </tr>);
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
            /*if (this.state.check)
                setTimeout(() => {
                    if (this.state.time < 20) {

                        console.log(this.state.time);
                        this.setState({time: this.state.time + 1});
                    } else
                        this.setState({check: false, time: 0, sp: new Spreadsheet()});
                }, 1000);*/
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