import readline from "node:readline";
import { Result } from "../service/dto/result";
import { FinalResult } from "../service/dto/FinalResult";

export class View {
    printGameStartMessage() {
        console.log("왕과 노예 게임을 시작합니다.")
    }

    async readPlayerBudget() {
        return await this.readLineAsync("\n플레이어의 소지금을 입력해주세요.")
    }

    async readPlayerSide() {
        return await this.readLineAsync("\n플레이어의 진영을 선택해주세요 (king | slave)")
    }

    private readLineAsync(message: string): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        return new Promise((resolve, reject) => {
            rl.question(`${message} \n`, (input: string) => {
                resolve(input)
                rl.close()
            })
        })
    }

    async readPlayerBattingAmount() {
        return await this.readLineAsync("\n배팅금액을 입력해주세요.(왕 진영 : 2배, 노예 진영 : 10배)")
    }

    async readPlayerCardOption() {
        return await this.readLineAsync("\n제출할 카드를 입력해주세요. (왕 | 노예 : joker, 시민 : normal)")
    }

    printResult(result: Result) {
        console.log("\n---------- 결과 ----------")
        console.log(`플레이어 카드 : ${result.playerCard}`)
        console.log(`컴퓨터 카드 : ${result.computerCard}`)
        console.log(`결과 : ${result.result}`)
        console.log(`플레이어 현재 보유 금액 : ${result.playerBudget}`)
        console.log("--------------------------")
    }

    printFinalResult(finalResult: FinalResult) {
        console.log("\n========== 최종 결과 ==========")
        console.log(`승리 횟수 : ${finalResult.playerWinningCount}`)
        console.log(`최종 보유 금액 : ${finalResult.budget}`)
    }

    printErrorMessage(message: string) {
        console.log(`\n[ERROR] ${message}\n`)
    }
}
