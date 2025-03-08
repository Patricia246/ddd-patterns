import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.createCustomer("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with an Address", () => {
        const address = new Address("Street1", 1, "city", "ST","1234");
        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
    });
});