import { Player, PlayerCardOption } from "../domain/participant/Player";
import { Judge } from "../domain/judge";
import { Computer } from "../domain/participant/computer";
import { Side } from "../domain/card/rank";
import { Result } from "./dto/result";
import { FinalResult } from "./dto/FinalResult";

export class GameService {
    player: Player = Player.initialPlayer;
    judge: Judge = new Judge();
    computer: Computer = new Computer();

    setPlayerBudget(budget: number) {
        this.player = Player.from(budget);
    }

    setPlayerSide(side: string) {
        this.player.decideSide(side as Side);
        if (side === "king") {
            this.computer.decideSide("slave")
        }

        if (side === "slave") {
            this.computer.decideSide("king")
        }
    }

    setBattingAmount(battingAmount: number) {
        this.judge.battingAmount = this.player.batting(battingAmount);
    }

    playCard(playerCardOption: string) {
        const playerCard = this.player.playCard(playerCardOption as PlayerCardOption);
        const computerCard = this.computer.playCard();
        const judgeResult = this.judge.judgeResult(playerCard, computerCard);
        if (judgeResult === "win") {
            const winningPrize = this.judge.calculateWinningPrizeBySide(this.player.side as Side);
            this.player.takeWinningPrize(winningPrize);
        }
        return new Result(playerCard.rank, computerCard.rank, judgeResult, this.player.budget.value);
    }

    getFinalResult() {
        const playerWinningCount = this.judge.playerWinningCount;
        const budget = this.player.budget.value;
        return new FinalResult(playerWinningCount, budget);
    }

    hasEnoughBudgetToPlay() {
        return this.player.hasEnoughMoney()
    }
}
