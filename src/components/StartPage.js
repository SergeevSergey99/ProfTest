import React from "react";
import axios from "axios";
import logo from './../лого_синий.png'

class StartPage extends React.Component {

    state = {
        student: []
    };

    loadQuiz = () => {
        this.setState(() => {
            return {};
        });
    };

    componentDidMount() {
        if (localStorage.length >= 7)
            axios.get('http://127.0.0.1:8000/api/students/' + parseInt(localStorage.getItem('Id')))
                .then(res => {

                    console.log(res.data);
                    let student = res.data;

                    localStorage.setItem('firstName', student["firstName"]);
                    localStorage.setItem('lastName', student["lastName"]);

                    localStorage.setItem('Phone', student["phone"]);
                    localStorage.setItem('School', student["School"]);

                    localStorage.setItem('Hud', student["WayHud"]);
                    localStorage.setItem('Nat', student["WayNat"]);
                    localStorage.setItem('Num', student["WayNum"]);
                    localStorage.setItem('Soc', student["WaySoc"]);
                    localStorage.setItem('Tech', student["WayTech"]);

                    localStorage.setItem('Results', student["Results"]);
                    localStorage.setItem('MaxPossibleResults', student["MaxPossibleResults"]);

                    localStorage.setItem('registeredEvents', student["registeredEvents"]);
                    localStorage.setItem('answeredEvents', student["answeredEvents"]);

                    this.setState({updateState: true});


                });
        this.loadQuiz();
    }

    render() {
        if (localStorage.length >= 7) {


            if (
                parseInt(localStorage.getItem('Hud')) +
                parseInt(localStorage.getItem('Nat')) +
                parseInt(localStorage.getItem('Num')) +
                parseInt(localStorage.getItem('Soc')) +
                parseInt(localStorage.getItem('Tech')) > 0
            )
                return (
                    <div>
                        <div className="card_results">
                            <div className="card-start_text" onClick={() => {
                                document.location.href = "#/Registration";
                            }}>
                                <div className="text">
                                    <div className="inner">Мои данные</div>
                                </div>
                            </div>
                            <div className="card-start_text" onClick={() => {
                                document.location.href = "#/Results";
                            }}>
                                <div className="text">
                                    <div className="inner">Результаты</div>
                                </div>
                            </div>
                            <div className="card-start_text" onClick={() => {
                                document.location.href = "#/Rating";
                            }}>
                                <div className="text">
                                    <div className="inner">Рейтинг</div>
                                </div>
                            </div>
                            <div className="card-start_text" onClick={() => {
                                document.location.href = "#/Events";
                            }}>
                                <div className="text">
                                    <div className="inner">Анонсы событий</div>
                                </div>
                            </div>
                            <div className="card-start_text" onClick={() => {
                                document.location.href = "#/MyEvents";
                            }}>
                                <div className="text">
                                    <div className="inner">Мои события</div>
                                </div>
                            </div>
                            <div className="card-start_text" onClick={() => {
                                document.location.href = "#/Quest";
                            }}>
                                <div className="text">
                                    <div className="inner">Вопросы к событиям</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            else
                return (
                    <div>
                        <div className="card_results">
                            <div className="card-start_text" onClick={() => {
                                document.location.href = "#/Registration";
                            }}>
                                <div className="text">
                                    <div className="inner">Мои данные</div>
                                </div>
                            </div>
                            <div className="card-start_text" onClick={() => {
                                document.location.href = "#/Quiz";
                            }}>
                                <div className="text">
                                    <div className="inner">Тест</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
        return (
            <div>

                <div className="card_results">
                    <div className="img_logo">
                        <img width={"80%"} src={logo} alt={"logo"}/>
                    </div>
                    <div className="card-start_text" onClick={() => {
                        document.location.href = "#/Registration";
                    }}>

                        <div className="text">
                            <div className="inner">Регистрация</div>
                        </div>


                    </div>
                </div>
            </div>
        );

    }
}

export default StartPage