"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { updateItem, removeItem } from "@/app/redux/CoinSlice";
import { CoinData } from "@/app/utils/types";
import { HandleCountParams } from "../components/Calculator/Calculator";

export const useHandleCountChange = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.coins.items);

  return ({ id, count, step }: HandleCountParams) => {
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
    const profitCoin = startValue !== 0 ? totalValue - startValue : 0;

    dispatch(
      updateItem({
        id,
        count: newCount,
        totalValue,
        startInvestmentValue: startValue,
        profitCoin,
      })
    );
  };
};

export const useHandleInvestmentChange = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.coins.items);

  return (id: string, newInvestment: number) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem) return;

    const count = currentItem.count ?? 0;
    const totalValue = (currentItem.current_price ?? 0) * count;
    const profitCoin = newInvestment !== 0 ? totalValue - newInvestment : 0;

    dispatch(
      updateItem({
        id,
        count,
        totalValue,
        startInvestmentValue: newInvestment,
        profitCoin,
      })
    );
  };
};

export const useHandleRemove = () => {
  const dispatch = useAppDispatch();

  return (id: string) => {
    dispatch(removeItem(id));
  };
};
