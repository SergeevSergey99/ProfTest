import React from "react";
import {QuizData} from "./QuizData";
import StarRatingComponent from 'react-star-rating-component';
import Quiz2 from "./Quiz2";

export var Superstate = {
    __Hud: 0,
    __Tech: 0,
    __Num: 0,
    __Soc: 0,
    __Nat: 0,
};

class Quiz extends React.Component {
    /*props = {
        pictures: string[]
    };*/
    state = {
        info: true,
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


        QuizData.forEach((picture) => {
            const img = new Image();
            img.src = picture.image;
        });
        this.loadQuiz();
    }


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
            }
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        this.setState({fadeRev: true, image: ''});
    }

    render() {

        if (localStorage < 7)
            document.location.href = "#/";
        if (
            parseInt(localStorage.getItem('Hud')) +
            parseInt(localStorage.getItem('Nat')) +
            parseInt(localStorage.getItem('Num')) +
            parseInt(localStorage.getItem('Soc')) +
            parseInt(localStorage.getItem('Tech')) > 0
        )
            return (<div>

                    <div className="card_results">
                        <div className="result_text">
                            <h2>Внимание</h2>
                            <h4>Вы уже прошли тест</h4>
                            <p>Вы можете посмотреть свои результаты в разделе "Результаты"</p>
                            <p>Если Вы хотите пройти тест заново, свяжитесь с нами по номеру +7(***)-***-**-**</p>
                        </div>
                        <div className="registr_button" onClick={() => {
                            document.location.href = "#/";
                        }}>
                            <div className="inner">
                                На главную
                            </div>
                        </div>
                    </div>
                </div>
            );
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
                            <h4>Далее будут представлены виды занятий</h4>
                            <p>Оцените насколько они вам интересны по 5-ти балльной шкале</p>
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
                        <div className="registr_button" onClick={() => {
                            document.location.href = "#/";
                        }}>
                            <div className="inner">
                                На главную
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
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


                    <div className="card">
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
                </div>

            );
        }


        Superstate.__Nat += this.state._Nat;
        Superstate.__Num += this.state._Num;
        Superstate.__Tech += this.state._Tech;
        Superstate.__Soc += this.state._Soc;
        Superstate.__Hud += this.state._Hud;
        return (<div>
                <Quiz2/>
            </div>
        );


    }
}

export default Quiz;
