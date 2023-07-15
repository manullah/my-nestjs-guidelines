export const OrderBy = {
  TITLE: 'title',
  DESCRIPTIOn: 'description',
  BODY: 'body',
  PUBLISHED: 'published',
  CREATEDAT: 'createdAt',
  UPDATEDAT: 'updatedAt',
};

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];
