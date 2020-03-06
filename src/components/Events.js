import React from "react";

class Events extends React.Component {

    render() {

        if(localStorage < 7)
            document.location.href = "#/";
        return (
            <div>


                <div className="card_results">
                    <div className="result_text">События</div>
                    <div className="card-start_text">В разработке</div>
                    <div className="button_next" onClick={() => {
                        document.location.href = "#/";
                    }}><div className="inner">На главную</div></div>

                </div>
            </div>
        );
    }
}

export default Events