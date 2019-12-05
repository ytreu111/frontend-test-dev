import React, { Component } from "react";
import Card from "../card/card";
import Info from "../info/info";

import "./app.scss";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18
            ],
            finiteCard: [],
            openedCards: [],
            complitedCards: [],
            completed: false,
            game: false
        };
    }
    clickCard(number, index) {
        if (this.state.openedCards.length === 2) {
            setTimeout(() => {
                this.check();
            }, 750);
        } else {
            let card = {
                number,
                index
            };
            let finiteCard = this.state.finiteCard;
            let openedCards = this.state.openedCards;
            finiteCard[index].close = false;
            openedCards.push(card);
            this.setState({
                finiteCard: finiteCard
            });
            setTimeout(() => {
                if (this.state.openedCards.length === 1) {
                    this.setState(({ finiteCard }) => {
                        let newArr = finiteCard;
                        newArr[
                            this.state.openedCards[0].index
                        ].close = true;
                        return {
                            finiteCard: newArr,
                            openedCards: []
                        };
                    });
                }
            }, 5000);
            if (this.state.openedCards.length === 2) {
                setTimeout(() => {
                    this.check();
                }, 750);
            }
        }
    }

    check() {
        let finiteCard = this.state.finiteCard;
        let complitedCards = this.state.complitedCards;
        if (
            this.state.openedCards[0].number ===
                this.state.openedCards[1].number &&
            this.state.openedCards[0].index !== this.state.openedCards[1].index
        ) {
            finiteCard[this.state.openedCards[0].index].complete = true;
            finiteCard[this.state.openedCards[1].index].complete = true;
            complitedCards.push(finiteCard[this.state.openedCards[1].index]);
            this.setState({
                finiteCard,
                openedCards: [],
                complitedCards
            });
            if (this.state.complitedCards.length === this.state.number.length) {
                this.setState({
                    completed: true
                });
            }
        } else {
            finiteCard[this.state.openedCards[0].index].close = true;
            finiteCard[this.state.openedCards[1].index].close = true;
            this.setState({
                finiteCard,
                openedCards: []
            });
        }
    }

    startGame() {
        let finiteCard = this.shuffle(
            this.state.number.concat(this.state.number))
            .map((number, index) => {
            return {
                number,
                close: true,
                complete: false,
                key: index
            };
        });
        this.setState({
            finiteCard: finiteCard,
            completed: false,
            complitedCards: []
        });
    }

    clickStart = () => {
        this.setState({
            game: !this.state.game
        });

        this.startGame();
    };

    shuffle(arr) {
        let randomIndex, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            randomIndex = Math.floor(Math.random() * (i + 1));
            temp = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    render() {
        return (
            <div className="app">
                <div className="app__field">
                    {this.state.finiteCard.map((card, index) => {
                        return (
                            <Card
                                number={card.number}
                                close={card.close}
                                complete={card.complete}
                                key={card.key}
                                clickCard={() => {
                                    this.clickCard(card.number, index);
                                }}
                            />
                        );
                    })}
                </div>
                <Info
                    game={this.state.game}
                    completed={this.state.completed}
                    clickStart={this.clickStart}
                />
            </div>
        );
    }
}
