import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  fname: varchar("fname", { length: 100 }).notNull(),
  lname: varchar("lname", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  provider: varchar("provider", { length: 30 }),
  externalId: varchar("external_id", { length: 100 }).notNull(),
  image: text("image"),
  role: varchar("role", { length: 12 }).notNull().default("customer"),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const Products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  image: text("image"),
  description: text("description"),
  price: integer("price").notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const Warehouses = pgTable(
  "warehouses",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    pincode: varchar("pincode", { length: 6 }).notNull(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      pincodeIdx: index("pincode_idx").on(table.pincode),
    };
  }
);

export const Orders = pgTable("orders", {
  id: serial("id").primaryKey(),
});

export const DeliveryPerson = pgTable("deliver_person", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  phone: varchar("phone", { length: 13 }).notNull(),
  warehouseId: integer("warehouse_id").references(() => Warehouses.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  orderId: integer("order_id").references(() => Orders.id, {
    onDelete: "set null",
  }),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const Inventories = pgTable("inventories", {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 10 }).unique().notNull(),
  productId: integer("product_id").references(() => Products.id, {
    onDelete: "cascade",
  }),
  orderId: integer("order_id").references(() => Orders.id, {
    onDelete: "set null",
  }),
  warehouseId: integer("warehouse_id").references(() => Warehouses.id, {
    onDelete: "cascade",
  }),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
