import { Rank } from "./rank";

export type WinningResult = "win" | "lose" | "draw";

export abstract class Card {
    rank: Rank

    protected constructor(rank: Rank) {
        this.rank = rank;
    }

    abstract judgeWinning(other: Card): WinningResult;
}
