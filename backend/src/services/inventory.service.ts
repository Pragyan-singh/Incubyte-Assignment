import prisma from "../utils/prisma.js";

export const purchaseSweet = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const sweet = await tx.sweet.findUnique({
      where: { id }
    });

    if (!sweet) throw new Error("Sweet not found");
    if (sweet.quantity <= 0) throw new Error("Out of stock");

    return tx.sweet.update({
      where: { id },
      data: { quantity: sweet.quantity - 1 }
    });
  });
};


export const restockSweet = async (id: number, amount: number) => {
  if (!amount || amount <= 0) {
    throw new Error("Invalid restock amount");
  }

  return prisma.sweet.update({
    where: { id },
    data: {
      quantity: {
        increment: amount
      }
    }
  });
};
