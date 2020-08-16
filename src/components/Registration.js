import React from "react";
import axios from "axios";

//import Spreadsheet from '../spreadsheet';

class Registration extends React.Component {
    state = {
//        sp: new Spreadsheet(),
        students: [],
        updateState: false
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
        axios.get('/api/students/', {headers: {'Access-Control-Allow-Origin': true}})
            .then(res => {
                this.setState({
                    students: res.data
                });

                console.log(res.data);
            });
        this.loadQuiz();
    }

    render() {
        /*if (localStorage.length >= 7) {
            let _student = new Spreadsheet();
            _student.done = true;
            _student.student['Телефон'] = parseInt(localStorage.getItem('Phone'));
            _student.student['Школа'] = parseInt(localStorage.getItem('School'));
            _student.student['Х'] = parseInt(localStorage.getItem('Hud'));
            _student.student['Т'] = parseInt(localStorage.getItem('Tech'));
            _student.student['Ц'] = parseInt(localStorage.getItem('Num'));
            _student.student['Е'] = parseInt(localStorage.getItem('Nat'));
            _student.student['С'] = parseInt(localStorage.getItem('Soc'));
            this.setState({check: true, done: true, sp: _student});
        }*/
//        if (!this.state.check)
        if (localStorage.length < 7)
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
                        <input id="phoneid" className="registr_field1"
                               placeholder="+7 (900) 123-45-67"
                               pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"/>
                        <input id="schoolid" className="registr_field2" placeholder="Номер школы"/>

                        <div className="registr_button" onClick={() => {

                            let Phone = document.getElementById('phoneid').value.replace(/[^+\d]/g, '');
                            if (Phone.length === 11) {
                                Phone = "7" + Phone.substring(1);
                                if (document.getElementById('phoneid').value !== '' && document.getElementById('schoolid').value !== '') {
                                    // this.state.sp.AddRowToSheet(Phone, document.getElementById('school').value);

//TODO проверка существования пользовантеля
                                    this.state.students.every(student => {
                                        if (student["phone"] === Phone && student["School"] === document.getElementById('schoolid').value) {
                                            localStorage.setItem('Phone', student["phone"]);
                                            localStorage.setItem('School', student["School"]);

                                            localStorage.setItem('Hud', student["WayHud"]);
                                            localStorage.setItem('Nat', student["WayNat"]);
                                            localStorage.setItem('Num', student["WayNum"]);
                                            localStorage.setItem('Soc', student["WaySoc"]);
                                            localStorage.setItem('Tech', student["WayTech"]);

                                            this.setState({updateState: true});
                                            return false;
                                            /*localStorage.setItem('Hud', "0");
                                            localStorage.setItem('Nat', "0");
                                            localStorage.setItem('Num', "0");
                                            localStorage.setItem('Soc', "0");
                                            localStorage.setItem('Tech', "0");*/
                                        }
                                        return true;

                                    });
                                }
                            }
                                document.getElementById('phoneid').value = "";
                                document.getElementById('schoolid').value = "";
                                this.setState({updateState: this.state.updateState ^ true});

                        }}>
                            <div className="inner">
                                Продолжить
                            </div>
                        </div>
                    </div>
                </div>
            );


        return (
            <div>
                <div className="card">
                    <div className="registr_title">Вы авторизованы</div>
                    <div className="registr_text">
                        <p>Номер: {localStorage.getItem('Phone')}</p>
                        <p>Школа: {localStorage.getItem('School')}</p>
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

export default Registration