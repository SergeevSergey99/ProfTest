import React from "react";
class StartPage extends React.Component {


    render() {
        return (
            <div>


                <div className="card_results">
                    <div className="card-start_text" onClick={() => {document.location.href = "..#/Registration";}}>Регистрация</div>
                    <div className="card-start_text" onClick={() => {document.location.href = "..#/Quiz";}}>Тест</div>
                    <div className="card-start_text" onClick={() => {document.location.href = "..#/Results";}}>Результаты</div>
                    <div className="card-start_text" onClick={() => {document.location.href = "..#/Rating";}}>Рейтинг</div>
                    <div className="card-start_text" onClick={() => {document.location.href = "..#/Events";}}>События</div>

                </div>
            </div>
        );
    }
}

export default StartPage