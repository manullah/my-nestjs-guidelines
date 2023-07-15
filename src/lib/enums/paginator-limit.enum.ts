export const PaginatorLimit = {
  SMALL: 10,
  MEDIUM: 25,
  LARGE: 50,
  EXTRA_LARGE: 100,
};

export type PaginatorLimit =
  (typeof PaginatorLimit)[keyof typeof PaginatorLimit];

export const PaginatorLimitArray = Object.values(
  PaginatorLimit,
) as PaginatorLimit[];
