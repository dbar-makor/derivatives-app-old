import { IFloorBroker } from "../models/derivatives";

export const groupByCompany = (data: IFloorBroker[]) => {
  return Array.from(
    data.reduce((acc, item) => {
      const key = item.company;
      if (acc.has(key)) {
        acc.get(key).push(item);
      } else {
        acc.set(key, [item]);
      }
      return acc;
    }, new Map()),
  );
};
