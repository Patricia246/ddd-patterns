import Address from "./address";
import Customer from "./customer";
import EventDispatcher from "../event/@shared/event-dispatcher";
import SendConsoleLogHandlerWhenCustomerIsCreatedHandler from "../event/customer/handler/send-console-log-handler-when-customer-is-created.handler";
import SendConsoleLog2HandlerWhenCustomerIsCreatedHandler from "../event/customer/handler/send-console-log2-handler-when-customer-is-created.handler";
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
        const address = new Address("Street1", 1, "city", "ST","1234");
        customer.changeAddress(address);

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

    it('should trigger CustomerCreated event', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        new Customer('1', 'João Silva');
        const callArgs = consoleSpy.mock.calls;
        
        expect(callArgs[0][0]).toBe('Esse é o primeiro console.log do evento: CustomerCreated');
        expect(callArgs[1][0]).toBe('Esse é o segundo console.log do evento: CustomerCreated');
      });

      it("Should trigger AddressChanged eevent", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const customer = new Customer("1234", "John Doe");

        const address = new Address("Rua A", 13, "Ribeirão Pires", "SP","12342000");
        customer.changeAddress(address);
        const callArgs = consoleSpy.mock.calls;

        expect(callArgs[0][0]).toBe('Esse é o primeiro console.log do evento: CustomerCreated');
        expect(callArgs[1][0]).toBe('Esse é o segundo console.log do evento: CustomerCreated');
        expect(callArgs[2][0]).toBe('Endereço do cliente: 1234, John Doe alterado para: Rua A, 13 - Ribeirão Pires/SP - 12342000');
    }
    );
});