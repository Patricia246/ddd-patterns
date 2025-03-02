import Order from "./order";
import OrderItem from "./order_item";
describe("Order unit tests", () => {

    it("should throw an arror when id is empty", () => {
        expect(() => new Order("", "customerId", [])).toThrowError("Invalid id");
    });

    it("should throw an arror when customerId is empty", () => {
        expect(() => new Order("123", "", [])).toThrowError("Invalid customerId");
    });

    it("should throw an arror when items is empty", () => {
        expect(() => new Order("123", "customerId", [])).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        const item1 =  new OrderItem("i1", "product", 100);
        const item2 =  new OrderItem("i2", "product", 200);
        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o1", "c1", [item1, item2]);

        let total1 = order1.total();
        let total2 = order2.total();

        expect(total1).toBe(100);
        expect(total2).toBe(300);
    });

});