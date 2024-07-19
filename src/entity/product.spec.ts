import Product from "./product";

describe("Product Unit Tests", () => {
	test("Should throw error when id is empty", () => {
		expect(() => {
			const product = new Product("", "Product 1", 100);
		}).toThrow("Id is required");
	});

	test("Should throw error when name is empty", () => {
		expect(() => {
			const product = new Product("12", "", 100);
		}).toThrow("Name is required");
	});

	test("Should throw error when price less than one", () => {
		expect(() => {
			const product = new Product("12", "Product 1", 0);
		}).toThrow("Price is required");
	});

	test("Should change name", () => {
		const product = new Product("12", "Product 1", 100);
		product.changeName("Product 2");
		expect(product.name).toBe("Product 2");
	});
});
