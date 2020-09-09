import React from "react";
import {Quiz2Data} from "./Quiz2Data";
import Results from "./Results";
//import Spreadsheet from '../spreadsheet';
import {Superstate} from "./Quiz";
import axios from "axios";

export var Superstate2 = {
    __Hud: 0,
    __Tech: 0,
    __Num: 0,
    __Soc: 0,
    __Nat: 0,
};
//let sp = new Spreadsheet();

class Quiz2 extends React.Component {
    state = {
        info: true,
        currentQuestion: 0,
        _Hud: Superstate.__Hud,
        _Tech: Superstate.__Tech,
        _Num: Superstate.__Num,
        _Soc: Superstate.__Soc,
        _Nat: Superstate.__Nat,
        question: [],
        Hud: [],
        Tech: [],
        Num: [],
        Soc: [],
        Nat: [],
        rating: 0,
        fade: false,
        fadeRev: false,
        isEnd: false
    };

    loadQuiz = () => {
        const {currentQuestion} = this.state;

        this.setState(() => {
            return {
                question: [Quiz2Data[currentQuestion].name, Quiz2Data[currentQuestion + 1].name, Quiz2Data[currentQuestion + 2].name],
                Soc: [Quiz2Data[currentQuestion].Soc, Quiz2Data[currentQuestion + 1].Soc, Quiz2Data[currentQuestion + 2].Soc],
                Num: [Quiz2Data[currentQuestion].Num, Quiz2Data[currentQuestion + 1].Num, Quiz2Data[currentQuestion + 2].Num],
                Hud: [Quiz2Data[currentQuestion].Hud, Quiz2Data[currentQuestion + 1].Hud, Quiz2Data[currentQuestion + 2].Hud],
                Tech: [Quiz2Data[currentQuestion].Tech, Quiz2Data[currentQuestion + 1].Tech, Quiz2Data[currentQuestion + 2].Tech],
                Nat: [Quiz2Data[currentQuestion].Nat, Quiz2Data[currentQuestion + 1].Nat, Quiz2Data[currentQuestion + 2].Nat]
            };
        });
    };

    componentDidMount() {
        this.loadQuiz();
    }

    componentDidUpdate(prevProps, prevState) {
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            if (this.state.currentQuestion <= 27) {


                this.setState(() => {
                    return {
                        question: [Quiz2Data[currentQuestion].name, Quiz2Data[currentQuestion + 1].name, Quiz2Data[currentQuestion + 2].name],
                        Soc: [Quiz2Data[currentQuestion].Soc, Quiz2Data[currentQuestion + 1].Soc, Quiz2Data[currentQuestion + 2].Soc],
                        Num: [Quiz2Data[currentQuestion].Num, Quiz2Data[currentQuestion + 1].Num, Quiz2Data[currentQuestion + 2].Num],
                        Hud: [Quiz2Data[currentQuestion].Hud, Quiz2Data[currentQuestion + 1].Hud, Quiz2Data[currentQuestion + 2].Hud],
                        Tech: [Quiz2Data[currentQuestion].Tech, Quiz2Data[currentQuestion + 1].Tech, Quiz2Data[currentQuestion + 2].Tech],
                        Nat: [Quiz2Data[currentQuestion].Nat, Quiz2Data[currentQuestion + 1].Nat, Quiz2Data[currentQuestion + 2].Nat]
                    };
                });
            }
        }
    }

    nextQuestionHandler = (my_index) => {
        if (!this.state.fadeRev)
            this.setState({
                _Nat: this.state._Nat + this.state.Nat[my_index] * 2,
                _Num: this.state._Num + this.state.Num[my_index] * 2,
                _Tech: this.state._Tech + this.state.Tech[my_index] * 2,
                _Soc: this.state._Soc + this.state.Soc[my_index] * 2,
                _Hud: this.state._Hud + this.state.Hud[my_index] * 2,
                fadeRev: true
            });
    };

    render() {
        if (this.state.info) {
            return (
                <div className={this.state.fadeRev ? 'fade reverse' : ''}
                     onAnimationEnd={() => {
                         if (this.state.fadeRev) {
                             this.setState({fadeRev: false, info: false})
                         }
                     }}
                >
                    <div className="card_results">
                        <div className="result_text">
                            <h2>Задание</h2>
                            <h4>Далее будут представлены списки кружков</h4>
                            <p>Выберите наиболее интересный из представленных</p>
                        </div>
                        <div className="registr_button_exit" onClick={() => {
                            if (!this.state.fadeRev)
                                this.setState({fadeRev: true})
                        }
                        }>
                            <div className="inner">
                                Понятно
                            </div>
                        </div>
                    </div>

                </div>
            )
        }

        if (this.state.currentQuestion <= 27) {
            return (
                <div className={this.state.fadeRev ? 'fade reverse' : ''}
                     onAnimationEnd={() => {
                         if (this.state.fadeRev) {
                             this.setState({

                                 fadeRev: false,
                                 // fade: true,
                                 currentQuestion: this.state.currentQuestion + 3,
                             })
                         }
                     }
                     }
                >


                    <div className="card">
                        <div className="card-text2">
                            <p>Выбери увлечение, которое нравится больше всего</p>
                        </div>
                        <div className="card_options">
                            <div className="card_option"
                                 onClick={() => this.nextQuestionHandler(0)}><div className="inner">{this.state.question[0]}</div></div>
                            <div className="card_option"
                                 onClick={() => this.nextQuestionHandler(1)}><div className="inner">{this.state.question[1]}</div></div>
                            <div className="card_option"
                                 onClick={() => this.nextQuestionHandler(2)}><div className="inner">{this.state.question[2]}</div></div>
                        </div>
                    </div>
                </div>

            );
        }


        Superstate2.__Nat += this.state._Nat;
        Superstate2.__Num += this.state._Num;
        Superstate2.__Tech += this.state._Tech;
        Superstate2.__Soc += this.state._Soc;
        Superstate2.__Hud += this.state._Hud;

        axios.put('http://127.0.0.1:8000/api/students/' + localStorage.getItem('Id') + '/updateResults/', {
            WayHud:Superstate2.__Hud,
            WayNat:Superstate2.__Nat,
            WayTech:Superstate2.__Tech,
            WayNum:Superstate2.__Num,
            WaySoc:Superstate2.__Soc
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        localStorage.setItem('Hud', Superstate2.__Hud.toString());
        localStorage.setItem('Nat', Superstate2.__Nat.toString());
        localStorage.setItem('Num', Superstate2.__Num.toString());
        localStorage.setItem('Soc', Superstate2.__Soc.toString());
        localStorage.setItem('Tech', Superstate2.__Tech.toString());


        return (<div>
                <Results/>
            </div>
        );


    }


}

export default Quiz2;