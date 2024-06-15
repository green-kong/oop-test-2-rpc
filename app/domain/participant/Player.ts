import { Hand } from "./hand/Hand";
import { Side } from "../card/rank";
import { Money } from "./money";
import { HandWithNothing } from "./hand/HandWithNothing";
import { HandWithAll } from "./hand/HandWithAll";
import { Cards } from "../card/Cards";

export type PlayerCardOption = "joker" | "normal";

export class Player {
    static initialPlayer = new Player(Money.ZERO);
    side: Side | "neutral" = "neutral";
    hand: Hand = new HandWithNothing(null, []);
    budget: Money = Money.ZERO;

    private constructor(budget: Money) {
        this.budget = budget
    }

    static from(budget: number) {
        return new Player(Money.from(budget));
    }

    decideSide(side: Side) {
        this.side = side;
        const cards = Cards.createCardDeckBySide(side);
        this.hand = new HandWithAll(cards.joker, cards.citizens);
    }

    batting(battingAmount: number) {
        const batting = Money.from(battingAmount);
        this.budget = this.budget.subtract(batting);
        return batting;
    }

    playCard(playerCardOption: PlayerCardOption) {
        if (playerCardOption === "joker") {
            return this.playJokerCard();
        }
        if (playerCardOption === "normal") {
            return this.playCitizenCard();
        }
        throw Error("유효하지 않은 옵션입니다.")
    }

    playJokerCard() {
        const joker = this.hand.playJokerCard()
        this.hand = this.hand.updateHand();
        return joker;
    }

    playCitizenCard() {
        const citizen = this.hand.playCitizenCard();
        this.hand = this.hand.updateHand();
        return citizen;
    }

    takeWinningPrize(winningPrize: Money) {
        this.budget = this.budget.add(winningPrize);
    }

    hasEnoughMoney() {
        return this.budget.value >= 100;
    }
}
