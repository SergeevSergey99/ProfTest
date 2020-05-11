import React from "react";
import Spreadsheet from "../spreadsheet";

class Quest extends React.Component {

    state = {
        sp: new Spreadsheet(),
        check: "false",
        done: "false",
        currentEvent: 0,
        startQuest: false,
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
        //чтение данных из localStorage и получиние событий
        if (this.state.check === false) {
            this.state.sp.GetQestions(
                localStorage.getItem("Phone"),
                localStorage.getItem("School"),
                localStorage.getItem("Nat"),
                localStorage.getItem("Hud"),
                localStorage.getItem("Tech"),
                localStorage.getItem("Num"),
                localStorage.getItem("Soc")
            );
            this.setState({check: true});
        }
        /*        if (this.state.sp.checked === true)
                //    setTimeout(() => {
                {
                    this.state.sp.checked = false;
                    this.setState({done: true});
                }*/
        //  }, 500);


        if (this.state.sp.checked) {
            //вывод событий если они есть и если пользователь проходил тест
            if (this.state.sp.events.length > 0 && Math.max(parseInt(localStorage.getItem("Nat")),
                parseInt(localStorage.getItem("Hud")),
                parseInt(localStorage.getItem("Tech")),
                parseInt(localStorage.getItem("Num")),
                parseInt(localStorage.getItem("Soc"))) > 0)
                return (
                    <div>
                        <div className="card">
                            <div className="result_text">Задания</div>
                            <div className="registr_text">
                                <p>Название: {this.state.sp.events[this.state.currentEvent]["Название"]}</p>

                                <p>{this.state.currentEvent + 1} из {this.state.sp.events.length}</p>
                            </div>


                            <div className="button_answer" onClick={() => {
                                //this.setState({currentEvent: (this.state.currentEvent + 1) % this.state.sp.events.length});
                                //TODO
                            }}>
                                <div className="inner">Ответить на вопросы</div>
                            </div>

                            <div className="registr_button_exit" onClick={() => {
                                this.setState({currentEvent: (this.state.currentEvent + 1) % this.state.sp.events.length});
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

            // В противном случае ничего
            return (
                <div>
                    <div className="card_results">
                        <div className="result_text">Задания</div>
                        <div className="registr_text">Ничего</div>
                        <div className="registr_button" onClick={() => {
                            document.location.href = "#/";
                        }}>
                            <div className="inner">На главную</div>
                        </div>

                    </div>
                </div>
            );
        }
        // Если данные еще не получены переодически обновляем страницу в ожидании
        setTimeout(() => {
            if (this.state.time < 20)
                this.setState({done: true, time: this.state.time + 1});
            else
                this.setState({check: false, done: false, time: 0, sp: new Spreadsheet()});
        }, 1000);
        return (
            <div>
                <div className="card">
                    <div className="result_text">Задания</div>
                    <div className="registr_text">Поиск заданий...</div>
                    <div className="registr_button" onClick={() => {
                        document.location.href = "#/";
                    }}>
                        <div className="inner">На главную</div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Quest;