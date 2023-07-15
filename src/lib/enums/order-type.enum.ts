export const OrderType = {
  ASC: 'asc',
  DESC: 'desc',
};

export type OrderType = (typeof OrderType)[keyof typeof OrderType];
