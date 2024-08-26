import IEventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements IEventInterface {
	dataTimeOccurred: Date;
	eventData: any;

	constructor(eventData: any) {
		this.dataTimeOccurred = new Date();
		this.eventData = eventData;
	}
}
