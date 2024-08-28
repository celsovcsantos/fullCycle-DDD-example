import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/sendEmailWhenProductIsCreated.handler";
import ProductCreatedEvent from "../../product/event/productCreated.event";
import IEventInterface from "./event.interface";
import EventDispatcher from "./eventDispatcher";

describe("Domain events tests", () => {
	// describe("Product", () => {
	test("should register an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"]
		).toBeDefined();
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
		).toBe(1);
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
		).toMatchObject(eventHandler);
	});

	test("should unregister an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
		).toMatchObject(eventHandler);

		eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"]
		).toBeDefined();
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
		).toBe(0);
	});

	test("should unregister all event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
		).toMatchObject(eventHandler);

		eventDispatcher.unregisterAll();
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"]
		).toBeUndefined();
	});

	test("should notify all event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const spyEventHandler = jest.spyOn(eventHandler, "handle");

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(
			eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
		).toMatchObject(eventHandler);

		const productCreatedEvent: IEventInterface = new ProductCreatedEvent({
			name: "Product 1",
			description: "Product 1 Description",
			price: 100,
		});

		//Quando o método notify for executado, o método SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
		eventDispatcher.notify(productCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});
	// });

	// describe("Customer", () => {
	// 	describe("Created tests", () => {
	// 		test("should register an event handler", () => {
	// 			const eventDispatcher = new EventDispatcher();
	// 			const eventHandler =
	// 				new SendMsgConsoleWhenCustomerIsCreatedHandler();

	// 			eventDispatcher.register("CustomerCreatedEvent", eventHandler);
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
	// 			).toBeDefined();
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
	// 					.length
	// 			).toBe(1);
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
	// 			).toMatchObject(eventHandler);
	// 		});

	// 		test("should unregister an event handler", () => {
	// 			const eventDispatcher = new EventDispatcher();
	// 			const eventHandler =
	// 				new SendMsgConsoleWhenCustomerIsCreatedHandler();

	// 			eventDispatcher.register("CustomerCreatedEvent", eventHandler);
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
	// 			).toMatchObject(eventHandler);

	// 			eventDispatcher.unregister(
	// 				"CustomerCreatedEvent",
	// 				eventHandler
	// 			);
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
	// 			).toBeDefined();
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
	// 					.length
	// 			).toBe(0);
	// 		});

	// 		test("should unregister all event handlers", () => {
	// 			const eventDispatcher = new EventDispatcher();
	// 			const eventHandler =
	// 				new SendMsgConsoleWhenCustomerIsCreatedHandler();

	// 			eventDispatcher.register("CustomerCreatedEvent", eventHandler);
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
	// 			).toMatchObject(eventHandler);

	// 			eventDispatcher.unregisterAll();
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
	// 			).toBeUndefined();
	// 		});

	// 		test("should notify all event handlers", () => {
	// 			const eventDispatcher = new EventDispatcher();
	// 			const eventHandler =
	// 				new SendMsgConsoleWhenCustomerIsCreatedHandler();
	// 			const spyEventHandler = jest.spyOn(eventHandler, "handle");

	// 			eventDispatcher.register("CustomerCreatedEvent", eventHandler);
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
	// 			).toMatchObject(eventHandler);

	// 			const customerCreatedEvent: IEventInterface =
	// 				new CustomerCreatedEvent({ id: "123", name: "Customer 1" });

	// 			//Quando o método notify for executado, o método SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
	// 			eventDispatcher.notify(customerCreatedEvent);

	// 			expect(spyEventHandler).toHaveBeenCalled();
	// 		});
	// 	});

	// 	describe("Updated Address tests", () => {
	// 		test("should register an event handler", () => {
	// 			const eventDispatcher = new EventDispatcher();
	// 			const eventHandler =
	// 				new SendMsgConsoleWhenCustomerAddressIsUpdatedHandler();

	// 			eventDispatcher.register(
	// 				"CustomerUpdatedAddressEvent",
	// 				eventHandler
	// 			);
	// 			expect(
	// 				eventDispatcher.getEventHandlers[
	// 					"CustomerUpdatedAddressEvent"
	// 				]
	// 			).toBeDefined();
	// 			expect(
	// 				eventDispatcher.getEventHandlers[
	// 					"CustomerUpdatedAddressEvent"
	// 				].length
	// 			).toBe(1);
	// 			expect(
	// 				eventDispatcher.getEventHandlers[
	// 					"CustomerUpdatedAddressEvent"
	// 				][0]
	// 			).toMatchObject(eventHandler);
	// 		});

	// 		test("should unregister an event handler", () => {
	// 			const eventDispatcher = new EventDispatcher();
	// 			const eventHandler =
	// 				new SendMsgConsoleWhenCustomerAddressIsUpdatedHandler();

	// 			eventDispatcher.register(
	// 				"CustomerUpdatedAddressEvent",
	// 				eventHandler
	// 			);
	// 			expect(
	// 				eventDispatcher.getEventHandlers[
	// 					"CustomerUpdatedAddressEvent"
	// 				][0]
	// 			).toMatchObject(eventHandler);

	// 			eventDispatcher.unregister(
	// 				"CustomerUpdatedAddressEvent",
	// 				eventHandler
	// 			);
	// 			expect(
	// 				eventDispatcher.getEventHandlers[
	// 					"CustomerUpdatedAddressEvent"
	// 				]
	// 			).toBeDefined();
	// 			expect(
	// 				eventDispatcher.getEventHandlers[
	// 					"CustomerUpdatedAddressEvent"
	// 				].length
	// 			).toBe(0);
	// 		});

	// 		test("should unregister all event handlers", () => {
	// 			const eventDispatcher = new EventDispatcher();
	// 			const eventHandler =
	// 				new SendMsgConsoleWhenCustomerAddressIsUpdatedHandler();

	// 			eventDispatcher.register(
	// 				"CustomerUpdatedAddressEvent",
	// 				eventHandler
	// 			);
	// 			expect(
	// 				eventDispatcher.getEventHandlers[
	// 					"CustomerUpdatedAddressEvent"
	// 				][0]
	// 			).toMatchObject(eventHandler);

	// 			eventDispatcher.unregisterAll();
	// 			expect(
	// 				eventDispatcher.getEventHandlers[
	// 					"CustomerUpdatedAddressEvent"
	// 				]
	// 			).toBeUndefined();
	// 		});

	// 		test("should notify all event handlers", () => {
	// 			const eventDispatcher = new EventDispatcher();
	// 			const eventHandler =
	// 				new SendMsgConsoleWhenCustomerIsCreatedHandler();
	// 			const spyEventHandler = jest.spyOn(eventHandler, "handle");

	// 			eventDispatcher.register("CustomerCreatedEvent", eventHandler);
	// 			expect(
	// 				eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
	// 			).toMatchObject(eventHandler);

	// 			const customerCreatedEvent: IEventInterface =
	// 				new CustomerCreatedEvent({ id: "123", name: "Customer 1" });

	// 			//Quando o método notify for executado, o método SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
	// 			eventDispatcher.notify(customerCreatedEvent);

	// 			expect(spyEventHandler).toHaveBeenCalled();
	// 		});
	// 	});
	// });
});
