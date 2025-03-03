import OrderItem from './order_item';
export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    validate(): boolean {
        if (!this._id) {
            throw new Error("Invalid id");
        }
        if (!this._customerId) {
            throw new Error("Invalid customerId");
        }
        if (this._items.length === 0) {
            throw new Error("Items are required");
        }
        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
}