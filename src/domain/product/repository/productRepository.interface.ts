import IRepositoryInterface from "../../@shared/repository/repositoryInterface";
import Product from "../entity/product";

export default interface IProductRepositoryInterface
	extends IRepositoryInterface<Product> {}
