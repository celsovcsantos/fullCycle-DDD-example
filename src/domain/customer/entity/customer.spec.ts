import Address from "../valueObject/address";
import Customer from "./customer";

describe("Customer Unit Tests", () => {
	test("Should throw error when id is empty", () => {
		expect(() => {
			let customer = new Customer("", "John Doe");
		}).toThrow("Id is required");
	});

	test("Should throw error when name is empty", () => {
		expect(() => {
			let customer = new Customer("123", "");
		}).toThrow("Name is required");
	});

	test("Should change name", () => {
		// Arrange
		const customer = new Customer("123", "John Doe");
		// Act
		customer.changeName("Jane Doe");
		// Assert
		expect(customer.name).toBe("Jane Doe");
	});

	test("Should throw error when change name to empty", () => {
		expect(() => {
			let customer = new Customer("123", "John Doe");
			customer.changeName("");
		}).toThrow("Name is required");
	});

	test("Should activate customer", () => {
		const customer = new Customer("123", "John Doe");
		customer.changeAddress(
			new Address("Main St", 100, "12345", "Springfield")
		);
		customer.activate();
		expect(customer.isActive()).toBeTruthy();
	});

	test("Should deactivate customer", () => {
		const customer = new Customer("123", "John Doe");
		customer.deactivate();
		expect(customer.isActive()).toBeFalsy();
	});

	test("Should add reward points", () => {
		const customer = new Customer("123", "John Doe");
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(20);
	});

	test("Should throw error when activate customer with address is undefined", () => {
		expect(() => {
			let customer = new Customer("123", "John Doe");
			customer.activate();
		}).toThrow("Adress is mandatory to activate a customer");
	});

	test("Should throw error qhen activate customer with street is empty", () => {
		expect(() => {
			let customer = new Customer("123", "John Doe");
			customer.changeAddress(
				new Address("", 100, "12345", "Springfield")
			);
			customer.activate();
		}).toThrow("Street is required");
	});
});
