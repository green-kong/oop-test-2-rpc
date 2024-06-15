import { Money } from "./participant/money";
import { Card, WinningResult } from "./card/card";
import { Side } from "./card/rank";

export class Judge {
    playerWinningCount: number = 0;
    battingAmount: Money = Money.ZERO;

    judgeResult(playerCard: Card, computerCard: Card): WinningResult {
        const judgeWinning = playerCard.judgeWinning(computerCard);
        if (judgeWinning === "win") {
            this.playerWinningCount += 1;
        }
        return judgeWinning;
    }

    private initializeBattingAmount() {
        this.battingAmount = Money.ZERO;
    }

    calculateWinningPrizeBySide(playerSide: Side) {
        if (playerSide === "king") {
            const winningPrize = this.battingAmount.times(2);
            this.initializeBattingAmount()
            return winningPrize
        }
        const winningPrize = this.battingAmount.times(10);
        this.initializeBattingAmount()
        return winningPrize
    }
}
