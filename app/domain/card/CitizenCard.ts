import { Card, WinningResult } from "./card";

export class CitizenCard extends Card{

    constructor() {
        super("citizen");
    }

    judgeWinning(other: Card): WinningResult {
        if (other.rank === "citizen") {
            return "draw"
        }
        if (other.rank === "king") {
            return "lose"
        }
        if (other.rank === "slave") {
            return "win"
        }
        throw Error("유효하지 않은 카드입니다.")
    }
}
