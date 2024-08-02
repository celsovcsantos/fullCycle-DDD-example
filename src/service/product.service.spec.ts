import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
	test("should change the prices of all products", async () => {
		// Arrange
		const products = [
			new Product("1", "Product 1", 10),
			new Product("2", "Product 2", 20),
			new Product("3", "Product 3", 30),
		];
		const newPrice = 100;
		const expectedProducts = [
			new Product("1", "Product 1", 20),
			new Product("2", "Product 2", 40),
			new Product("3", "Product 3", 60),
		];

		// Act
		const result = ProductService.increasePrice(products, newPrice);

		// Assert
		expect(result).toEqual(expectedProducts);
	});
});
