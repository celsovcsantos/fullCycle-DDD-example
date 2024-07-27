export default class OrderItem {
	private _id: string;
	private _productId: string;
	private _name: string;
	private _price: number;
	private _quantity: number;

	constructor(
		id: string,
		name: string,
		price: number,
		productId: string,
		quantity: number
	) {
		this._id = id;
		this._name = name;
		this._price = price;
		this._productId = productId;
		this._quantity = quantity;
		this.validate();
	}

	protected validate() {
		if (this._id.length === 0) {
			throw new Error("Id is required");
		}
		if (this._name.length === 0) {
			throw new Error("Name is required");
		}
		if (this._price <= 0) {
			throw new Error("Price is required");
		}
		if (this._productId.length === 0) {
			throw new Error("ProductId is required");
		}
		if (this._quantity <= 0) {
			throw new Error("Quantity is required");
		}
	}

	get price(): number {
		return this._price;
	}

	get quantity(): number {
		return this._quantity;
	}

	orderItemTotal(): number {
		return this._price * this._quantity;
	}
}
