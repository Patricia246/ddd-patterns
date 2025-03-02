export default class Product {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    validate(): boolean {
        if (!this._id) {
            throw new Error("Invalid id");
        }
        if (!this._name) {
            throw new Error("Invalid name");
        }
        if (!this._price) {
            throw new Error("Invalid price");
        }
        if (this._price < 0) {
            throw new Error("Price cannot be less than zero");
        }
        return true;
    }
}