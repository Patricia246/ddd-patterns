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
        const item1 =  new OrderItem("i1", "prod1", 100, "p1", 2);
        const item2 =  new OrderItem("i2", "prod2", 200, "p1", 2);
        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o1", "c1", [item1, item2]);

        let total1 = order1.total();
        let total2 = order2.total();

        expect(total1).toBe(200);
        expect(total2).toBe(600);
    });

    it("should check if the item quantity is greater or equal than 0", () => {
        expect(() => new OrderItem("i1", "prod1", 100, "p1", 0)).toThrowError("Quantity must be greater than 0");
    }); 

    it("should check if the item quantity is positive a number", () => {
        expect(() => new OrderItem("i1", "prod1", 100, "p1", -1)).toThrowError("Quantity must be greater than 0");
    }); 

    it("should check if the item price is greater or equal than 0", () => {
        expect(() => new OrderItem("i1", "prod1", 0, "p1", 1)).toThrowError("Price is required");
    }); 

    it("should check if the item price is a positive number", () => {
        expect(() => new OrderItem("i1", "prod1", -2, "p1", 1)).toThrowError("Price is required");
    }); 

    it("should add one item", () => {
        const item1 =  new OrderItem("i1", "prod1", 100, "p1", 2);
        const order1 = new Order("o1", "c1", [item1]);
        const item2 =  new OrderItem("i2", "prod2", 200, "p1", 2);

        order1.addItems([item2])

        expect(order1.items.length).toBe(2)
        expect(order1.total()).toBe(600);
    });

    it("should not remove a item if items list will be empty", () => {
        const item1 =  new OrderItem("i1", "prod1", 100, "p1", 2);
        const order1 = new Order("o1", "c1", [item1]);

        expect(() => {
            order1.removeItem(item1);
        }
        ).toThrowError("Items are required");
    });

    it("should throw error if you try to remove a not existent item", () => {
        const item1 =  new OrderItem("i1", "prod1", 100, "p1", 2);
        const item2 =  new OrderItem("i2", "prod2", 200, "p1", 2);
        const order1 = new Order("o1", "c1", [item1,item2]);
        const item3 =  new OrderItem("i3", "prod3", 200, "p1", 2);

        expect(() => {
            order1.removeItem(item3);
        }
        ).toThrowError("Item not found");
    });

    it("should remove an item", () => {
        const item1 =  new OrderItem("i1", "prod1", 100, "p1", 2);
        const item2 =  new OrderItem("i2", "prod2", 200, "p1", 2);
        const order1 = new Order("o1", "c1", [item1,item2]);

        expect(order1.total()).toBe(600);
        order1.removeItem(item2);

        expect(order1.items.length).toBe(1)
        expect(order1.total()).toBe(200);
    });

    it("should not change customerId if the value is empty", () => {
        const item1 =  new OrderItem("i1", "prod1", 100, "p1", 2);
        const order1 = new Order("o1", "c1", [item1]);

        expect(() => {
            order1.changeCustomer("");
        }
        ).toThrowError("Invalid customerId");
    });

    it("should change customerId", () => {
        const item1 =  new OrderItem("i1", "prod1", 100, "p1", 2);
        const order1 = new Order("o1", "c1", [item1]);

        order1.changeCustomer("i2");

        expect(order1.customerId).toBe("i2")
    });
});