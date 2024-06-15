import { Hand } from "./Hand";
import { Card } from "../../card/card";
import { HandWithoutJoker } from "./HandWithoutJoker";
import { HandWithoutCitizen } from "./HandWithoutCitizen";

export class HandWithAll extends Hand{

    constructor(joker: Card, citizens: Card[]) {
        super(joker, citizens);
    }

    override updateHand(): Hand {
        if (this.joker === null) {
            return new HandWithoutJoker(this.joker, this.citizens);
        }
        if (this.citizens.length === 0) {
            return new HandWithoutCitizen(this.joker, this.citizens);
        }
        return this;
    }

    override playJokerCard(): Card {
        const joker = this.joker!;
        this.joker = null;
        return joker;
    }

    override playCitizenCard(): Card {
        return this.citizens.pop()!
    }
}
