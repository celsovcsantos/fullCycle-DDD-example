import Customer from "../entity/customer";
import IRepositoryInterface from "./repositoryInterface";

export default interface ICustomerRepositoryInterface
	extends IRepositoryInterface<Customer> {}
