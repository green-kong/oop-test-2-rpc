import { GameService } from "../service/GameService";
import { View } from "../view/view";
import { Result } from "../service/dto/result";

export class Controller {
    service: GameService = new GameService();
    view: View = new View();

    async playGame() {
        this.view.printGameStartMessage();
        await this.setPlayerBudget();
        await this.play();
        const finalResult = this.service.getFinalResult();
        this.view.printFinalResult(finalResult);
    }

    private async setPlayerBudget() {
        try {
            const budget = await this.view.readPlayerBudget();
            this.service.setPlayerBudget(this.parseToNumber(budget));
        } catch (error: any) {
            this.view.printErrorMessage(error.message);
            await this.setPlayerBudget()
        }
    }

    private async play() {
        for (let i = 0; i < 3; i++) {
            await this.setSide();
            await this.setBattingAmount();
            const canPlayMore = await this.playRound();
            if (!canPlayMore) {
                break;
            }
        }
    }

    private async setSide() {
        try {
            const side = await this.view.readPlayerSide();
            this.service.setPlayerSide(side);
        } catch (error: any) {
            this.view.printErrorMessage(error.message);
            await this.setSide()
        }
    }

    private async setBattingAmount() {
        try {
            const battingAmount = await this.view.readPlayerBattingAmount();
            this.service.setBattingAmount(this.parseToNumber(battingAmount));
        } catch (error: any) {
            this.view.printErrorMessage(error.message);
            await this.setBattingAmount()
        }
    }

    private async playRound() {
        for (let j = 0; j < 4; j++) {
            const result = await this.playSingleRound();
            this.view.printResult(result);
            if (result.result !== "draw") {
                break;
            }
        }
        return this.service.hasEnoughBudgetToPlay()
    }

    private async playSingleRound(): Promise<Result> {
        try {
            const cardOption = await this.view.readPlayerCardOption();
            return this.service.playCard(cardOption);
        } catch (error: any) {
            this.view.printErrorMessage(error.message);
            return await this.playSingleRound()
        }
    }

    private parseToNumber(input: string) {
        const parsedInput = Number(input);
        if (isNaN(parsedInput)) {
            throw Error("숫자만 입력 가능합니다.")
        }
        return parsedInput
    }
}
