import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("OrderService unity tests", () => {

    it("should place an order", () => {

        const customer = new Customer("c1", "Customer1");
        const item1 = new OrderItem("i1", "Ïtem1", 100, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(50);
        expect(order.total()).toBe(100);
    });

    it("should get totol of orders", () => {

        const orderItem1 = new OrderItem("i1", "Ïtem1", 100, "p1", 1);
        const orderItem2 = new OrderItem("i2", "Ïtem2", 200, "p2", 2);

        const order = new Order("o1", "c1", [orderItem1]);
        const order2 = new Order("o2", "c2", [orderItem2]);

        const totol = OrderService.total([order, order2]);

        expect(totol).toBe(500);
    });

    it("should add reward points to customer", () => {

        const customer = new Customer("c1", "Customer1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});