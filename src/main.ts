import Customer  from './domain/entity/customer';
import Address from './domain/entity/address';
import OrderItem from './domain/entity/order_item';
import Order from './domain/entity/order';
let customer = new Customer("123", "Yuri Mollica");
const address = new Address("Rua 1", 123, "Cidade 1", "Estado 1", "pais1", "12345678");
customer.Address(address);
customer.activate();

const item1 = new OrderItem("123", "Item 1", 100, "p1", 1);
const item2 = new OrderItem("124", "Item 2", 200, "p2", 1);

const order = new Order("123", customer.id, [item1, item2]);