import React from "react";

class Registration extends React.Component {

    render() {
        return (
            <div>


                <div className="card">
                    <div className="registr_title">Регистрация</div>
                    <div className="registr_text">Расписание событий по профориентации для школьников Адмиралтейского района будут доступны после регистрации. Для этого введите свой номер телефона и укажите номер школы.</div>
                    <div className="registr_field1">Номер телефона</div>
                    <div className="registr_field2">Номер школы</div>
                    <div className="registr_button">
                        Продолжить
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration