import IEventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default class SendMsgConsoleWhenCustomerIsCreatedHandler2
	implements IEventHandlerInterface<CustomerCreatedEvent>
{
	handle(event: CustomerCreatedEvent): void {
		console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
		//console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
		//console.log("event", event);
	}
}
