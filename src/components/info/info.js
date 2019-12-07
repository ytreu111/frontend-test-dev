import React, { Component } from "react";

import "./info.scss";
export default class Info extends Component {
    state = {
        score: [
            { name: "Дарья", time: 1.28 },
            { name: "Виктор", time: 1.32 },
            { name: "Олег", time: 1.45 },
            { name: "Аня", time: 1.56 },
            { name: "Анастасия", time: 2.15 }
        ],
        time: 0
    };

    // ЗАПУСК ТАЙМЕРА 

    interval = () => {
        let time = this.state.time;
        let timer = setInterval(() => {
            time = parseFloat(time + 0.1);
            this.setState({
                time: time.toFixed(1)
            });
            if (this.props.completed && this.props.game) {
                clearInterval(timer);
                this.setState(({score})=>{
                    let times = `${Math.floor(this.state.time / 60)}.${Math.floor(this.state.time-Math.floor(this.state.time / 60))}`
                    let newItem = {
                        name:'Вы',
                        time:times
                    } 
                    let newArr = this.state.score;
                    newArr.push(newItem);
                    newArr.sort((a, b)=>{
                        return a.time-b.time
                    })
                    return{
                        score:newArr,
                        time: 0
                    }
                })
            }
            if(!this.props.game){
                clearInterval(timer)
                this.setState({
                    time:0
                })
            }
        }, 100);
        if(this.props.game){
            
        }
        this.props.clickStart();
    };

    render() {
        let min = Math.floor(this.state.time / 60);
        let sec = (this.state.time-min*60).toFixed(1);
        return (
            <div className="info">
                <div className="info__timer">
                    <span>Таймер:{`${min}.${sec}`}</span>
                </div>
                <button className="info__btn" onClick={this.interval}>
                    {this.props.game ? "Остановить Игру": "Начать Игру"}
                </button>
                <ol className="score">
                    {this.state.score.map((person,index) => {
                        return <li key={index}>{`${person.name}, ${person.time}`}</li>;
                    })}
                </ol>
            </div>
        );
    }
}
