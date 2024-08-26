import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreated.handler";
import EventDispatcher from "./eventDispatcher";

describe("Domain events tests", () => {
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
});
