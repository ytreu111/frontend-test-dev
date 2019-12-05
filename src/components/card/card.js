import React, { Component } from "react";

import "./card.scss";

export default class Car extends Component {
    render() {
        const { number, close, complete } = this.props;
        return (
            <div
                className={`card ${!close ? "opened" : ""} ${
                    complete ? "complited" : ""
                }`}
                onClick={() => this.props.clickCard(number)}
            >
                <div className="front">?</div>
                <div className="back">{number}</div>
            </div>
        );
    }
}
