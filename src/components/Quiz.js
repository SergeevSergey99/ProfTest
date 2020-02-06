import React from "react";
import {QuizData} from "./QuizData";
import StarRatingComponent from 'react-star-rating-component';

class Quiz extends React.Component {
    state = {
        currentQuestion: 0,
        _Hud: 0,
        _Tech: 0,
        _Num: 0,
        _Soc: 0,
        _Nat: 0,
        rating: 0
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
                        Nat: QuizData[currentQuestion].Nat
                    };
                });

                console.log(this.state.currentQuestion);
               /* console.log(
                    this.state._Hud + " " + this.state._Tech + " " + this.state._Nat
                );*/
            }
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});

        this.setState({
            _Soc: this.state._Soc + this.state.Soc * (nextValue-1),
            _Tech: this.state._Tech + this.state.Tech * (nextValue-1),
            _Hud: this.state._Hud + this.state.Hud * (nextValue-1),
            _Num: this.state._Num + this.state.Num * (nextValue-1),
            _Nat: this.state._Nat + this.state.Nat * (nextValue-1),
            currentQuestion: this.state.currentQuestion + 1
        });

    }

  render() {
      const { rating } = this.state;
        if (this.state.currentQuestion <= QuizData.length - 1) {
            return (
                <div>

                    <div className="card"></div>
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
        } else
            return (
                <div className="card">
                    <p>Ваши результаты:</p>
                    <table>
                        <tbody>
                        <tr>
                            <td>C</td>
                            <td>{this.state._Soc}</td>
                        </tr>
                        <tr>
                            <td>Ц</td>
                            <td>{this.state._Num}</td>
                        </tr>
                        <tr>
                            <td>Х</td>
                            <td>{this.state._Hud}</td>
                        </tr>
                        <tr>
                            <td>Т</td>
                            <td>{this.state._Tech}</td>
                        </tr>
                        <tr>
                            <td>Е</td>
                            <td>{this.state._Nat}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            );
    }
}

export default Quiz;
