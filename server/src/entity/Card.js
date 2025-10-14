import { EntitySchema } from "typeorm";

export const Card = new EntitySchema({
    name: "Card",
    tableName: "cards",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true
        },
        name: {
            type: "varchar",
            nullable: false
        },
        price: {
            type: "int",
            nullable: false
        },
        category: {
            type: "varchar",
            nullable: false
        },
        stock: {
            type: "int",
            nullable: false
        },
        imageUrl: {
            type: "varchar",
            nullable: true
        }
    }
})