import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import ProductRepository from "./product.repository";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "../../../order/repository/sequelize/orderItem.model";
import OrderModel from "../../../order/repository/sequelize/order.model";

describe("Product repository tests", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		// Add the models to the Sequelize instance
		sequelize.addModels([
			OrderItemModel,
			OrderModel,
			ProductModel,
			CustomerModel,
		]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	test("should create a product", async () => {
		const productRepository = new ProductRepository();
		const id = uuid();
		const product = new Product(id, "Product 1", 10);
		await productRepository.create(product);

		const productModel = await ProductModel.findOne({
			where: { id },
		});

		expect(productModel.toJSON()).toStrictEqual({
			id,
			name: "Product 1",
			price: 10,
		});
	});

	test("should update a product", async () => {
		const productRepository = new ProductRepository();
		const id = uuid();
		const product = new Product(id, "Product 1", 10);

		await productRepository.create(product);
		const productModel = await ProductModel.findOne({
			where: { id },
		});
		expect(productModel.toJSON()).toStrictEqual({
			id,
			name: "Product 1",
			price: 10,
		});

		product.changeName("Product 2");
		product.changePrice(20);

		await productRepository.update(product);
		const updatedProductModel = await ProductModel.findOne({
			where: { id },
		});
		expect(updatedProductModel.toJSON()).toStrictEqual({
			id,
			name: "Product 2",
			price: 20,
		});
	});

	test("should find a product", async () => {
		const productRepository = new ProductRepository();
		const id = uuid();
		const product = new Product(id, "Product 1", 10);
		await productRepository.create(product);

		const productModel = await ProductModel.findOne({ where: { id } });

		const foundProduct = await productRepository.find(productModel.id);
		expect(foundProduct.toJSON()).toStrictEqual(productModel.toJSON());
	});

	test("should find all products", async () => {
		const productRepository = new ProductRepository();
		const product1 = new Product("1", "Product 1", 10);
		const product2 = new Product("2", "Product 2", 20);
		await productRepository.create(product1);
		await productRepository.create(product2);

		const products = await productRepository.findAll();
		expect(products.length).toBe(2);
		expect(products[0].toJSON()).toStrictEqual(product1.toJSON());
		expect(products[1].toJSON()).toStrictEqual(product2.toJSON());
	});

	test("should throw an error when product is not found", async () => {
		const productRepository = new ProductRepository();
		const id = uuid();
		const product = new Product(id, "Product 1", 10);
		await productRepository.create(product);

		const productModel = await ProductModel.findOne({ where: { id } });

		const idNotFound = "1";
		await expect(productRepository.find(idNotFound)).rejects.toThrow(
			"Product not found"
		);
	});
});
