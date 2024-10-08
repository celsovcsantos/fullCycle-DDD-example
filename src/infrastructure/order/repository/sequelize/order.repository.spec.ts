import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/valueObject/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderRepository from "./order.repository";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import Order from "../../../../domain/checkout/entity/order";
import Product from "../../../../domain/product/entity/product";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./orderItem.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

describe("Order repository tests", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		// Add the models to the Sequelize instance
		await sequelize.addModels([
			CustomerModel,
			OrderModel,
			OrderItemModel,
			ProductModel,
		]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	test("should create a new order", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("123", "Customer 1");
		const address = new Address("Street 1", 1, "zipcode 1", "city 1");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("123", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"1",
			product.name,
			product.price,
			product.id,
			2
		);

		const order = new Order("123", customer.id, [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel.toJSON()).toStrictEqual({
			id: "123",
			customerId: "123",
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					orderId: "123",
					productId: orderItem.productId,
				},
			],
		});
	});

	test("should update an order with customer invalid", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("123", "Customer 1");
		const address = new Address("Street 1", 1, "zipcode 1", "city 1");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("123", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"1",
			product.name,
			product.price,
			product.id,
			2
		);

		const order = new Order("123", customer.id, [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel.toJSON()).toStrictEqual({
			id: "123",
			customerId: "123",
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					orderId: "123",
					productId: orderItem.productId,
				},
			],
		});

		order.changeCustomerId("456");
		order.items[0].changeQuantity(3);

		await expect(customerRepository.find(order.customerId)).rejects.toThrow(
			"Customer not found"
		);
	});

	test("should update an order", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("123", "Customer 1");
		const address = new Address("Street 1", 1, "zipcode 1", "city 1");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("123", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"1",
			product.name,
			product.price,
			product.id,
			2
		);

		const order = new Order("123", customer.id, [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel.toJSON()).toStrictEqual({
			id: "123",
			customerId: "123",
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					orderId: "123",
					productId: orderItem.productId,
				},
			],
		});

		const customer2 = new Customer("456", "Customer 2");
		//const address = new Address("Street 1", 1, "zipcode 1", "city 1");
		customer2.changeAddress(address);
		await customerRepository.create(customer2);

		order.changeCustomerId("456");
		order.items[0].changeQuantity(3);
		await orderRepository.update(order);

		const updatedOrderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(updatedOrderModel.toJSON()).toStrictEqual({
			id: "123",
			customerId: customer2.id,
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: order.items[0].quantity,
					orderId: "123",
					productId: orderItem.productId,
				},
			],
		});
	});

	test("should find an order", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("123", "Customer 1");
		const address = new Address("Street 1", 1, "zipcode 1", "city 1");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("123", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"1",
			product.name,
			product.price,
			product.id,
			2
		);

		const order = new Order("123", customer.id, [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const foundOrder = await orderRepository.find(order.id);

		expect(foundOrder).toStrictEqual(order);
	});

	test("should find all orders", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("123", "Customer 1");
		const address = new Address("Street 1", 1, "zipcode 1", "city 1");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("123", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"1",
			product.name,
			product.price,
			product.id,
			2
		);

		const order = new Order("123", customer.id, [orderItem]);

		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const orders = await orderRepository.findAll();

		expect(orders).toStrictEqual([order]);
	});
});
