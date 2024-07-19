import Order from "./order";
import OrderItem from "./orderItem";

describe("Order Unit Tests", () => {
	test("Should throw error when id is empty", () => {
		expect(() => {
			const orderItem = new OrderItem("1", "teste", 10);
			const order = new Order("", "123", [orderItem]);
		}).toThrow("Id is required");
	});

	test("Should throw error when customerId is empty", () => {
		expect(() => {
			const orderItem = new OrderItem("1", "teste", 10);
			const order = new Order("12", "", [orderItem]);
		}).toThrow("CustomerId is required");
	});

	test("Should throw error when items is empty", () => {
		expect(() => {
			const order = new Order("12", "123", []);
		}).toThrow("Items are required");
	});

	test("Should calculate total", () => {
		const orderItem1 = new OrderItem("item1", "teste1", 10);
		const orderItem2 = new OrderItem("item2", "teste2", 20);
		const order1 = new Order("12", "123", [orderItem1, orderItem2]);
		expect(order1.total()).toBe(30);
		const orderItem3 = new OrderItem("item3", "teste3", 20);
		const order2 = new Order("13", "124", [
			orderItem1,
			orderItem2,
			orderItem3,
		]);
		expect(order2.total()).toBe(50);
	});
});
