import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import { v4 as uuid } from "uuid";
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/valueObject/address";
import EventDispatcher from "../../../../domain/@shared/event/eventDispatcher";
import SendMsgConsoleWhenCustomerIsCreatedHandler from "../../../../domain/customer/event/handler/sendMsgConsoleWhenCustomerIsCreated.handler";
import CustomerCreatedEvent from "../../../../domain/customer/event/customerCreated.event";
import SendMsgConsoleWhenCustomerAddressIsUpdatedHandler from "../../../../domain/customer/event/handler/sendMsgConsoleWhenCustomerAddressIsUpdated.handler";
import CustomerAddressUpdatedEvent from "../../../../domain/customer/event/customerAddressUpdated.event";
import SendMsgConsoleWhenCustomerIsCreatedHandler2 from "../../../../domain/customer/event/handler/sendMsgConsoleWhenCustomerIsCreated2.handler";

describe("Customer repository tests", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		// Add the models to the Sequelize instance
		sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	test("should create a customer", async () => {
		const customerRepository = new CustomerRepository();
		const id = uuid();
		const customer = new Customer(id, "Customer 1");
		customer.changeAddress(new Address("Street 1", 10, "1234", "City 1"));
		customer.activate();
		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({
			where: { id: id },
		});

		expect(customerModel.toJSON()).toStrictEqual({
			id,
			name: customer.name,
			street: customer.address.street,
			number: customer.address.number,
			zipcode: customer.address.zip,
			city: customer.address.city,
			active: customer.active,
			rewardPoints: customer.rewardPoints,
		});

		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendMsgConsoleWhenCustomerIsCreatedHandler();
		const spyEventHandler = jest.spyOn(eventHandler, "handle");
		const eventHandler2 = new SendMsgConsoleWhenCustomerIsCreatedHandler2();
		const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

		eventDispatcher.register("CustomerCreatedEvent", eventHandler);
		eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

		expect(
			eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
		).toMatchObject(eventHandler);

		// expect(
		// 	eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
		// ).toMatchObject(eventHandler2);

		const customerCreatedEvent = new CustomerCreatedEvent({
			id,
			name: customer.name,
			street: customer.address.street,
			number: customer.address.number,
			zipcode: customer.address.zip,
			city: customer.address.city,
			active: customer.active,
			rewardPoints: customer.rewardPoints,
		});

		// Quando o notify for executado o SendMsgConsoleWhenCustomerIsCreatedHandler.handle() deve ser chamado
		eventDispatcher.notify(customerCreatedEvent);
		expect(spyEventHandler).toHaveBeenCalled();

		eventDispatcher.notify(customerCreatedEvent);
		expect(spyEventHandler2).toHaveBeenCalled();
	});

	test("should update a customer", async () => {
		const customerRepository = new CustomerRepository();
		const id = uuid();
		const customer = new Customer(id, "Customer 1");
		customer.changeAddress(new Address("Street 1", 10, "1234", "City 1"));
		customer.activate();
		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({
			where: { id: customer.id },
		});
		expect(customerModel.toJSON()).toStrictEqual({
			id,
			name: customer.name,
			street: customer.address.street,
			number: customer.address.number,
			zipcode: customer.address.zip,
			city: customer.address.city,
			active: customer.active,
			rewardPoints: 0,
		});

		customer.deactivate();
		customer.addRewardPoints(10);

		await customerRepository.update(customer);
		const updatedCustomerModel = await CustomerModel.findOne({
			where: { id: customer.id },
		});
		expect(updatedCustomerModel.toJSON()).toStrictEqual({
			id: customer.id,
			name: customer.name,
			street: customer.address.street,
			number: customer.address.number,
			zipcode: customer.address.zip,
			city: customer.address.city,
			active: false,
			rewardPoints: 10,
		});
	});

	test("should update a customer address", async () => {
		const customerRepository = new CustomerRepository();
		const id = uuid();
		const customer = new Customer(id, "Customer 1");
		customer.changeAddress(new Address("Street 1", 10, "1234", "City 1"));
		customer.activate();
		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({
			where: { id: customer.id },
		});
		expect(customerModel.toJSON()).toStrictEqual({
			id,
			name: customer.name,
			street: customer.address.street,
			number: customer.address.number,
			zipcode: customer.address.zip,
			city: customer.address.city,
			active: customer.active,
			rewardPoints: 0,
		});

		customer.deactivate();
		customer.addRewardPoints(10);
		customer.changeAddress(new Address("Street 2", 20, "5678", "City 2"));

		await customerRepository.update(customer);
		const updatedCustomerModel = await CustomerModel.findOne({
			where: { id: customer.id },
		});
		expect(updatedCustomerModel.toJSON()).toStrictEqual({
			id: customer.id,
			name: customer.name,
			street: "Street 2",
			number: 20,
			zipcode: "5678",
			city: "City 2",
			active: false,
			rewardPoints: 10,
		});

		const eventDispatcher = new EventDispatcher();
		const eventHandler =
			new SendMsgConsoleWhenCustomerAddressIsUpdatedHandler();
		const spyEventHandler = jest.spyOn(eventHandler, "handle");

		eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler);

		expect(
			eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"][0]
		).toMatchObject(eventHandler);

		const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
			id,
			name: updatedCustomerModel.name,
			street: updatedCustomerModel.street,
			number: updatedCustomerModel.number,
			zipcode: updatedCustomerModel.zipcode,
			city: updatedCustomerModel.city,
			active: updatedCustomerModel.active,
			rewardPoints: updatedCustomerModel.rewardPoints,
		});

		// Quando o notify for executado o SendMsgConsoleWhenCustomerAddressIsUpdatedHandler.handle() deve ser chamado
		eventDispatcher.notify(customerAddressUpdatedEvent);
		expect(spyEventHandler).toHaveBeenCalled();
	});

	test("should find a customer", async () => {
		const customerRepository = new CustomerRepository();
		const id = uuid();
		const customer = new Customer(id, "Customer 1");
		customer.changeAddress(new Address("Street 1", 10, "1234", "City 1"));
		customer.activate();
		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({
			where: { id },
		});
		const foundCustomer = await customerRepository.find(id);

		expect(foundCustomer.toJSON()).toStrictEqual({
			id,
			name: customerModel.name,
			address: {
				street: customerModel.street,
				number: customerModel.number,
				zip: customerModel.zipcode,
				city: customerModel.city,
			},
			active: customerModel.active,
			rewardPoints: customer.rewardPoints,
		});
	});

	test("should find all customers", async () => {
		const customerRepository = new CustomerRepository();
		const id1 = uuid();
		const customer1 = new Customer(id1, "Customer 1");
		customer1.changeAddress(new Address("Street 1", 10, "1234", "City 1"));
		customer1.activate();
		await customerRepository.create(customer1);

		const id2 = uuid();
		const customer2 = new Customer(id2, "Customer 2");
		customer2.changeAddress(new Address("Street 2", 20, "5678", "City 2"));
		customer2.activate();
		await customerRepository.create(customer2);

		const customersModel = await CustomerModel.findAll();
		const customers = await customerRepository.findAll();

		expect(customers).toHaveLength(2);
		expect(customers[0].toJSON()).toStrictEqual({
			id: id1,
			name: customersModel[0].name,
			address: {
				street: customersModel[0].street,
				number: customersModel[0].number,
				zip: customersModel[0].zipcode,
				city: customersModel[0].city,
			},
			active: customersModel[0].active,
			rewardPoints: customersModel[0].rewardPoints,
		});
		expect(customers[1].toJSON()).toStrictEqual({
			id: id2,
			name: customersModel[1].name,
			address: {
				street: customersModel[1].street,
				number: customersModel[1].number,
				zip: customersModel[1].zipcode,
				city: customersModel[1].city,
			},
			active: customersModel[1].active,
			rewardPoints: customersModel[1].rewardPoints,
		});
	});

	test("should throw an error when customer not found", async () => {
		const customerRepository = new CustomerRepository();
		const id = uuid();
		const customer = new Customer(id, "Customer 1");
		customer.changeAddress(new Address("Street 1", 10, "1234", "City 1"));
		customer.activate();
		await customerRepository.create(customer);

		const idNotFound = uuid();
		await expect(customerRepository.find(idNotFound)).rejects.toThrow(
			"Customer not found"
		);
	});
});
