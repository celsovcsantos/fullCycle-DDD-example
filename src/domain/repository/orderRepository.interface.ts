import Order from "../entity/order";
import IRepositoryInterface from "./repositoryInterface";

export default interface IOrderRepositoryInterface
	extends IRepositoryInterface<Order> {}
