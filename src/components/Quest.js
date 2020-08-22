import React from "react";
import axios from "axios";

class Quest extends React.Component {

    state = {
//        sp: new Spreadsheet(),
        events: [],
        questions: [],
        Allquestions: [],
        check: 0,
        done: "false",
        currentEvent: 0,
        startQuest: false,
        fadeRev: false,
        currentQuestion: 0,
        eventsNums: [],
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
        axios.get('/api/events/', {headers: {'Access-Control-Allow-Origin': true}})
            .then(res => {
                this.setState({
                    events: res.data
                });
                console.log(res.data);

            });

        axios.get('/api/questions/', {headers: {'Access-Control-Allow-Origin': true}})
            .then(res => {
                this.setState({

                    Allquestions: res.data
                });

                console.log(res.data);

            });

        /*
                this.state.events.forEach(event => {
                    let date = new Date((event["eventDate"] + " " + event["eventTime"]).replace(/-/g, '/'));
                    if (date > Date.now()) {
                        this.state.events.splice(this.state.events.indexOf(event), 1);
                    }
                });*/
        this.loadQuiz();
    }

    check = (my_index) => {
        if (!this.state.fadeRev) {
            if (parseInt(my_index) === parseInt(this.state.questions[this.state.currentQuestion]["answer"])) {
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
            console.log("right: " + this.state.questions[this.state.currentQuestion]["answer"]);

        }
    };

    render() {
        console.log(this.state.events);
//TODO отправка на сервер результатов


        if (localStorage < 7)
            document.location.href = "#/";

        if (this.state.events.length > 0 && this.state.check === 0) {
            var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            //console.log(utc);
            let i = 0;
            let evenum = [];
            let localevents = [];
//            console.log(this.state.events);
            this.state.events.forEach(event => {

                let date = (event["eventDate"]).replace(/-/g, '/');

                //console.log(date);
                if (date < utc && !localStorage.getItem('answeredEvents').includes(event["id"]) && localStorage.getItem('registeredEvents').includes(event["id"])) {
                    evenum.push(i);
                    localevents.push(event);
//                    this.state.events.splice(this.state.events.indexOf(event), 1);
                }
                i++;
            });
            //     console.log("evenum");
            //   console.log(evenum);
            this.setState({check: 1, eventsNums: evenum, events: localevents});
            return (<div/>);
        }

//чтение данных из localStorage и получиние событий
        /* if (this.state.check === false) {
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
         }*/
        /*        if (this.state.sp.checked === true)
                //    setTimeout(() => {
                {
                    this.state.sp.checked = false;
                    this.setState({done: true});
                }*/
//  }, 500);


//if (this.state.sp.checked)
//{
//Вопросы
        if (this.state.startQuest) {

            if (this.state.currentQuestion >= this.state.questions.length) {
                //this.setState({startQuest: false, currentQuestion: 0});

                let localansweredEvents = JSON.parse("[" + localStorage.getItem('answeredEvents') + "]");;
                localansweredEvents.push(this.state.events[this.state.currentEvent]["id"]);
                localStorage.setItem("Results", this.state.sum + parseInt(localStorage.getItem("Results")));
                localStorage.setItem('answeredEvents', localansweredEvents);
                axios.put('/api/students/' + localStorage.getItem('Id') + '/updateQuest/', {
                    Results: localStorage.getItem("Results"),
                    answeredEvents: localansweredEvents,
                    MaxPossibleResults: parseInt(localStorage.getItem('MaxPossibleResults')) + this.state.questions.length
                }, {headers: {'Access-Control-Allow-Origin': true, "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"}})
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

                return (

                    <div>
                        <div className="card_results">
                            <div className="result_text">Задания</div>
                            <div className="registr_text">Ваш
                                результат {this.state.sum} из {this.state.questions.length}</div>
                            <div className="registr_button" onClick={() => {
                                document.location.href = "#/";
                            }}>
                                <div className="inner">На главную</div>
                            </div>

                        </div>
                    </div>
                )
                    ;

            }

            return (
                <div className={this.state.fadeRev ? 'fade reverse' : ''}
                     onAnimationEnd={() => {

                         if (this.state.fadeRev) {
                             this.setState({

                                 fadeRev: false,
                                 // fade: true,
                                 currentQuestion: this.state.currentQuestion + 1,
                                 styles: [
                                     "card_option4",
                                     "card_option4",
                                     "card_option4",
                                     "card_option4",
                                 ]
                             })
                         }
                     }
                     }>
                    <div className="card">
                        <div className="card-text3">
                            <p>{"Вопрос " + (this.state.currentQuestion + 1)}: {this.state.questions[this.state.currentQuestion]["text"]}</p>
                        </div>
                        <div className="card_options">
                            <div id="Answer_1" className={this.state.styles[0]} onClick={() => this.check(1)}>
                                <div
                                    className="inner">{this.state.questions[this.state.currentQuestion]["option1"]}</div>
                            </div>
                            <div id="Answer_2" className={this.state.styles[1]} onClick={() => this.check(2)}>
                                <div
                                    className="inner">{this.state.questions[this.state.currentQuestion]["option2"]}</div>
                            </div>
                            <div id="Answer_3" className={this.state.styles[2]} onClick={() => this.check(3)}>
                                <div
                                    className="inner">{this.state.questions[this.state.currentQuestion]["option3"]}</div>
                            </div>
                            <div id="Answer_4" className={this.state.styles[3]} onClick={() => this.check(4)}>
                                <div
                                    className="inner">{this.state.questions[this.state.currentQuestion]["option4"]}</div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
//вывод событий если они есть и если пользователь проходил тест
        if (this.state.events.length > 0 && Math.max(parseInt(localStorage.getItem("Nat")),
            parseInt(localStorage.getItem("Hud")),
            parseInt(localStorage.getItem("Tech")),
            parseInt(localStorage.getItem("Num")),
            parseInt(localStorage.getItem("Soc"))) > 0)
            return (
                <div>
                    <div className="card">
                        <div className="result_text">Задания</div>
                        <div className="registr_text">
                            <p>Название: {this.state.events[this.state.currentEvent]["title"]}</p>

                            <p>{this.state.currentEvent + 1} из {this.state.events.length}</p>
                        </div>


                        <div className="button_answer" onClick={() => {

                            let currEventnum = this.state.events[this.state.currentEvent]["id"];
                            //console.log(this.state.eventsNums);
                            //console.log(currEventnum);
                            this.setState({questions: []});
                            let arr = [];
                            this.state.Allquestions.forEach(question => {
                                if (question["event"] === currEventnum) {
                                    arr.push(question);
                                }
                            });

                            this.setState({startQuest: true, questions: arr});
                        }}>
                            <div className="inner">Ответить на вопросы</div>
                        </div>

                        <div className="registr_button_exit" onClick={() => {
                            this.setState({currentEvent: (this.state.currentEvent + 1) % this.state.events.length});
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
                <div className="card">
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
//}
// Если данные еще не получены переодически обновляем страницу в ожидании
        /*     setTimeout(() => {
                 if (this.state.time < 20)
                     this.setState({done: true, time: this.state.time + 1});
                 else
                     this.setState({check: false, done: false, time: 0, sp: new Spreadsheet()});
             }, 1000);*/
        /*return (
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
        */
    }
}

export default Quest;