import React from "react";

class Registration extends React.Component {

    render() {
        return (
            <div>


                <div className="card">
                    <div className="registr_title">Регистрация</div>
                    <div className="registr_text">Расписание событий по профориентации для школьников Адмиралтейского района будут доступны после регистрации. Для этого введите свой номер телефона и укажите номер школы.</div>
                    <input type="phone" className="registr_field1" placeholder="Номер телефона"/>
                    <input type="school" className="registr_field2" placeholder="Номер школы"/>
                    <div className="registr_button" onClick={() => {
                        ;
                    }}><div className="inner">
                        Продолжить</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration