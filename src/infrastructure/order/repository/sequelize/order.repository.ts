import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: Order): Promise<void> {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    }

    async update(entity: Order): Promise<void> {
      const[affectedCount] = await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total()
        },
        {
          where: {
            id: entity.id,
          },
        }
      );
      if (affectedCount === 0) {
        throw new Error("Customer not found");
      }
      await OrderItemModel.destroy({
        where: {
            order_id: entity.id,
        },
      });
      const orderItemsData = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(orderItemsData);
    }

    async find(id: string): Promise<Order> {
      const orderModel = await OrderModel.findByPk(id, {
        include: [OrderItemModel],
      });
  
      if (!orderModel) {
        throw new Error("Order not found");
      }
  
      const orderItems = orderModel.items.map((item) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ));
  
      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderItems
      );
  
      return order;
    }

    async findAll(): Promise<Order[]> {
      const orderModel = await OrderModel.findAll({
        include: [OrderItemModel]
      });
      
      return orderModel.map((orderModel) => {
        const orderItems = orderModel.items.map((item) => new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        ));

        const order = new Order(
          orderModel.id,
          orderModel.customer_id,
          orderItems
        );
    
        return order;
      });
    }
  }