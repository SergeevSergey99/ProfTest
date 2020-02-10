import React from "react";
import {Superstate} from "./Quiz";


class Results extends React.Component {
    state = {
        currentQuestion: 0,
        _Hud: Superstate.__Hud,
        _Tech: Superstate.__Tech,
        _Num: Superstate.__Num,
        _Soc: Superstate.__Soc,
        _Nat: Superstate.__Nat,
        rating: 0,
        fade: false,
        fadeRev: false
    };

    render() {
        var sum = this.state._Soc + this.state._Nat + this.state._Tech + this.state._Hud + this.state._Num;
        var max = Math.max(this.state._Soc, this.state._Nat, this.state._Tech, this.state._Hud, this.state._Num);
        if (max === 0) {
            sum = 1;
            max = 1;
        }
        return (
            <div className="card_results">
                <div className="result_text">Результаты профориентационного тестирования:</div>
                <div className="results" style={{background: '#6087D5', width: 300 + 200 * this.state._Tech / max}}>
                    Техническое направление — {(this.state._Tech / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results" style={{background: '#72D363', width: 300 + 200 * this.state._Nat / max}}>
                    Естественно-научное направление — {(this.state._Nat / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results" style={{background: '#F1AA3F', width: 300 + 200 * this.state._Hud / max}}>
                    Артистическое направление — {(this.state._Hud / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results" style={{background: '#B962EF', width: 300 + 200 * this.state._Num / max}}>
                    Цифровое направление — {(this.state._Num / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results" style={{background: '#EF88A7', width: 300 + 200 * this.state._Soc / max}}>
                    Социальное направление — {(this.state._Soc / sum * 100).toFixed(1)} %
                </div>
            </div>
        );
    }
}

export default Results;