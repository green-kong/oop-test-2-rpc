import { Hand } from "./Hand";
import { Card } from "../../card/card";
import { HandWithNothing } from "./HandWithNothing";

export class HandWithoutJoker extends Hand{

    constructor(joker: null, citizens: Card[]) {
        super(joker, citizens);
    }

    updateHand(): Hand {
        if (this.citizens.length === 0) {
            return new HandWithNothing(null, []);
        }
        return this;
    }

    playCitizenCard(): Card {
        return this.citizens.pop()!
    }
}
