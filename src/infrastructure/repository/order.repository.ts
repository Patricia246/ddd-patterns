import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

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
      let orderModel;
      try {
        orderModel = await OrderModel.findOne({
          where: {
            id,
          },
          rejectOnEmpty: true, 
          include: ["items"],
        });
      } catch (error) {
        throw new Error("Order not found");
      }
          
      const itemss: OrderItem[] = []
      orderModel.items.forEach((item: OrderItemModel) => {
        //order.addItems([new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)])
        const oi = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
        itemss.push(oi)
      });
      const order = new Order(id, orderModel.customer_id, itemss);
      
      
    
      return order;
    }

    async findAll(): Promise<Order[]> {
      throw console.error("error");
    }
  }