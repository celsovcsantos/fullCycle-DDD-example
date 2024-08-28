import IRepositoryInterface from "../../@shared/repository/repositoryInterface";
import Order from "../entity/order";

export default interface IOrderRepositoryInterface
	extends IRepositoryInterface<Order> {}
