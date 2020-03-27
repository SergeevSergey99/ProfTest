import React from "react";
import Spreadsheet from "../spreadsheet";

class Events extends React.Component {

    state = {
        sp: new Spreadsheet(),
        check: "false",
        done: "false",
        currentEvent: 0
    };
    loadQuiz = () => {

        this.setState(() => {
            return {
                // sp: new Spreadsheet(),
                // check: false,

            };
        });
    };

    componentDidMount() {
        this.loadQuiz();
    }

    render() {

        if (localStorage < 7)
            document.location.href = "#/";
        if (this.state.check === false) {
            this.state.sp.GetEvent(localStorage.getItem("Nat"),
                localStorage.getItem("Hud"),
                localStorage.getItem("Tech"),
                localStorage.getItem("Num"),
                localStorage.getItem("Soc")
            );
            this.setState({check: true});
            setTimeout(() => {
                this.setState({done: true})
            }, 500);
        }

        if (this.state.done === true)
        {
            let months = [
                "января",
                "февраля",
                "марта",
                "апреля",
                "мая",
                "июня",
                "июля",
                "августа",
                "сентября",
                "октября",
                "ноября",
                "декабря"
            ];

            if(this.state.sp.events.length > 0)
            return (
                <div>
                    <div className="card">
                        <div className="result_text">События</div>
                        <div className="card-start_text">
                            <p>Название: {this.state.sp.events[this.state.currentEvent]["Название"]}</p>
                            <p>Дата: {this.state.sp.events[this.state.currentEvent]["Дата"]} {months[this.state.sp.events[this.state.currentEvent]["Месяц"]]} {this.state.sp.events[this.state.currentEvent]["Год"]}</p>
                            <p>Место: {this.state.sp.events[this.state.currentEvent]["Место"]}</p>
                            <p>Время: {this.state.sp.events[this.state.currentEvent]["Время"]}</p>
                        </div>
                        <div className="registr_button_exit" onClick={() => {
                            this.setState({currentEvent: (this.state.currentEvent + 1)%this.state.sp.events.length});

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
            else
                return (
                    <div>
                        <div className="card">
                            <div className="result_text">События</div>
                            <div className="card-start_text">
                                <p>Для вас не найдено событий</p>
                            </div>
                            <div className="registr_button_exit" onClick={() => {
                                this.setState({currentEvent: (this.state.currentEvent + 1)%this.state.sp.events.length});

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
        }
        if (this.state.done === true && this.state.sp.checked)
            return (
                <div>
                    <div className="card_results">
                        <div className="result_text">События</div>
                        <div className="card-start_text">Ничего</div>
                        <div className="button_next" onClick={() => {
                            document.location.href = "#/";
                        }}>
                            <div className="inner">На главную</div>
                        </div>

                    </div>
                </div>
            );
        return (

            <div>


                <div className="card_results">
                    <div className="result_text">События</div>
                    <div className="card-start_text"> {setTimeout(() => {
                        if (this.state.time < 20)
                        this.setState({done: true, time: this.state.time + 1})
                        else
                        this.setState({check: false, done: false, time: 0,sp:new Spreadsheet()})
                    }, 1000)

                        }/100</div>
                    <div className="button_next" onClick={() => {
                        document.location.href = "#/";
                    }}>
                        <div className="inner">На главную</div>
                    </div>

                </div>
            </div>
        );

    }
}

export default Events;