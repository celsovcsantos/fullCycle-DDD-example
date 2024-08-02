import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";

describe("Product repository tests", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		// Add the models to the Sequelize instance
		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});
});
