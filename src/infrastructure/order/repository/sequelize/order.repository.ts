import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import IOrderRepositoryInterface from "../../../../domain/checkout/repository/orderRepository.interface";
import OrderItemModel from "./orderItem.model";
import OrderModel from "./order.model";

export default class OrderRepository implements IOrderRepositoryInterface {
	async create(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.id,
				customerId: entity.customerId,
				total: entity.total(),
				items: entity.items.map((item) => ({
					id: item.id,
					name: item.name,
					price: item.price,
					productId: item.productId,
					quantity: item.quantity,
				})),
			},
			{ include: [{ model: OrderItemModel }] }
		);
	}

	async update(entity: Order): Promise<void> {
		try {
			await OrderModel.update(
				{
					customerId: entity.customerId,
					total: entity.total(),
					items: entity.items.map((item) => ({
						id: item.id,
						name: item.name,
						price: item.price,
						productId: item.productId,
						quantity: item.quantity,
					})),
				},
				{ where: { id: entity.id } }
			);

			await OrderItemModel.destroy({ where: { orderId: entity.id } });

			const items = entity.items.map((item) => ({
				id: item.id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				productId: item.productId,
				orderId: entity.id,
			}));

			await OrderItemModel.bulkCreate(items);
		} catch (error) {
			console.log(error);
		}
	}

	async find(id: string): Promise<Order> {
		let orderModel;
		try {
			orderModel = await OrderModel.findOne({
				where: { id },
				include: ["items"],
				rejectOnEmpty: true,
			});
		} catch (error) {
			throw new Error("Order not found");
		}

		const orderItems: OrderItem[] = orderModel.items.map((item) => {
			const orderItem = new OrderItem(
				item.id,
				item.name,
				item.price,
				item.productId,
				item.quantity
			);
			return orderItem;
		});

		const order = new Order(
			orderModel.id,
			orderModel.customerId,
			orderItems
		);

		return order;
	}

	async findAll(): Promise<Order[]> {
		const orderModels = await OrderModel.findAll({ include: ["items"] });

		return orderModels.map((orderModel) => {
			const orderItems: OrderItem[] = orderModel.items.map((item) => {
				const orderItem = new OrderItem(
					item.id,
					item.name,
					item.price,
					item.productId,
					item.quantity
				);
				return orderItem;
			});

			const order = new Order(
				orderModel.id,
				orderModel.customerId,
				orderItems
			);

			return order;
		});
	}
}
