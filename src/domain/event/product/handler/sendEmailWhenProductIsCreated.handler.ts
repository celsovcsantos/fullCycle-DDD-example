import IEventHandlerInterface from "../../@shared/eventHandler.interface";
import ProductCreatedEvent from "../productCreated.event";

export default class SendEmailWhenProductIsCreatedHandler
	implements IEventHandlerInterface<ProductCreatedEvent>
{
	handle(event: ProductCreatedEvent): void {
		console.log(`Sending email to ...........`);
	}
}
