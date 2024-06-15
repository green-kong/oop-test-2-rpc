export class Money {
    private static readonly MINIMUM_MONEY = 0;
    private static readonly _UNIT = 100;
    public static readonly ZERO = Money.from(0);

    private readonly _value: number;

    private constructor(value: number) {
        this._value = value;
    }

    static from(value: number): Money {
        if (value < this.MINIMUM_MONEY) {
            throw Error("0보다 작은 금액이 될 수 없습니다.")
        }
        if (value % this._UNIT !== 0) {
            throw Error("100원 단위로만 설정할 수 있습니다.")
        }
        return new Money(value);
    }

    times(timesValue: number) {
        return Money.from(Math.ceil((this.value * timesValue) / 100) * 100);
    }

    add(other: Money): Money {
        return Money.from(this.value + other.value)
    }

    subtract(other: Money): Money {
        return Money.from(this.value - other.value)
    }

    get value(): number {
        return this._value;
    }
}
