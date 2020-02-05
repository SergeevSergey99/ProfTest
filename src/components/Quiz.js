import React from "react";
import { QuizData } from "./QuizData";

import "bootstrap/dist/css/bootstrap.min.css";
class Quiz extends React.Component {
  state = {
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    _Gum: 0,
    _Tech: 0,
    _Nat: 0
  };

  loadQuiz = () => {
    const { currentQuestion } = this.state;

    this.setState(() => {
      return {
        question: QuizData[currentQuestion].name,
        image: QuizData[currentQuestion].image,
        Gum: QuizData[currentQuestion].Gum,
        Tech: QuizData[currentQuestion].Tech,
        Nat: QuizData[currentQuestion].Nat
      };
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

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

  componentDidUpdate(prevProps, prevState) {
    const { currentQuestion } = this.state;
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      if (this.state.currentQuestion <= QuizData.length - 1) {
        this.setState(() => {
          return {
            question: QuizData[currentQuestion].name,
            image: QuizData[currentQuestion].image,
            Gum: QuizData[currentQuestion].Gum,
            Tech: QuizData[currentQuestion].Tech,
            Nat: QuizData[currentQuestion].Nat
          };
        });

        console.log(this.state.currentQuestion);
        console.log(
          this.state._Gum + " " + this.state._Tech + " " + this.state._Nat
        );
      }
    }
  }

  render() {
    if (this.state.currentQuestion <= QuizData.length - 1) {
      return (
        <div className="App">
          <p>Название: {this.state.question}</p>
          <span>
            {" "}
            {this.state.currentQuestion} из {QuizData.length}
          </span>
          <p>Картинка:</p>
          <p>
            <img
              src={this.state.image}
              alt={this.state.image}
              height="250"
              width="250"
            />
          </p>

          <p>Оцените:</p>

          <button
            type="button"
            className="btn btn-danger"
            onClick={this.nextQuestionHandlerNOT}
          >
            -
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.nextQuestionHandlerMEDIUM}
          >
            +-
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.nextQuestionHandlerVERY}
          >
            +
          </button>
        </div>
      );
    } else
      return (
        <div className="App">
          <p>Ваши результаты:</p>
          <table>
            <tbody>
              <tr>
                <td>Г</td>
                <td>{this.state._Gum}</td>
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
