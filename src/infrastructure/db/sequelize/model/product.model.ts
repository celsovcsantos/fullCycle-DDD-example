import {
	Column,
	HasMany,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import OrderItem from "../../../../domain/entity/orderItem";
import OrderItemModel from "./orderItem.model";

@Table({ tableName: "products", timestamps: false })
export default class ProductModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@Column({ allowNull: false })
	declare name: string;

	@Column({ allowNull: false })
	declare price: number;

	@HasMany(() => OrderItemModel)
	declare products: OrderItem[];
}
