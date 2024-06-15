/**
 * 상태패턴 적용
 * 조커카드(왕, 노예)와 시민카드가 있는 핸드
 * 조커카드가 없고, 시민카드만 있는 핸드
 * 시민카드가 없고, 조커카드만 있는 핸드
 * 둘다 없는 카드
 */

import { Card } from "../../card/card";

export abstract class Hand {
    joker: Card | null;
    citizens: Card[];

    protected constructor(joker: Card | null, citizens: Card[]) {
        this.joker = joker;
        this.citizens = citizens;
    }

    abstract updateHand(): Hand;

    playJokerCard(): Card {
        throw Error("조커 카드가 손에 없습니다.")
    }

    playCitizenCard(): Card {
        throw Error("시민 카드가 손에 없습니다.")
    }
}
