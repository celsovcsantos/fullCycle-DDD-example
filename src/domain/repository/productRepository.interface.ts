import Product from "../entity/product";
import IRepositoryInterface from "./repositoryInterface";

export default interface IProductRepositoryInterface
	extends IRepositoryInterface<Product> {}
