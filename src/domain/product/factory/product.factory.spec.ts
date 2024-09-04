import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
	test("should create a product type A", async () => {
		const product = ProductFactory.create("A", "Product A", 1);
		expect(product.id).toBeDefined();
		expect(product.name).toBe("Product A");
		expect(product.price).toBe(1);
		expect(product.constructor.name).toBe("Product");
	});

	test("should create a product type B", async () => {
		const product = ProductFactory.create("B", "Product B", 1);
		expect(product.id).toBeDefined();
		expect(product.name).toBe("Product B");
		expect(product.price).toBe(2);
		expect(product.constructor.name).toBe("ProductB");
	});

	test("should throw an error when creating a product with an unsupported type", async () => {
		expect(() => {
			ProductFactory.create("C", "Product C", 1);
		}).toThrow("Product type not supported");
	});
});
