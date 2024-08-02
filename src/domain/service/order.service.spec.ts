import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
	test("should place an order", () => {
		const customer = new Customer("customer1", "Customer 1");
		const orderItem = new OrderItem("item1", "Item 1", 10, "Product 1", 1);

		const order = OrderService.placeOrder(customer, [orderItem]);

		expect(customer.rewardPoints).toBe(5);
		expect(order.total()).toBe(10);
	});
	test("should get total of all orders", async () => {
		const listOrderItem = [
			new OrderItem("item1", "Item 1", 100, "Product 1", 1),
			new OrderItem("item2", "Item 2", 200, "Product 2", 2),
		];
		const listOrder = [
			new Order("order1", "Customer 1", [listOrderItem[0]]),
			new Order("order2", "Customer 2", [listOrderItem[1]]),
		];

		const total = OrderService.total(listOrder);

		expect(total).toBe(500);
	});
});
