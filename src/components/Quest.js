import React from "react";
import Spreadsheet from "../spreadsheet";

class Quest extends React.Component {

    state = {
        sp: new Spreadsheet(),
        check: "false",
        done: "false",
        currentEvent: 0,
        startQuest: false,
        fadeRev: false,
        currentQuestion: 0,
        styles: [
            "card_option4",
            "card_option4",
            "card_option4",
            "card_option4",
        ],
        sum: 0
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

    check = (my_index) => {
        if (!this.state.fadeRev) {
            if (parseInt(my_index) === parseInt(this.state.sp.events[this.state.currentEvent]["" + (this.state.currentQuestion + 1) + "+"])) {
                let st = this.state.styles;
                st[my_index - 1] = "card_option4_true";
                this.setState({styles: st, fadeRev: true, sum: this.state.sum + 1});
                console.log("++++");
            } else {
                let st = this.state.styles;
                st[my_index - 1] = "card_option4_wrong";
                this.setState({styles: st, fadeRev: true});
            }
            console.log("sum: " + (this.state.sum));
            console.log("right: " + this.state.sp.events[this.state.currentEvent]["" + (this.state.currentQuestion + 1) + "+"]);

        }
    };

    render() {

        if(this.state.currentQuestion > 4)
        {
            this.state.sp.AddAnswer(
                localStorage.getItem("Phone"),
                localStorage.getItem("School"),
                this.state.sp.events[this.state.currentEvent]["Название"],
                this.state.sum
                );
            document.location.href = "#/";
            return (<div/>)
        }
        if (localStorage < 7 )
            document.location.href = "#/";
        //чтение данных из localStorage и получиние событий
        if (this.state.check === false) {
            this.state.sp.GetQestions(
                localStorage.getItem("Phone"),
                localStorage.getItem("School"),
                localStorage.getItem("Nat"),
                localStorage.getItem("Hud"),
                localStorage.getItem("Tech"),
                localStorage.getItem("Num"),
                localStorage.getItem("Soc")
            );
            this.setState({check: true});
        }
        /*        if (this.state.sp.checked === true)
                //    setTimeout(() => {
                {
                    this.state.sp.checked = false;
                    this.setState({done: true});
                }*/
        //  }, 500);


        if (this.state.sp.checked) {
            //Вопросы
            if (this.state.startQuest) {

                return (
                    <div className={this.state.fadeRev ? 'fade reverse' : ''}
                         onAnimationEnd={() => {

                             if (this.state.fadeRev) {
                                 this.setState({

                                     fadeRev: false,
                                     // fade: true,
                                     currentQuestion: this.state.currentQuestion + 1,
                                     styles:[
                                         "card_option4",
                                         "card_option4",
                                         "card_option4",
                                         "card_option4",
                                     ]
                                 })
                             }
                         }
                         }
                    >


                        <div className="card">
                            <div className="card-text3">
                                <p>{"Вопрос " + (this.state.currentQuestion + 1)}: {this.state.sp.events[this.state.currentEvent]["Вопрос " + (this.state.currentQuestion + 1)]}</p>
                            </div>
                            <div className="card_options">
                                <div id="Answer_1" className={this.state.styles[0]} onClick={() => this.check(1)}>
                                    <div
                                        className="inner">{this.state.sp.events[this.state.currentEvent]["" + (this.state.currentQuestion + 1) + ",1"]}</div>
                                </div>
                                <div id="Answer_2" className={this.state.styles[1]} onClick={() => this.check(2)}>
                                    <div
                                        className="inner">{this.state.sp.events[this.state.currentEvent]["" + (this.state.currentQuestion + 1) + ",2"]}</div>
                                </div>
                                <div id="Answer_3" className={this.state.styles[2]} onClick={() => this.check(3)}>
                                    <div
                                        className="inner">{this.state.sp.events[this.state.currentEvent]["" + (this.state.currentQuestion + 1) + ",3"]}</div>
                                </div>
                                <div id="Answer_4" className={this.state.styles[3]} onClick={() => this.check(4)}>
                                    <div
                                        className="inner">{this.state.sp.events[this.state.currentEvent]["" + (this.state.currentQuestion + 1) + ",4"]}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            }
            //вывод событий если они есть и если пользователь проходил тест
            if (this.state.sp.events.length > 0 && Math.max(parseInt(localStorage.getItem("Nat")),
                parseInt(localStorage.getItem("Hud")),
                parseInt(localStorage.getItem("Tech")),
                parseInt(localStorage.getItem("Num")),
                parseInt(localStorage.getItem("Soc"))) > 0)
                return (
                    <div>
                        <div className="card">
                            <div className="result_text">Задания</div>
                            <div className="registr_text">
                                <p>Название: {this.state.sp.events[this.state.currentEvent]["Название"]}</p>

                                <p>{this.state.currentEvent + 1} из {this.state.sp.events.length}</p>
                            </div>


                            <div className="button_answer" onClick={() => {
                                this.setState({startQuest: true});
                            }}>
                                <div className="inner">Ответить на вопросы</div>
                            </div>

                            <div className="registr_button_exit" onClick={() => {
                                this.setState({currentEvent: (this.state.currentEvent + 1) % this.state.sp.events.length});
                            }}>
                                <div className="inner">Следующее</div>
                            </div>
                            <div className="registr_button" onClick={() => {
                                document.location.href = "#/";
                            }}>
                                <div className="inner">На главную</div>
                            </div>

                        </div>
                    </div>
                );

            // В противном случае ничего
            return (
                <div>
                    <div className="card_results">
                        <div className="result_text">Задания</div>
                        <div className="registr_text">Ничего</div>
                        <div className="registr_button" onClick={() => {
                            document.location.href = "#/";
                        }}>
                            <div className="inner">На главную</div>
                        </div>

                    </div>
                </div>
            );
        }
        // Если данные еще не получены переодически обновляем страницу в ожидании
        setTimeout(() => {
            if (this.state.time < 20)
                this.setState({done: true, time: this.state.time + 1});
            else
                this.setState({check: false, done: false, time: 0, sp: new Spreadsheet()});
        }, 1000);
        return (
            <div>
                <div className="card">
                    <div className="result_text">Задания</div>
                    <div className="registr_text">Поиск заданий...</div>
                    <div className="registr_button" onClick={() => {
                        document.location.href = "#/";
                    }}>
                        <div className="inner">На главную</div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Quest;