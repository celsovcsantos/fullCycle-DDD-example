import Customer from "../../../../domain/customer/entity/customer";
import ICustomerRepositoryInterface from "../../../../domain/customer/repository/customerRepository.interface";
import Address from "../../../../domain/customer/valueObject/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository
	implements ICustomerRepositoryInterface
{
	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.address.street,
			number: entity.address.number,
			zipcode: entity.address.zip,
			city: entity.address.city,
			active: entity.active,
			rewardPoints: entity.rewardPoints,
		});
	}

	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{
				name: entity.name,
				street: entity.address.street,
				number: entity.address.number,
				zipcode: entity.address.zip,
				city: entity.address.city,
				active: entity.active,
				rewardPoints: entity.rewardPoints,
			},
			{ where: { id: entity.id } }
		);
	}

	async find(id: string): Promise<Customer> {
		let customerModel;
		try {
			customerModel = await CustomerModel.findOne({
				where: { id },
				rejectOnEmpty: true,
			});
		} catch (error) {
			throw new Error("Customer not found");
		}

		const customer = new Customer(customerModel.id, customerModel.name);
		customer.changeAddress(
			new Address(
				customerModel.street,
				customerModel.number,
				customerModel.zipcode,
				customerModel.city
			)
		);
		if (customerModel.active) customer.activate();
		customer.addRewardPoints(customerModel.rewardPoints);

		return customer;
	}

	async findAll(): Promise<Customer[]> {
		const customerModels = await CustomerModel.findAll();

		return customerModels.map((customerModel) => {
			const customer = new Customer(customerModel.id, customerModel.name);
			customer.changeAddress(
				new Address(
					customerModel.street,
					customerModel.number,
					customerModel.zipcode,
					customerModel.city
				)
			);
			if (customerModel.active) customer.activate();
			customer.addRewardPoints(customerModel.rewardPoints);

			return customer;
		});
	}
}
