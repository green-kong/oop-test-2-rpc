import { Controller } from "./controller/controller";

async function main() {
    const controller = new Controller();
    await controller.playGame();
}

main()
