import React from "react";
import axios from 'axios';

class Events extends React.Component {

    state = {
        events: [],
        check: "false",
        done: "false",
        currentEvent: 0
    };

    loadQuiz = () => {
        this.setState(() => {
            return {};
        });
    };

    componentDidMount() {
        axios.get('/api/events/', {headers: {'Access-Control-Allow-Origin': true}})
            .then(res => {
                this.setState({
                    events: res.data
                });

                console.log(res.data);
            });
/*        this.state.events.forEach(event => {
            let date = new Date((event["eventDate"] + " " + event["eventTime"]).replace(/-/g, '/'));
            if (date < Date.now()) {
                this.state.events.splice(this.state.events.indexOf(event), 1);
            }
        });*/
        this.loadQuiz();
    }

    render() {

        if (localStorage < 7)
            document.location.href = "#/";

        if (this.state.events)
            if (this.state.events.length > 0
                && Math.max(
                    parseInt(localStorage.getItem("Nat")),
                    parseInt(localStorage.getItem("Hud")),
                    parseInt(localStorage.getItem("Tech")),
                    parseInt(localStorage.getItem("Num")),
                    parseInt(localStorage.getItem("Soc"))
                ) > 0)
                return (
                    <div>
                        <div className="card">
                            <div className="result_text">События</div>
                            <div className="registr_text">
                                <p>Название: {this.state.events[this.state.currentEvent]["title"]}</p>
                                <p>Описание: {this.state.events[this.state.currentEvent]["description"]}</p>
                                <p>Дата: {this.state.events[this.state.currentEvent]["eventDate"]}</p>
                                <p>Место: {this.state.events[this.state.currentEvent]["eventLocation"]}</p>
                                <p>Время: {this.state.events[this.state.currentEvent]["eventTime"]}</p>
                                <p>{this.state.currentEvent + 1} из {this.state.events.length}</p>
                            </div>
                            <div className="registr_button_exit" onClick={() => {
                                this.setState({currentEvent: (this.state.currentEvent + 1) % this.state.events.length});

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
        return (
            <div>
                <div className="card_results">
                    <div className="result_text">События</div>
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
}

export default Events;