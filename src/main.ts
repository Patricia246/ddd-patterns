import Customer  from './entity/customer';
import Address from './entity/address';
import OrderItem from './entity/order_item';
import Order from './entity/order';
let customer = new Customer("123", "Yuri Mollica");
const address = new Address("123", "Rua 1", 123, "Cidade 1", "Estado 1", "Pais 1", "12345678");
customer.Address(address);
customer.activate();

const item1 = new OrderItem("123", "Item 1", 100);
const item2 = new OrderItem("124", "Item 2", 200);

const order = new Order("123", customer._id, [item1, item2]);