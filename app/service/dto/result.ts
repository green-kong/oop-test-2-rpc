import { WinningResult } from "../../domain/card/card";

export class Result {
    playerCard: string
    computerCard: string
    result: WinningResult;
    playerBudget: number;

    constructor(playerCard: string, computerCard: string, result: WinningResult, playerBudget: number) {
        this.playerCard = playerCard;
        this.computerCard = computerCard;
        this.result = result;
        this.playerBudget = playerBudget;
    }
}
