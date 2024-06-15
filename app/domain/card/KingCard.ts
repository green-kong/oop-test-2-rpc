import { JokerCard } from "./JokerCard";
import { Card, WinningResult } from "./card";

export class KingCard extends JokerCard {

    constructor() {
        super("king");
    }

    override judgeWinning(other: Card): WinningResult {
        if (other.rank === "citizen") {
            return "win";
        }

        if (other.rank === "slave") {
            return "lose";
        }
        throw Error("유효하지 않은 카드입니다.");
    }
}
