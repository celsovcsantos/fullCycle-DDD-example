import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/orderItem";

let customer = new Customer("123", "Celso Santos");
const address = new Address("Rua 1", 2, "09725-100", "São Bernardo do Campo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "product1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "product2", 2);
const order = new Order("1", customer.id, [item1, item2]);
