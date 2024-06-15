import { Card, WinningResult } from "./card";
import { Side } from "./rank";

export abstract class JokerCard extends Card {
    protected constructor(rank: Side) {
        super(rank);
    }
}
