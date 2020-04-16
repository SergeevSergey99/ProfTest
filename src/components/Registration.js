import React from "react";
import Spreadsheet from '../spreadsheet';

class Registration extends React.Component {
    state = {
        sp: new Spreadsheet(),
        check: false,
        done: false,
        stop: false,
        time: 0
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
        if (localStorage.length >= 7 && !this.state.stop) {
            let _student = new Spreadsheet();
            _student.done = true;
            _student.student['Телефон'] = parseInt(localStorage.getItem('Phone'));
            _student.student['Школа'] = parseInt(localStorage.getItem('School'));
            _student.student['Х'] = parseInt(localStorage.getItem('Hud'));
            _student.student['Т'] = parseInt(localStorage.getItem('Tech'));
            _student.student['Ц'] = parseInt(localStorage.getItem('Num'));
            _student.student['Е'] = parseInt(localStorage.getItem('Nat'));
            _student.student['С'] = parseInt(localStorage.getItem('Soc'));
            this.setState({stop: true, check: true, done: true, sp: _student});
        }
        if (!this.state.check)
            return (
                <div>
                    <div className="card">

                        <div className="registr_title">Регистрация</div>
                        <div className="registr_text">Расписание событий по профориентации для школьников
                            Адмиралтейского
                            района будут доступны после регистрации. Для этого введите свой номер телефона и укажите
                            номер
                            школы.
                        </div>
                        <input type="tel" required id="phone" className="registr_field1"
                               placeholder="+7 (900) 123-45-67"
                               pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"/>
                        <input type="school" required id="school" className="registr_field2" placeholder="Номер школы"/>

                        <div className="registr_button" onClick={() => {
                            let Phone = document.getElementById('phone').value.replace(/[^+\d]/g, '');
                            if (Phone.length === 11)
                            {
                                if (document.getElementById('phone').value !== '' && document.getElementById('school').value !== '') {
                                    this.state.sp.AddRowToSheet("'" + Phone, "'" + document.getElementById('school').value);
                                    this.setState({check: true});
                                    setTimeout(() => {
                                        this.setState({done: true})
                                    }, 500)
                                }
                            }
                            else {
                                document.getElementById('phone').value = "";
                                document.getElementById('school').value = "";
                            }
                        }}>
                            <div className="inner">
                                Продолжить
                            </div>
                        </div>
                    </div>
                </div>
            );
        else {
            if (!this.state.sp.done) {

                setTimeout(() => {
                    if (this.state.time < 20)
                        this.setState({done: true, time: this.state.time + 1});
                    else
                        this.setState({check: false, done: false, time: 0, sp: new Spreadsheet()})
                }, 1000);

                return (
                    <div>
                        <div className="card">
                            <div className="registr_title">Идет проверка</div>
                            <div className="registr_text">Идет подключение...</div>
                        </div>
                    </div>
                );
            } else {

                localStorage.setItem('Phone', this.state.sp.student['Телефон'].toString());
                localStorage.setItem('School', this.state.sp.student['Школа'].toString());
                localStorage.setItem('Hud', this.state.sp.student['Х'].toString());
                localStorage.setItem('Nat', this.state.sp.student['Е'].toString());
                localStorage.setItem('Num', this.state.sp.student['Ц'].toString());
                localStorage.setItem('Soc', this.state.sp.student['С'].toString());
                localStorage.setItem('Tech', this.state.sp.student['Т'].toString());

                return (
                    <div>
                        <div className="card">
                            <div className="registr_title">Вы авторизованы</div>
                            <div className="registr_text">
                                <p>Номер: {this.state.sp.student['Телефон']}</p>
                                <p>Школа: {this.state.sp.student['Школа']}</p>
                            </div>
                            <div className="registr_button_exit" onClick={() => {
                                localStorage.clear();
                                document.location.href = "#/";
                            }}>
                                <div className="inner">Выйти</div>
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
    }
}

export default Registration