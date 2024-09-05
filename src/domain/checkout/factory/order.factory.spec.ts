import { v4 as uuid } from "uuid";
import OrderFactory, { IOrderFactoryProps } from "./order.factory";

describe("Order factory unit tests", () => {
	test("should create an order", () => {
		// Arrange
		const orderProps: IOrderFactoryProps = {
			id: uuid(),
			customerId: uuid(),
			items: [
				{
					id: uuid(),
					name: "Product 1",
					productId: uuid(),
					quantity: 1,
					price: 100,
				},
				{
					id: uuid(),
					name: "Product 2",
					productId: uuid(),
					quantity: 2,
					price: 200,
				},
			],
		};
		const order = OrderFactory.create(orderProps);
		expect(order.id).toEqual(orderProps.id);
		expect(order.customerId).toEqual(orderProps.customerId);
		expect(order.items).toHaveLength(2);
	});

	// test("should create an order with items", () => {
	// 	// Arrange
	// 	const item1 = new OrderItem("1", "Product 1", 10, "123", 1);
	// 	const item2 = new OrderItem("2", "Product 2", 20, "456", 2);
	// 	const order = OrderFactory.createWithItems([item1, item2]);
	// 	expect(order.id).toBeDefined();
	// 	expect(order.items).toHaveLength(2);
	// 	expect(order.items[0]).toBe(item1);
	// 	expect(order.items[1]).toBe(item2);
	// 	expect(order.total).toBe(50);
	// });
});
