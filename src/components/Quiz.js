import React from "react";
import {QuizData} from "./QuizData";
import StarRatingComponent from 'react-star-rating-component';
import Results from "./Results";

/*import styled, { keyframes } from 'styled-components';
import {fadeIn} from 'react-animations';


const FadeIn = styled.div`animation: 2s ${keyframes`${fadeIn}`} `;*/

export var Superstate = {
    __Hud: 0,
    __Tech: 0,
    __Num: 0,
    __Soc: 0,
    __Nat: 0,
};

class Quiz extends React.Component {
    state = {
        currentQuestion: 0,
        _Hud: Superstate.__Hud,
        _Tech: Superstate.__Tech,
        _Num: Superstate.__Num,
        _Soc: Superstate.__Soc,
        _Nat: Superstate.__Nat,
        rating: 0,
        fade: false,
        fadeRev: false,
        isEnd: false
    };


    loadQuiz = () => {
        const {currentQuestion} = this.state;

        this.setState(() => {
            return {
                question: QuizData[currentQuestion].name,
                image: QuizData[currentQuestion].image,

                Soc: QuizData[currentQuestion].Soc,
                Num: QuizData[currentQuestion].Num,
                Hud: QuizData[currentQuestion].Hud,
                Tech: QuizData[currentQuestion].Tech,
                Nat: QuizData[currentQuestion].Nat
            };
        });
    };

    componentDidMount() {
        this.loadQuiz();
    }

    /*
        nextQuestionHandlerVERY = () => {
            this.setState({
                _Gum: this.state._Gum + this.state.Gum,
                _Tech: this.state._Tech + this.state.Tech,
                _Nat: this.state._Nat + this.state.Nat,
                currentQuestion: this.state.currentQuestion + 1
            });
        };
        nextQuestionHandlerMEDIUM = () => {
            this.setState({
                _Gum: this.state._Gum + this.state.Gum / 2,
                _Tech: this.state._Tech + this.state.Tech / 2,
                _Nat: this.state._Nat + this.state.Nat / 2,
                currentQuestion: this.state.currentQuestion + 1
            });
        };
        nextQuestionHandlerNOT = () => {
        this.setState({
          _Gum: this.state._Gum,
          _Tech: this.state._Tech,
          _Nat: this.state._Nat,
          currentQuestion: this.state.currentQuestion + 1
        });
      };
    */

    componentDidUpdate(prevProps, prevState) {
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            if (this.state.currentQuestion <= QuizData.length - 1) {

                this.setState(() => {
                    return {
                        question: QuizData[currentQuestion].name,
                        image: QuizData[currentQuestion].image,
                        Soc: QuizData[currentQuestion].Soc,
                        Num: QuizData[currentQuestion].Num,
                        Hud: QuizData[currentQuestion].Hud,
                        Tech: QuizData[currentQuestion].Tech,
                        Nat: QuizData[currentQuestion].Nat,

                    };
                });

//                console.log(this.state.currentQuestion);
                /* console.log(
                     this.state._Hud + " " + this.state._Tech + " " + this.state._Nat
                 );*/
            }
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        this.setState({fadeRev: true, image: ''});

        /* this.setState({
             _Soc: this.state._Soc + this.state.Soc * (nextValue - 1),
             _Tech: this.state._Tech + this.state.Tech * (nextValue - 1),
             _Hud: this.state._Hud + this.state.Hud * (nextValue - 1),
             _Num: this.state._Num + this.state.Num * (nextValue - 1),
             _Nat: this.state._Nat + this.state.Nat * (nextValue - 1),
             currentQuestion: this.state.currentQuestion + 1,

         });*/

    }

    render() {
        const {rating} = this.state;
        if (this.state.currentQuestion <= QuizData.length - 1) {
            return (
                <div
                    className={this.state.fadeRev ? 'fade reverse' : ''}
                    onAnimationEnd={() => {
                        if (this.state.fadeRev) {
                            this.setState({

                                _Soc: this.state._Soc + this.state.Soc * (rating - 1),
                                _Tech: this.state._Tech + this.state.Tech * (rating - 1),
                                _Hud: this.state._Hud + this.state.Hud * (rating - 1),
                                _Num: this.state._Num + this.state.Num * (rating - 1),
                                _Nat: this.state._Nat + this.state.Nat * (rating - 1),
                                fadeRev: false,
                                // fade: true,
                                rating: 0,
                                currentQuestion: this.state.currentQuestion + 1,
                            })
                        }
                    }
                    }
                >


                    <div className="card"/>
                    <img className="img"
                         src={this.state.image}
                         alt={this.state.image}
                    />
                    <div className="card-text">
                        <p>{this.state.question}</p>
                    </div>
                    <div className="grade">
                        <div className="stars">
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                    </div>

                </div>

            );

            /*

                    <span style={{align: 'center'}}>
                            {" "}
                        {this.state.currentQuestion} из {QuizData.length}
                        </span>


            <button
                            onClick={this.nextQuestionHandlerNOT}
                        >
                            Не интересно
                        </button>
                        <button
                            onClick={this.nextQuestionHandlerMEDIUM}
                        >
                            Интересно
                        </button>
                        <button
                            onClick={this.nextQuestionHandlerVERY}
                        >
                            Очень интересно
                        </button>
            * */
        } else {


            Superstate.__Nat += this.state._Nat;
            Superstate.__Num += this.state._Num;
            Superstate.__Tech += this.state._Tech;
            Superstate.__Soc += this.state._Soc;
            Superstate.__Hud += this.state._Hud;
            return (<div>
                        <Results/>
                </div>
            );


        }
    }
}

export default Quiz;
