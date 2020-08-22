import React from "react";
import axios from "axios";
import sha256 from 'js-sha256';


class Registration extends React.Component {
    state = {
        students: [],
        updateState: false
    };
    loadQuiz = () => {
        this.setState(() => {
            return {

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

        if (localStorage.length < 7)
            return (
                <div>
                    <div className="card">

                        <div className="registr_title">Регистрация</div>
                        <div className="registr_text">Расписание событий по профориентации для школьников
                            Адмиралтейского
                            района будут доступны после регистрации. Для этого введите свой номер телефона и укажите выданный вам
                            пароль.
                        </div>
                        <input id="phoneid" className="registr_field1"
                               placeholder="+7 (900) 123-45-67"
                               pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"/>
                        <input id="passid" className="registr_field2" placeholder="Пароль"/>

                        <div className="registr_button" onClick={() => {

                            let Phone = document.getElementById('phoneid').value.replace(/[^+\d]/g, '');
                            if (Phone.length === 11) {
                                Phone = "7" + Phone.substring(1);
                                if (document.getElementById('passid').value !== '' && document.getElementById('passid').value !== '') {

                                    this.state.students.every(student => {
                                        if (student["phone"] === Phone && student["hashPass"] === sha256(document.getElementById('passid').value)) {
                                            localStorage.setItem('Id', student["id"]);

//                                            console.log(sha256('20173'));
                                            localStorage.setItem('Phone', student["phone"]);
                                            localStorage.setItem('School', student["School"]);

                                            localStorage.setItem('Hud', student["WayHud"]);
                                            localStorage.setItem('Nat', student["WayNat"]);
                                            localStorage.setItem('Num', student["WayNum"]);
                                            localStorage.setItem('Soc', student["WaySoc"]);
                                            localStorage.setItem('Tech', student["WayTech"]);

                                            localStorage.setItem('Results', student["Results"]);
                                            localStorage.setItem('MaxPossibleResults', student["MaxPossibleResults"]);

                                            localStorage.setItem('registeredEvents', student["registeredEvents"]);
                                            localStorage.setItem('answeredEvents', student["answeredEvents"]);

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
                                document.getElementById('passid').value = "";
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
                        <div className="inner">Выйти из аккаунта</div>
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