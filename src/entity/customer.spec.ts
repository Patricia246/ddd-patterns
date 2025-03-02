import Address from "./address";
import Customer from "./customer";
describe("Customer unit tests", () => {

    it("Should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John Doe");
        }
        ).toThrowError("Id is required");
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1234", "");
        }
        ).toThrowError("Name is required");
    });

    it("Should throw error when changeName is empty", () => {
        let customer = new Customer("1234", "John Doe");
        expect(() => {
            customer.changeName("");
        }
        ).toThrowError("Name is required");
    });

    it("Should change name", () => {
        // Arrange
        let customer = new Customer("1234", "John Doe");

        // Act
        customer.changeName("Jane Doe");

        // Assert
        expect(customer.name).toBe("Jane Doe");
    }
    );

    it("Should activate customer", () => {
        const customer = new Customer("1234", "John Doe");
        const address = new Address("Street1", 1, "city", "ST", "Country","1234");
        customer.Address(address);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    }
    );

    it("Should desactivate customer", () => {
        const customer = new Customer("1234", "John Doe");

        customer.desactivate();

        expect(customer.isActive()).toBe(false);
    }
    );

    it("Should throw error when activate customer without address", () => {
        const customer = new Customer("1234", "John Doe");

        expect(() => {
            customer.activate();
        }
        ).toThrowError("Address is required");
    }
    );

});