import OrderItem from "./orderItem";

describe("OrderItem Unit Tests", () => {
	test("Should throw error when id is empty", () => {
		expect(() => {
			const orderItem = new OrderItem("", "teste", 10, "produto", 2);
		}).toThrow("Id is required");
	});

	test("Should throw error when name is empty", () => {
		expect(() => {
			const orderItem = new OrderItem("1", "", 10, "produto", 2);
		}).toThrow("Name is required");
	});

	test("Should throw error when productId is empty", () => {
		expect(() => {
			const orderItem = new OrderItem("1", "teste", 10, "", 2);
		}).toThrow("ProductId is required");
	});

	test("Should throw error when price is less or equal 0", () => {
		expect(() => {
			const orderItem = new OrderItem("1", "teste", 0, "produto", 2);
		}).toThrow("Price is required");
	});

	test("Should throw error when quantity is less or equal 0", () => {
		expect(() => {
			const orderItem = new OrderItem("1", "teste", 2, "produto", 0);
		}).toThrow("Quantity is required");
	});

	test("Should calculate orderItemTotal", () => {
		const orderItem = new OrderItem("item1", "teste1", 10, "produto1", 2);
		expect(orderItem.orderItemTotal()).toBe(20);
	});
});
