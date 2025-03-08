import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
import Customer from "../../domain/customer/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/customer/value-object/address";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipCode: entity.Address.zipCode,
            state: entity.Address.state,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
          });
    }

    async update(entity: Customer): Promise<void> {
        const [affectedCount] = await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipCode: entity.Address.zipCode,
            state: entity.Address.state,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id,
            },
        });
        if (affectedCount === 0) {
            throw new Error("Customer not found");
        }
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
          customerModel = await CustomerModel.findOne({
            where: {
              id,
            },
            rejectOnEmpty: true,
          });
        } catch (error) {
          throw new Error("Customer not found");
        }
    
        const customer = new Customer(id, customerModel.name);
        const address = new Address(
          customerModel.street,
          customerModel.number,
          customerModel.city,
          customerModel.state,
          customerModel.zipCode,
        );
        customer.changeAddress(address);
        return customer;
      }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.city,
                customerModel.state,
                customerModel.zipCode,
            );
            customer.changeAddress(address);
            return customer;
        });
    }
}