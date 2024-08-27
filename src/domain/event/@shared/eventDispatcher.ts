import IEventInterface from "./event.interface";
import IEventDispatcherInterface from "./eventDispatcher.interface";
import IEventHandlerInterface from "./eventHandler.interface";

export default class EventDispatcher implements IEventDispatcherInterface {
	private eventHandlers: { [eventName: string]: IEventHandlerInterface[] } =
		{};

	get getEventHandlers(): { [eventName: string]: IEventHandlerInterface[] } {
		return this.eventHandlers;
	}

	register(eventName: string, eventHandler: IEventHandlerInterface): void {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [];
		}
		this.eventHandlers[eventName].push(eventHandler);
	}

	unregister(eventName: string, eventHandler: IEventHandlerInterface): void {
		if (this.eventHandlers[eventName]) {
			// this.eventHandlers[eventName] = this.eventHandlers[
			// 	eventName
			// ].filter((handler) => handler !== eventHandler);
			const index = this.eventHandlers[eventName].indexOf(eventHandler);
			if (index !== -1) {
				this.eventHandlers[eventName].splice(index, 1);
			}
		}
	}

	unregisterAll(): void {
		this.eventHandlers = {};
	}

	notify(event: IEventInterface): void {
		const eventName = event.constructor.name;
		if (this.eventHandlers[eventName]) {
			this.eventHandlers[eventName].forEach((handler) => {
				handler.handle(event);
			});
		}
	}
}
