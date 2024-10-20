import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/index";

const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "tokopaedi";
const COLLECTION_NAME = "Wishlists";

export const getDb = async (): Promise<Db> => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(MONGODB_DB_NAME);
  return db;
};

type Wishlist = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: string;
  updatedAt?: string;
};

type WishlistInputType = Omit<Wishlist, "_id">;

type WishListDeleteInput = {
  _id: ObjectId;
};

export const getWishlistByUserId = async (
  userId: string
): Promise<Wishlist[]> => {
  const stages = [
    {
      $match: {
        userId: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "Products",
        localField: "productId",
        foreignField: "_id",
        as: "Product",
      },
    },
    {
      $unwind: "$Product",
    },
  ];

  const db = await getDb();

  const wishlist = (await db
    .collection(COLLECTION_NAME)
    .aggregate(stages)
    .toArray()) as Wishlist[];

  return wishlist;
};

export const createUserWishlist = async (input: WishlistInputType) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne(input);
  return result;
};

export const deleteUserWishlistById = async (input: WishListDeleteInput) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).deleteOne(input);
  return result;
};
