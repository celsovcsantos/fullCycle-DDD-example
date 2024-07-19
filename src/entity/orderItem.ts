export default class OrderItem {
	private _id: string;
	private _name: string;
	private _price: number;

	constructor(id: string, name: string, price: number) {
		this._id = id;
		this._name = name;
		this._price = price;
		this.validate();
	}

	protected validate() {
		if (this._name.length === 0) {
			throw new Error("Name is required");
		}
		if (this._id.length === 0) {
			throw new Error("Id is required");
		}
		if (this._price === 0) {
			throw new Error("Price is required");
		}
	}

	get price(): number {
		return this._price;
	}
}
