import React from "react";

class StartPage extends React.Component {


    render() {
        if (localStorage.length >= 7)
        {
            if(
                parseInt(localStorage.getItem('Hud')) +
                parseInt(localStorage.getItem('Nat')) +
                parseInt(localStorage.getItem('Num')) +
                parseInt(localStorage.getItem('Soc')) +
                parseInt(localStorage.getItem('Tech')) > 0
            )
            return (
                <div>
                    <div className="card_results">
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/Registration";
                        }}>
                            <div className="inner">Мои данные</div>
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
                            <div className="inner">Анонсы событий</div>
                        </div>
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/MyEvents";
                        }}>
                            <div className="inner">Мои события</div>
                        </div>
                        <div className="card-start_text" onClick={() => {
                            document.location.href = "#/Quest";
                        }}>
                            <div className="inner">Вопросы к обытиям</div>
                        </div>
                    </div>
                </div>
            );
            else
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
                        </div>
                    </div>
                );
        }
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