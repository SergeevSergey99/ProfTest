import React from "react";
import axios from "axios";

class Quest extends React.Component {
    state = {
        events: [],
        questions: [],
        answeredQuestions: [],
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
            };
        });
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/events/')
            .then(res => {
                this.setState({
                    events: res.data
                });
            });

        axios.get('http://127.0.0.1:8000/api/questions/')
            .then(res => {
                this.setState({

                    Allquestions: res.data
                });
            });
        this.loadQuiz();
    }

    check = (my_index) => {
        if (!this.state.fadeRev) {
            if (parseInt(my_index) === parseInt(this.state.questions[this.state.currentQuestion]["answer"])) {
                let st = this.state.styles;
                st[my_index - 1] = "card_option4_true";
                this.state.answeredQuestions.push(this.state.questions[this.state.currentQuestion]["id"]);
                this.setState({styles: st, fadeRev: true, sum: this.state.sum + 1});
                console.log("++++");
            } else {
                let st = this.state.styles;
                st[my_index - 1] = "card_option4_wrong";
                this.setState({styles: st, fadeRev: true});
            }
            //console.log("sum: " + (this.state.sum));
            //console.log("right: " + this.state.questions[this.state.currentQuestion]["answer"]);

        }
    };

    render() {
        if (localStorage < 7)
            document.location.href = "#/";

        if (this.state.events.length > 0 && this.state.check === 0) {
            var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            let i = 0;
            let evenum = [];
            let localevents = [];
            this.state.events.forEach(event => {
                let date = (event["eventDate"]).replace(/-/g, '/');
                if (date < utc && !localStorage.getItem('answeredEvents').includes(event["id"]) && localStorage.getItem('registeredEvents').includes(event["id"])) {
                    evenum.push(i);
                    localevents.push(event);
                }
                i++;
            });
            this.setState({check: 1, eventsNums: evenum, events: localevents});
            return (<div/>);
        }
//Вопросы
        if (this.state.startQuest) {
            if (this.state.currentQuestion >= this.state.questions.length) {
                let localansweredEvents = JSON.parse("[" + localStorage.getItem('answeredEvents') + "]");
                let localansweredQuestions = JSON.parse("[" + localStorage.getItem('answeredQuestions') + "]").concat(this.state.answeredQuestions).unique();

                localansweredEvents.push(this.state.events[this.state.currentEvent]["id"]);
                localStorage.setItem("Results", this.state.sum + parseInt(localStorage.getItem("Results")));
                localStorage.setItem('answeredEvents', localansweredEvents);
                localStorage.setItem('answeredQuestions', localansweredQuestions);
                axios.put('http://127.0.0.1:8000/api/students/' + localStorage.getItem('Id') + '/updateQuest/', {
                    Results: parseInt(localStorage.getItem("Results")),
                    MaxPossibleResults: parseInt(localStorage.getItem('MaxPossibleResults')) + this.state.questions.length,
                    answeredEvents: localansweredEvents,
                    answeredQuestions: localansweredQuestions
                })
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
                );
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
    }
}

export default Quest;