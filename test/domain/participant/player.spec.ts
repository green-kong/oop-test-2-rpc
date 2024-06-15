import { Player } from "../../../app/domain/participant/Player";
import {
    HandWithoutJoker
} from "../../../app/domain/participant/hand/HandWithoutJoker";
import {
    HandWithoutCitizen
} from "../../../app/domain/participant/hand/HandWithoutCitizen";
import {
    HandWithNothing
} from "../../../app/domain/participant/hand/HandWithNothing";

describe('플레이어 테스트', () => {
    it('joker카드는 한번만 낼 수 있다.', () => {
        //given
        const player = Player.from(10000);
        player.decideSide("king")
        player.playJokerCard();

        //when & then
        expect(() => {
            player.playJokerCard()
        }).toThrow("조커 카드가 손에 없습니다.");
        expect(player.hand instanceof HandWithoutJoker).toBe(true);
    });

    it('갖고있는 시민카드를 모두 소비하면 시민카드를 낼 수 없다.', () => {
        //given
        const player = Player.from(10000);
        player.decideSide("king")
        player.playCitizenCard();
        player.playCitizenCard();
        const card = player.playCitizenCard();

        //when & then
        expect(() => {
            player.playCitizenCard()
        }).toThrow("시민 카드가 손에 없습니다.");
        expect(card.rank).toBe("citizen");
        expect(player.hand instanceof HandWithoutCitizen).toBe(true);
    });

    it('갖고있는 카드를 모두 소비하면 어떤 카드도 낼 수 없다.', () => {
        //given
        const player = Player.from(10000);
        player.decideSide("king")
        player.playCitizenCard();
        player.playCitizenCard();
        const citizenCard = player.playCitizenCard();
        const jokerCard = player.playJokerCard();

        //when & then
        expect(() => {
            player.playJokerCard()
        }).toThrow("조커 카드가 손에 없습니다.");
        expect(() => {
            player.playCitizenCard()
        }).toThrow("시민 카드가 손에 없습니다.");
        expect(citizenCard.rank).toBe("citizen");
        expect(jokerCard.rank).toBe("king");
        expect(player.hand instanceof HandWithNothing).toBe(true);
    });
});
