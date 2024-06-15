import { Card } from "./card";
import { Side } from "./rank";
import { CitizenCard } from "./CitizenCard";
import { KingCard } from "./KingCard";
import { SlaveCard } from "./SlaveCard";

export class Cards {
    citizens: Card[];
    joker: Card;

    private constructor(citizens: Card[], joker: Card) {
        this.citizens = citizens;
        this.joker = joker;
    }

    static createCardDeckBySide(side: Side): Cards {
        switch (side) {
            case "king":
                return this.createKingSideCards();

            case "slave":
                return this.createSlaveSideCards();

            default:
                throw Error("유효하지 않은 진영입니다.");
        }
    }

    private static createKingSideCards(): Cards {
        return new Cards(
            [new CitizenCard(),new CitizenCard(),new CitizenCard()], new KingCard()
        );
    }

    private static createSlaveSideCards(): Cards {
        return new Cards([new CitizenCard(),new CitizenCard(),new CitizenCard()], new SlaveCard());
    }
}
