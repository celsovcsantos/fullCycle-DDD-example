import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {
	private _id: string;
	private _name: string;
	private _price: number;

	constructor(id: string, name: string, price: number) {
		this._id = id;
		this._name = name;
		this._price = price;
		this.validate();
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get price() {
		return this._price;
	}

	validate() {
		if (!this._id || this._id === "") {
			throw new Error("Id is required");
		}
		if (!this._name || this._name === "") {
			throw new Error("Name is required");
		}
		if (!this._price || this._price <= 0) {
			throw new Error("Price is required");
		}
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	changePrice(price: number) {
		this._price = price;
		this.validate();
	}

	toJSON() {
		return {
			id: this._id,
			name: this._name,
			price: this._price,
		};
	}
}
