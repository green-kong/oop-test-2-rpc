import { JokerCard } from "./JokerCard";
import { Card, WinningResult } from "./card";

export class SlaveCard extends JokerCard {
    constructor() {
        super("slave");
    }


    override judgeWinning(other: Card): WinningResult {
        if (other.rank === "citizen") {
            return "lose";
        }

        if (other.rank === "king") {
            return "win";
        }
        throw Error("유효하지 않은 카드입니다.");
    }
}
