import { Hand } from "./Hand";
import { Card } from "../../card/card";
import { HandWithNothing } from "./HandWithNothing";

export class HandWithoutCitizen extends Hand {

    constructor(joker: Card | null, citizens: Card[]) {
        super(joker, citizens);
    }

    override updateHand(): Hand {
        if (this.joker === null) {
            return new HandWithNothing(null, this.citizens);
        }
        return this;
    }

    override playJokerCard(): Card {
        const joker = this.joker!;
        this.joker = null;
        return joker;
    }
}
