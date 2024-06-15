import { Card } from "../card/card";
import { Side } from "../card/rank";
import { Cards } from "../card/Cards";

export class Computer {
    cards: Card[] = [];

    decideSide(side: Side) {
        const createdCards = Cards.createCardDeckBySide(side);
        const deck = [...createdCards.citizens, createdCards.joker];
        deck.sort(() => Math.random() - 0.5);
        this.cards = deck;
    }

    playCard() {
        if (this.cards.length === 0) {
            throw Error("card가 없습니다.")
        }
        return this.cards.pop() as Card;
    }
}
