import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";

describe("Customer repository unity tests", () => {
     let sequileze: Sequelize;
    
      beforeEach(async () => {
        sequileze = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
        sequileze.addModels([CustomerModel]);
        await sequileze.sync();
      });
    
      afterEach(async () => {
        await sequileze.close();
      });

    it("should create a customer", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);
        
        customer.activate();
        // Act
        await customerRepository.create(customer);
        // Assert
        const customerModel = await CustomerModel.findByPk("1");

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            street: "Rua A",
            number: 123,
            city: "Cidade A",
            state: "SP",
            zipCode: "12345678",
            active: true,
            rewardPoints: 0
        });
    });

    it("should desactivate customer", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);
        // Act
        customer.desactivate();
        await customerRepository.update(customer);
        // Assert
        const customerModel = await CustomerModel.findByPk("1");
        expect(customerModel.active).toBeFalsy();
    });

    it("should change address for customer", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);
        // Act
        const newAddress = new Address("Rua B", 456, "Cidade B", "RJ", "87654321");
        customer.changeAddress(newAddress);
        await customerRepository.update(customer);
        // Assert
        const customerModel = await CustomerModel.findByPk("1");
        expect(customerModel.street).toBe("Rua B");
        expect(customerModel.number).toBe(456);
        expect(customerModel.city).toBe("Cidade B");
        expect(customerModel.state).toBe("RJ");
        expect(customerModel.zipCode).toBe("87654321");
    });

    it("should add reward points for customer", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);
        // Act
        customer.addRewardPoints(10);
        await customerRepository.update(customer);
        // Assert
        const customerModel = await CustomerModel.findByPk("1");
        expect(customerModel.rewardPoints).toBe(10);
    });

    it("should throw an error when customer not found", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);
        customer.activate();
        // Act & Assert
        await expect(customerRepository.update(customer)).rejects.toThrow("Customer not found");
    });

    it("should find a customer", async () => {
      // Arrange
      const customerRepository = new CustomerRepository();
      const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");    
      const customer = new Customer("1", "Customer 1");
      customer.changeAddress(address);
      customer.activate();
      await customerRepository.create(customer);
      // Act
      const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
      const customerFound = await customerRepository.find("1");
      // Assert
      expect(customerModel.toJSON()).toStrictEqual({
        id: customerFound.id,
        name: customerFound.name,
        street: customerFound.Address.street,
        number: customerFound.Address.number,
        city: customerFound.Address.city,
        state: customerFound.Address.state,
        zipCode: customerFound.Address.zipCode,
        active: customerFound.isActive(),
        rewardPoints: customerFound.rewardPoints
      });
    });

    it("should throw an error when customer not found", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        // Act & Assert
        await expect(customerRepository.find("1")).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        // Arrange
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
        const customer1 = new Customer("1", "Customer 1");
        customer1.changeAddress(address);
        customer1.activate();
        const customer2 = new Customer("2", "Customer 2");
        customer2.changeAddress(address);
        customer2.activate();
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        // Act
        const customers = await customerRepository.findAll();
        // Assert
        expect(customers.length).toBe(2);
        expect(customers[0].id).toBe("1");
        expect(customers[0].name).toBe("Customer 1");
        expect(customers[0].Address.street).toBe("Rua A");
        expect(customers[0].Address.number).toBe(123);
        expect(customers[0].Address.city).toBe("Cidade A");
        expect(customers[0].Address.state).toBe("SP");
        expect(customers[0].Address.zipCode).toBe("12345678");
        expect(customers[0].isActive()).toBeTruthy();
        expect(customers[0].rewardPoints).toBe(0);
        expect(customers[1].id).toBe("2");
        expect(customers[1].name).toBe("Customer 2");
        expect(customers[1].Address.street).toBe("Rua A");
        expect(customers[1].Address.number).toBe(123);
        expect(customers[1].Address.city).toBe("Cidade A");
        expect(customers[1].Address.state).toBe("SP");
        expect(customers[1].Address.zipCode).toBe("12345678");
        expect(customers[1].isActive()).toBeTruthy();
        expect(customers[1].rewardPoints).toBe(0);
    });
});