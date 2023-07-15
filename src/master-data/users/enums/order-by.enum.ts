export const OrderBy = {
  NAME: 'name',
  EMAIL: 'email',
  CREATEDAT: 'createdAt',
  UPDATEDAT: 'updatedAt',
};

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];
