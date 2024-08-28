import IEventInterface from "./event.interface";

export default interface IEventHandlerInterface<
	T extends IEventInterface = IEventInterface
> {
	handle(event: T): void;
}
