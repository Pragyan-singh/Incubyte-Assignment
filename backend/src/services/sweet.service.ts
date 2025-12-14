import prisma from "../utils/prisma.js";

interface SweetInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export const createSweet = async (data: SweetInput) => {
  const { name, category, price, quantity } = data;

  if (!name || !category || price == null || quantity == null) {
    throw new Error("All fields are required");
  }

  return prisma.sweet.create({
    data: { name, category, price, quantity }
  });
};

export const getAllSweets = async () => {
  return prisma.sweet.findMany();
};

export const searchSweets = async (query: any) => {
    if (Object.keys(query).length === 0) {
    return prisma.sweet.findMany();
    }
  const { name, category, minPrice, maxPrice } = query;

  return prisma.sweet.findMany({
    where: {
      name: name ? { contains: name, mode: "insensitive" } : undefined,
      category: category ? { equals: category } : undefined,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined
      }
    }
  });
};

export const updateSweet = async (id: string, data: any) => {
  return prisma.sweet.update({
    where: { id: Number(id) },
    data
  });
};


export const deleteSweet = async (id: string) => {
  return prisma.sweet.delete({
    where: { id: Number(id) }
  });
};

