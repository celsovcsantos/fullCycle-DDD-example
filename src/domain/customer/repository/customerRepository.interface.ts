import IRepositoryInterface from "../../@shared/repository/repositoryInterface";
import Customer from "../entity/customer";

export default interface ICustomerRepositoryInterface
	extends IRepositoryInterface<Customer> {}
