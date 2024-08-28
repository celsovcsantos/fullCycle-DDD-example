import IEventInterface from "../../@shared/event/event.interface";

export default class CustomerAddressUpdatedEvent implements IEventInterface {
	dataTimeOccurred: Date;
	eventData: any;

	constructor(eventData: any) {
		this.dataTimeOccurred = new Date();
		this.eventData = eventData;
	}
}
