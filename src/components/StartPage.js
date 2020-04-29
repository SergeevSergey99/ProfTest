import React from "react";

class StartPage extends React.Component {


    render() {
        if (localStorage.length >= 7)

            return (
                <div>
                    <div className="card_results">
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/Registration";
                        }}>
                            <div className="inner">Мои данные</div>
                        </div>
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/Quiz";
                        }}>
                            <div className="inner">Тест</div>
                        </div>
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/Results";
                        }}>
                            <div className="inner">Результаты</div>
                        </div>
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/Rating";
                        }}>
                            <div className="inner">Рейтинг</div>
                        </div>
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/Events";
                        }}>
                            <div className="inner">События</div>
                        </div>
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/Quest";
                        }}>
                            <div className="inner">Вопросы</div>
                        </div>
                    </div>
                </div>
            );
        return (
            <div>


                <div className="card_results">
                    <div className="card-start_text" onClick={() => {
                        document.location.href = "#/Registration";
                    }}>
                        <div className="inner">Регистрация</div>
                    </div>
                </div>
            </div>
        );

    }
}

export default StartPage