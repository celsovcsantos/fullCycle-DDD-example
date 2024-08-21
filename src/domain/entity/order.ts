import OrderItem from "./orderItem";

export default class Order {
	private _id: string;
	private _customerId: string;
	private _items: OrderItem[] = [];
	private _total: number;

	constructor(id: string, customerId: string, items: OrderItem[]) {
		this._id = id;
		this._customerId = customerId;
		this._items = items;
		this.validate();
		this._total = this.total();
	}

	get id(): string {
		return this._id;
	}

	get customerId(): string {
		return this._customerId;
	}

	get items(): OrderItem[] {
		return this._items;
	}

	changeCustomerId(customerId: string) {
		this._customerId = customerId;
		this.validate();
	}

	validate() {
		if (!this._id || this._id === "") {
			throw new Error("Id is required");
		}
		if (!this._customerId || this._customerId === "") {
			throw new Error("CustomerId is required");
		}
		if (!this._items || this._items.length === 0) {
			throw new Error("Items are required");
		}
		if (this._items.some((item) => item.quantity <= 0)) {
			throw new Error("Quantity is required");
		}
	}

	total(): number {
		return this._items.reduce(
			(acc, item) => acc + item.orderItemTotal(),
			0
		);
	}
}
