import Address from "../valueObject/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
	it("should create a customer", () => {
		// Arrange
		const customer = CustomerFactory.create("John Doe");
		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");
		expect(customer.address).toBeUndefined();
	});

	it("should create a customer with address", () => {
		// Arrange
		const address = new Address("Street", 1, "12345-678", "São Paulo");
		const customer = CustomerFactory.createWithAddress("John Doe", address);
		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");
		expect(customer.address).toBe(address);
	});
});
