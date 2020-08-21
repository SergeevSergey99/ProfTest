import React from "react";
import axios from 'axios';

class Events extends React.Component {

    state = {
        events: [],
        eventsNums: [],
        check: 0,
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
        this.loadQuiz();
    }

    render() {

        if (localStorage < 7)
            document.location.href = "#/";

        if (this.state.events.length > 0 && this.state.check === 0) {
            var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            //console.log(utc);
            let i = 0;
            let evenum = [];
            let localevents = [];
            this.state.events.forEach(event => {
                evenum.push(i);

                let date = (event["eventDate"]).replace(/-/g, '/');
                //console.log(date);
                if (date >= utc) {

                    evenum.push(i);
                    localevents.push(event);
                    //this.state.events.splice(this.state.events.indexOf(event), 1);
                    //evenum.splice(this.state.events.indexOf(event), 1);
                }
                i++;
            });
            this.setState({check: 1, eventsNums: evenum, events: localevents});
            return (<div/>);
        }
        let enventslen = this.state.events.length;// - localStorage.getItem("registeredEvents").length;
        if (this.state.events)
            if (enventslen > 0) {

                if (Math.max(
                    parseInt(localStorage.getItem("Nat")),
                    parseInt(localStorage.getItem("Hud")),
                    parseInt(localStorage.getItem("Tech")),
                    parseInt(localStorage.getItem("Num")),
                    parseInt(localStorage.getItem("Soc"))
                ) > 0) {

                    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    let eventDate  = this.state.events[this.state.currentEvent]["eventDate"].replace(/-/g, '/');
                    return (
                        <div>
                            <div className="card">
                                <div className="result_text">События</div>
                                <div className="registr_text">
                                    <p><b>Название:</b> {this.state.events[this.state.currentEvent]["title"]}</p>
                                    <p><b>Описание:</b> {this.state.events[this.state.currentEvent]["description"]}</p>
                                    <p><b>Дата:</b> {new Date(eventDate).toLocaleDateString("ru", options)}</p>
                                    <p><b>Время:</b> {this.state.events[this.state.currentEvent]["eventTime"]}</p>
                                    <p><b>Место:</b> {this.state.events[this.state.currentEvent]["eventLocation"]}</p>
                                </div>
                                <div className="registr_text_count">
                                    <p>{this.state.currentEvent + 1} из {enventslen}</p>
                                </div>
                                <div className="registr_button_registr" onClick={() => {
                                    this.setState({currentEvent: (this.state.currentEvent + 1) % enventslen});
                                }}>
                                    <div className="inner">Записаться</div>
                                </div><div className="registr_button_next" onClick={() => {
                                this.setState({currentEvent: (this.state.currentEvent + 1) % enventslen});
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
            }
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