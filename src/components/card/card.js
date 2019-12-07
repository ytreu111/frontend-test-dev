import React, { Component } from "react";

import "./card.scss";

export default class Card extends Component {
    render() {
        const { number, close, complete } = this.props;

        const clickCards = () =>{
            this.props.clickCard(number);
            this.props.interval();
        }
        return (
            <div
                className={`card ${!close ? "opened" : ""} ${
                    complete ? "complited" : ""
                }`}
                onClick={() => clickCards()}
            >
                <div className="front">?</div>
                <div className="back">{number}</div>
            </div>
        );
    }
}
