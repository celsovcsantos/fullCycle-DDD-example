import IEventHandlerInterface from "../../@shared/eventHandler.interface";
import CustomerAddressUpdatedEvent from "../customerAddressUpdated.event";

export default class SendMsgConsoleWhenCustomerAddressIsUpdatedHandler
	implements IEventHandlerInterface<CustomerAddressUpdatedEvent>
{
	handle(event: CustomerAddressUpdatedEvent): void {
		console.log(
			`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: "${event.eventData.street}, ${event.eventData.number} - CEP: ${event.eventData.zipcode} - ${event.eventData.city}"`
		);
	}
}
