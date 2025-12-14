import prisma from "../utils/prisma.js";

interface SweetInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface SweetSearchQuery {
  name?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}

/* ---------------- CREATE ---------------- */

export const createSweet = async (data: SweetInput) => {
  const { name, category, price, quantity } = data;

  if (!name || !category || price == null || quantity == null) {
    throw new Error("All fields are required");
  }

  return prisma.sweet.create({
    data: { name, category, price, quantity },
  });
};

/* ---------------- READ ---------------- */

export const getAllSweets = async () => {
  return prisma.sweet.findMany();
};

/* ---------------- SEARCH ---------------- */

export const searchSweets = async (query: SweetSearchQuery) => {
  if (!query || Object.keys(query).length === 0) {
    return prisma.sweet.findMany();
  }

  const { name, category, minPrice, maxPrice } = query;

  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;

  if ((minPrice && Number.isNaN(min)) || (maxPrice && Number.isNaN(max))) {
    throw new Error("Invalid price range");
  }

  return prisma.sweet.findMany({
    where: {
      name: name ? { contains: name, mode: "insensitive" } : undefined,
      category: category ? { equals: category } : undefined,
      price:
        min !== undefined || max !== undefined
          ? { gte: min, lte: max }
          : undefined,
    },
  });
};

export const updateSweet = async (id: number, data: any) => {
  return prisma.sweet.update({
    where: { id },
    data
  });
};

export const deleteSweet = async (id: number) => {
  return prisma.sweet.delete({
    where: { id }
  });
};
