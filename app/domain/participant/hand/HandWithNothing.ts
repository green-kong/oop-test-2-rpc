import { Hand } from "./Hand";
import { Card } from "../../card/card";

export class HandWithNothing extends Hand {

    constructor(joker: null, citizens: Card[]) {
        super(joker, citizens);
    }

    updateHand(): Hand {
        throw Error("더이상 상태를 업데이트 할 수 없습니다");
    }
}
