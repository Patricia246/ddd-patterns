import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order.model";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderItemModel from "./order-item.model";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      OrderModel,
      CustomerModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a order to include items", async() => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const newProduct = new Product("321", "Product NEW", 1);
    await productRepository.create(newProduct);

    const orderItemNew = new OrderItem(
      "2",
      newProduct.name,
      newProduct.price,
      newProduct.id,
      1
    )

    order.addItems([orderItemNew])
    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    const orderJson = orderModel.toJSON();
    
    expect(orderJson.total).toBe(order.total()) 
    expect(orderJson.items.length).toBe(2);
    expect(orderJson.items[0].id).toBe(orderItem.id);
    expect(orderJson.items[0].product_id).toBe(orderItem.productId);
    expect(orderJson.items[0].quantity).toBe(orderItem.quantity);
    expect(orderJson.items[1].id).toBe(orderItemNew.id);
    expect(orderJson.items[1].product_id).toBe(orderItemNew.productId);
    expect(orderJson.items[1].quantity).toBe(orderItemNew.quantity)
  });

  it("should update when remove item", async() => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const product2 = new Product("321", "Product NEW", 1);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    )
    const order = new Order("123", "123", [orderItem,orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.removeItem(orderItem2);
    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("shoud update customer from order", async() => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const customerNew = new Customer("321", "Customer 2");
    customerNew.changeAddress(address);
    await customerRepository.create(customerNew);

    order.changeCustomer(customerNew.id);

    await orderRepository.update(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "321",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should throw error when order not exist", async() => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();

    await expect(orderRepository.update(order)).rejects.toThrow("Customer not found");
  })

  it("should find an existent order", async() => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
    
    const orderFound = await orderRepository.find("123");    
    
    expect(orderModel.toJSON().total).toBe(orderFound.total()) 
    expect(orderModel.toJSON().items.length).toBe(1);
    expect(orderModel.toJSON().id).toBe(orderFound.id) 
    expect(orderModel.toJSON().customer_id).toBe(orderFound.customerId) 
    expect(orderModel.toJSON().total).toBe(orderFound.total()) 
    expect(orderModel.items[0].id).toBe(orderFound.items[0].id);
    expect(orderModel.items[0].product_id).toBe(orderFound.items[0].productId);
    expect(orderModel.items[0].quantity).toBe(orderFound.items[0].quantity);
    expect(orderModel.items[0].price).toBe(orderFound.items[0].price);
    expect(orderModel.items[0].order_id).toBe(orderFound.id);
  });

  it("should throw error when not found a error", async() => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find("567")).rejects.toThrow("Order not found");
  });

  it("should find all order", async() => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("123", "Customer 1");
    const address = new Address("Rua A", 123, "Cidade A", "SP", "12345678");
    customer1.changeAddress(address);
    await customerRepository.create(customer1);
    const customer2 = new Customer("12", "Customer 2");
    customer2.changeAddress(address)
    await customerRepository.create(customer2);
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const orderItem1 = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      1
    );
    const orderItem3 = new OrderItem(
      "3",
      product.name,
      product.price,
      product.id,
      1
    );
    const order1 = new Order("123", "123", [orderItem1, orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    const order2 = new Order("124", "12", [orderItem3]);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll()

    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe(order1.id);
    expect(orders[0].customerId).toBe(order1.customerId);
    expect(orders[0].total()).toBe(order1.total());
    expect(orders[0].items.length).toBe(order1.items.length);
    expect(orders[0].items[0].id).toBe(orderItem1.id);
    expect(orders[0].items[0].name).toBe(orderItem1.name);
    expect(orders[0].items[0].price).toBe(orderItem1.price);
    expect(orders[0].items[0].productId).toBe(orderItem1.productId);
    expect(orders[0].items[0].quantity).toBe(orderItem1.quantity);
    expect(orders[0].items[1].id).toBe(orderItem2.id);
    expect(orders[0].items[1].name).toBe(orderItem2.name);
    expect(orders[0].items[1].price).toBe(orderItem2.price);
    expect(orders[0].items[1].productId).toBe(orderItem2.productId);
    expect(orders[0].items[1].quantity).toBe(orderItem2.quantity);
    expect(orders[1].id).toBe(order2.id);
    expect(orders[1].customerId).toBe(order2.customerId);
    expect(orders[1].total()).toBe(order2.total());
    expect(orders[1].items.length).toBe(order2.items.length);
    expect(orders[1].items[0].id).toBe(orderItem3.id);
    expect(orders[1].items[0].name).toBe(orderItem3.name);
    expect(orders[1].items[0].price).toBe(orderItem3.price);
    expect(orders[1].items[0].productId).toBe(orderItem3.productId);
    expect(orders[1].items[0].quantity).toBe(orderItem3.quantity);
  });
});