import { CoinData } from "@/app/utils/types";
import { HandleCountParams } from "../Calculator/Calculator";

type UpdateItemFn = (item: {
  id: string;
  count: number;
  totalValue: number;
  startInvestmentValue?: number;
  profitCoin: number;
}) => void;

export const handleCountChange = (
  { id, count, step }: HandleCountParams,
  items: CoinData[],
  updateItem: UpdateItemFn
) => {
  const currentItem = items.find((item) => item.id === id);
  if (!currentItem) return;

  const currentCount = currentItem.count ?? 0;
  let newCount = currentCount;

  if (step === "increase") {
    newCount = currentCount + 1;
  } else if (step === "decrease") {
    newCount = currentCount > 0 ? currentCount - 1 : 0;
  } else if (count !== undefined) {
    const parsed = Number(count);
    if (isNaN(parsed)) return;
    newCount = parsed;
  }

  const itemPrice = currentItem.current_price ?? 0;
  const totalValue = itemPrice * newCount;
  const startValue = currentItem.startInvestmentValue ?? 0;
  const profitCoin = totalValue - startValue;

  updateItem({
    id,
    count: newCount,
    totalValue,
    startInvestmentValue: currentItem.startInvestmentValue,
    profitCoin,
  });
};

export const handleInvestmentChange = (
  id: string,
  newInvestment: number,
  items: CoinData[],
  updateItem: UpdateItemFn
) => {
  const currentItem = items.find((item) => item.id === id);
  if (!currentItem) return;

  const count = currentItem.count ?? 0;
  const totalValue = (currentItem.current_price ?? 0) * count;
  const profitCoin = totalValue - newInvestment;

  updateItem({
    id,
    count,
    totalValue,
    startInvestmentValue: newInvestment,
    profitCoin,
  });
};

export const handleRemove = (id: string, removeItem: (id: string) => void) => {
  removeItem(id);
};
