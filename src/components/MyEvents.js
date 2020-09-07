import React from "react";
import axios from 'axios';

class Events extends React.Component {

    state = {
        events: [],
        eventsNums: [],
        check: 0,
        done: "false",
        currentEvent: 0,
        isRegistered: -1
    };

    loadQuiz = () => {
        this.setState(() => {
            return {};
        });
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/events/')
            .then(res => {
                //var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                //event["isDraft"]
                //let date = (event["eventDate"]).replace(/-/g, '/');

                let i = 0;
                let evenum = [];
                let localevents = [];
                res.data.forEach(event => {
                    evenum.push(i);
                    if (JSON.parse("[" + localStorage.getItem('registeredEvents') + "]").includes(event['id'])) {
                        evenum.push(i);
                        localevents.push(event);
                    }
                    i++;
                });
                this.setState({check: 1, eventsNums: evenum, events: localevents});
            });
        this.loadQuiz();
    }

    render() {

        if (localStorage < 7)
            document.location.href = "#/";

/*        if (this.state.events.length > 0 && this.state.check === 0) {
            //var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            //event["isDraft"]
            //let date = (event["eventDate"]).replace(/-/g, '/');

            //console.log(utc);
            let i = 0;
            let evenum = [];
            let localevents = [];
            this.state.events.forEach(event => {
               evenum.push(i);
               if (JSON.parse("[" + localStorage.getItem('registeredEvents') + "]").includes(event['id'])) {
                    evenum.push(i);
                    localevents.push(event);
                }
                i++;
            });
            this.setState({check: 1, eventsNums: evenum, events: localevents});
            return (<div/>);
        }*/
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
                                <div className="Event_text">
                                    <p><b>Название:</b> {this.state.events[this.state.currentEvent]["title"]}</p>
                                    <p><b>Описание:</b> {this.state.events[this.state.currentEvent]["description"]}</p>
                                    <p><b>Дата:</b> {new Date(eventDate).toLocaleDateString("ru", options)}</p>
                                    <p><b>Время:</b> {this.state.events[this.state.currentEvent]["eventTime"]}</p>
                                    <p style={{color:this.state.events[this.state.currentEvent]["eventLocationRef"].length >= 5?"blue":"black"}} onClick={() => {
                                        if (this.state.events[this.state.currentEvent]["eventLocationRef"].length >= 5) {
                                            window.open(this.state.events[this.state.currentEvent]["eventLocationRef"], "_blank")
                                        }
                                    }}><b>Место:</b> {this.state.events[this.state.currentEvent]["eventLocation"]}</p>
                                    <p><b>Записалось:</b> {this.state.events[this.state.currentEvent]["registeredStudents"].length} из {this.state.events[this.state.currentEvent]["maxCountOfStudents"]} возможных</p>
                                </div>
                                <div className="registr_text_count">
                                    <p>{this.state.currentEvent + 1} из {enventslen}</p>
                                </div>
                                <div className="registr_button_exit" onClick={() => {
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
        if (this.state.check !== 0)
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
        return (
            <div>
            </div>
        );
    }
}

export default Events;