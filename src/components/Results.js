import React from "react";
import {Superstate2} from "./Quiz2";
import axios from "axios";
import {Line, Radar} from 'react-chartjs-2';

class Results extends React.Component {


    state = {
        currentQuestion: 0,
        _Hud: Superstate2.__Hud,
        _Tech: Superstate2.__Tech,
        _Num: Superstate2.__Num,
        _Soc: Superstate2.__Soc,
        _Nat: Superstate2.__Nat,
        stop: false,
        fade: false,
        fadeRev: false,

        isRadar:false,

        isCharts: false,
        Graph_Dates: [],
        Graph_Hud: [],
        Graph_Tech: [],
        Graph_Num: [],
        Graph_Soc: [],
        Graph_Nat: [],
        Graph_Sums: []
    };

    loadQuiz = () => {
        this.setState(() => {
            return {};
        });
    };

    componentDidMount() {
        if (Math.max(
            parseInt(localStorage.getItem('Hud')),
            parseInt(localStorage.getItem('Tech')),
            parseInt(localStorage.getItem('Num')),
            parseInt(localStorage.getItem('Nat')),
            parseInt(localStorage.getItem('Soc'))
        ) > 0) {

            this.state.Graph_Sums.push(parseInt(localStorage.getItem('Hud'))
                + parseInt(localStorage.getItem('Tech'))
                + parseInt(localStorage.getItem('Num'))
                + parseInt(localStorage.getItem('Soc'))
                + parseInt(localStorage.getItem('Nat')));

            this.state.Graph_Hud.push(parseInt(localStorage.getItem('Hud')) / this.state.Graph_Sums[0] * 100);
            this.state.Graph_Tech.push(parseInt(localStorage.getItem('Tech')) / this.state.Graph_Sums[0] * 100);
            this.state.Graph_Num.push(parseInt(localStorage.getItem('Num')) / this.state.Graph_Sums[0] * 100);
            this.state.Graph_Soc.push(parseInt(localStorage.getItem('Soc')) / this.state.Graph_Sums[0] * 100);
            this.state.Graph_Nat.push(parseInt(localStorage.getItem('Nat')) / this.state.Graph_Sums[0] * 100);

            this.state.Graph_Dates.push("2020-09-01");

            axios.get('http://127.0.0.1:8000/api/events/')
                .then(res => {
                    let i = 0;

                    res.data.sort(function (o1, o2) {
                        o1 = o1["eventDate"].replace(/-/g, '/');
                        o2 = o2["eventDate"].replace(/-/g, '/');

                        if (o1 < o2) return -1;
                        else if (o1 > o2) return 1;
                        else return 0;
                    });
                    res.data.forEach(event => {

                        if (localStorage.getItem('answeredEvents').includes(event['id'])) {
                            this.state.Graph_Dates.push(event['eventDate']);

                            let G_Hud = (this.state.Graph_Hud[i] + (event['isHudInterested'] ? 1 : 0));
                            let G_Tech = (this.state.Graph_Tech[i] + (event['isTechInterested'] ? 1 : 0));
                            let G_Num = (this.state.Graph_Num[i] + (event['isNumInterested'] ? 1 : 0));
                            let G_Soc = (this.state.Graph_Soc[i] + (event['isSocInterested'] ? 1 : 0));
                            let G_Nat = (this.state.Graph_Nat[i] + (event['isNatInterested'] ? 1 : 0));
                            this.state.Graph_Sums.push(G_Hud + G_Tech + G_Num + G_Soc + G_Nat);
                            i++;
                            this.state.Graph_Hud.push(G_Hud / this.state.Graph_Sums[i] * 100);
                            this.state.Graph_Tech.push(G_Tech / this.state.Graph_Sums[i] * 100);
                            this.state.Graph_Num.push(G_Num / this.state.Graph_Sums[i] * 100);
                            this.state.Graph_Soc.push(G_Soc / this.state.Graph_Sums[i] * 100);
                            this.state.Graph_Nat.push(G_Nat / this.state.Graph_Sums[i] * 100);

                        }


                    });
/*                    console.log(this.state.Graph_Dates);
                    console.log(this.state.Graph_Hud);
                    console.log(this.state.Graph_Tech);
                    console.log(this.state.Graph_Num);
                    console.log(this.state.Graph_Soc);
                    console.log(this.state.Graph_Nat);*/
                    this.loadQuiz();
                });
        }
        this.loadQuiz();
    }

    render() {

        if (localStorage < 7)
            document.location.href = "#/";

        if (localStorage.length >= 5 && !this.state.stop) {
            this.setState({
                _Hud: parseInt(localStorage.getItem('Hud')),
                _Tech: parseInt(localStorage.getItem('Tech')),
                _Num: parseInt(localStorage.getItem('Num')),
                _Nat: parseInt(localStorage.getItem('Nat')),
                _Soc: parseInt(localStorage.getItem('Soc')),
                stop: true
            })
        }

        let sum = this.state._Soc + this.state._Nat + this.state._Tech + this.state._Hud + this.state._Num;
        let max = Math.max(this.state._Soc, this.state._Nat, this.state._Tech, this.state._Hud, this.state._Num);

        if (max === 0) {

            sum = 1;
            max = 1;
        } else {
            localStorage.setItem('Hud', this.state._Hud.toString());
            localStorage.setItem('Nat', this.state._Nat.toString());
            localStorage.setItem('Num', this.state._Num.toString());
            localStorage.setItem('Soc', this.state._Soc.toString());
            localStorage.setItem('Tech', this.state._Tech.toString());
        }

        if (this.state.isCharts) {


            let data = {
                labels: [].concat(this.state.Graph_Dates),
                datasets: [
                    {
                        label: 'Техническое направление',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(96,135,213,0.4)',
                        borderColor: 'rgba(96,135,213,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(96,135,213,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(96,135,213,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [].concat(this.state.Graph_Tech)
                        //data: JSON.parse("["+this.state.Graph_Tech + "]")
                    },
                    {
                        label: 'Естественно-научное направление',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(114,211,99,0.4)',
                        borderColor: 'rgba(114,211,99,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(114,211,99,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(114,211,99,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [].concat(this.state.Graph_Nat)
                    },
                    {
                        label: 'Артистическое направление',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(241,170,63,0.4)',
                        borderColor: 'rgba(241,170,63,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(241,170,63,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(241,170,63,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [].concat(this.state.Graph_Hud)
                    },
                    {
                        label: 'Цифровое направление',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(185,98,239,0.4)',
                        borderColor: 'rgba(185,98,239,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(185,98,239,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(185,98,239,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [].concat(this.state.Graph_Num)
                    },
                    {
                        label: 'Социальное направление',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(239,136,167,0.4)',
                        borderColor: 'rgba(239,136,167,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(239,136,167,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(239,136,167,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [].concat(this.state.Graph_Num)
                    }
                ]
            };

            return (
                <div className="card_results">
                    <div className="result_text">Результаты изменения интересов:</div>
                    <div className="results_charts">
                        <Line data={data} width={100}
                              height={330} options={{maintainAspectRatio: false}}/>
                    </div>

                    <div className="button_next_prog" onClick={() => {
                        this.setState({isCharts: false})
                    }}>
                        <div className="inner">Результаты теста</div>
                    </div>

                    <div className="button_next" onClick={() => {
                        document.location.href = "#/";
                    }}>
                        <div className="inner">На главную</div>
                    </div>
                </div>
            );
        }
        if (this.state.isRadar){
            let data = {
                labels: ['Техническое', 'Естественно-научное',  'Артистическое', 'Цифровое', 'Социальное'],
                datasets: [
                    {
                        label: 'Результаты о направлениям',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        pointBackgroundColor: 'rgba(255,99,132,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                        data: [this.state.Graph_Tech[0], this.state.Graph_Nat[0], this.state.Graph_Hud[0], this.state.Graph_Num[0], this.state.Graph_Soc[0]]
                    }
                ]
            };
            return (
                <div className="card_results">
                    <div className="result_text">Результаты профориентационного тестирования:</div>


                    <div className="results_charts">
                        <Radar data={data} width={100}
                              height={330} options={{maintainAspectRatio: false}}/>
                    </div>
                    <div className="results_radar" onClick={() => {
                        this.setState({isRadar: false})
                    }}>
                        <div className="inner">Изменить вид</div>
                    </div>
                    {
                        localStorage.getItem('answeredEvents').length > 0 ?
                            <div className="button_next_prog" onClick={() => {
                                this.setState({isCharts: true})
                            }}>
                                <div className="inner">Прогресс</div>
                            </div>
                            : ''
                    }
                    <div className="button_next" onClick={() => {
                        document.location.href = "#/";
                    }}>
                        <div className="inner">На главную</div>
                    </div>
                </div>
            );
        }
        return (
            <div className="card_results">
                <div className="result_text">Результаты профориентационного тестирования:</div>


                <div className="results"
                     style={{background: '#6087D5', width: (50 + 40 * this.state._Tech / max) + '%'}}>
                    Техническое направление — {(this.state._Tech / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results"
                     style={{background: '#72D363', width: (50 + 40 * this.state._Nat / max) + '%'}}>
                    Естественно-научное направление — {(this.state._Nat / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results"
                     style={{background: '#F1AA3F', width: (50 + 40 * this.state._Hud / max) + '%'}}>
                    Артистическое направление — {(this.state._Hud / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results"
                     style={{background: '#B962EF', width: (50 + 40 * this.state._Num / max) + '%'}}>
                    Цифровое направление — {(this.state._Num / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results"
                     style={{background: '#EF88A7', width: (50 + 40 * this.state._Soc / max) + '%'}}>
                    Социальное направление — {(this.state._Soc / sum * 100).toFixed(1)} %
                </div>

                <div className="results_radar" onClick={() => {
                    this.setState({isRadar: true})
                }}>
                    <div className="inner">Изменить вид</div>
                </div>
                {
                    localStorage.getItem('answeredEvents').length > 0 ?
                        <div className="button_next_prog" onClick={() => {
                            this.setState({isCharts: true})
                        }}>
                            <div className="inner">Прогресс</div>
                        </div>
                        : ''
                }
                <div className="button_next" onClick={() => {
                    document.location.href = "#/";
                }}>
                    <div className="inner">На главную</div>
                </div>
            </div>
        );
    }
}

export default Results;