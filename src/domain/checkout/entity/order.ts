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

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
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

    addItems(items: OrderItem[]): void {
        this._items.push(...items);         
    }

    removeItem(item: OrderItem): void {
        if(this._items.length <= 1) {
            throw new Error("Items are required");
        }
        const index = this._items.findIndex(i => i.id === item.id);
        if(index === -1) {
            throw new Error("Item not found");
        }
        if (index !== -1) {
            this._items.splice(index, 1);
        }     
    }

    changeCustomer(customerId: string){
        this._customerId = customerId;
        this.validate();
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.getItemsPrice(), 0);
    }
}