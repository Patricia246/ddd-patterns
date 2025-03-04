import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("OrderService unity tests", () => {

    it("should get totol of orders", () => {

        const orderItem1 = new OrderItem("i1", "Ïtem1", 100, "p1", 1);
        const orderItem2 = new OrderItem("i2", "Ïtem2", 200, "p2", 2);

        const order = new Order("o1", "c1", [orderItem1]);
        const order2 = new Order("o2", "c2", [orderItem2]);

        const totol = OrderService.total([order, order2]);

        expect(totol).toBe(500);
    });
});