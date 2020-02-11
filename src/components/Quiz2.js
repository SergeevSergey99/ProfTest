import React from "react";
import {Quiz2Data} from "./Quiz2Data";
import Results from "./Results";
import {Superstate} from "./Quiz";
import {QuizData} from "./QuizData";
import StarRatingComponent from "react-star-rating-component";
import index from "styled-components/dist/styled-components-macro.esm";

export var Superstate2 = {
    __Hud: 0,
    __Tech: 0,
    __Num: 0,
    __Soc: 0,
    __Nat: 0,
};

class Quiz2 extends React.Component {
    state = {
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
        console.log(my_index);
        if (!this.state.fadeRev)
            this.setState({
                _Nat: this.state._Nat + this.state.Nat[my_index],
                _Num: this.state._Num + this.state.Num[my_index],
                _Tech: this.state._Tech + this.state.Tech[my_index],
                _Soc: this.state._Soc + this.state.Soc[my_index],
                _Hud: this.state._Hud + this.state.Hud[my_index],
                fadeRev: true
            });
    };

    render() {
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


                    <div className="card"/>
                    <div className="card-text2">
                        <p>Выбери увлечение, которое нравится больше всего</p>
                    </div>
                    <div className="card_options">
                        <button className="card_option" onClick={() => this.nextQuestionHandler(0)}>{this.state.question[0]}</button>
                        <p/>
                        <button className="card_option" onClick={() => this.nextQuestionHandler(1)}>{this.state.question[1]}</button>
                        <p/>
                        <button className="card_option" onClick={() => this.nextQuestionHandler(2)}>{this.state.question[2]}</button>
                    </div>

                </div>

            );
        }


        Superstate2.__Nat += this.state._Nat;
        Superstate2.__Num += this.state._Num;
        Superstate2.__Tech += this.state._Tech;
        Superstate2.__Soc += this.state._Soc;
        Superstate2.__Hud += this.state._Hud;
        return (<div>
                <Results/>
            </div>
        );


    }


}

export default Quiz2;