"use client";

import { createContext, useContext, useState } from "react";
import { CoinData } from "../utils/types";

interface DataContextType {
  items: CoinData[];
  addItem: (item: CoinData) => void;
  removeItem: (id: string) => void;
  updateItem: (updatedItem: updatedItems) => void;
  totalCalculatorValue: () => number | null;
}

interface Props {
  children: React.ReactNode;
}

interface updatedItems {
  id: string;
  count: number;
  totalValue: number | null;
  startInvestmentValue?: number | undefined;
  profitCoin?: number | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: Props) => {
  const [items, setItems] = useState<CoinData[]>([]);

  const recalculatePercentages = (items: CoinData[]): CoinData[] => {
    const total = items.reduce((acc, item) => acc + (item.totalValue ?? 0), 0);

    // TODO: toFixed type
    // @ts-ignore
    return items.map((item) => ({
      ...item,
      itemPercentage: ((item.totalValue / total) * 100).toFixed(2),
    }));
  };

  const addItem = (item: CoinData) => {
    setItems((prev) => {
      const itemExtended = {
        ...item,
        count: 1,
        totalValue: item.current_price,
        startInvestmentValue: 0,
        profit: 0,
      };
      const updatedItems = [...prev, itemExtended];
      return recalculatePercentages(updatedItems);
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      return recalculatePercentages(updatedItems);
    });
  };

  const updateItem = ({
    id,
    count,
    totalValue,
    startInvestmentValue,
    profitCoin,
  }: updatedItems) => {
    setItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              count,
              totalValue,
              startInvestmentValue,
              profit: profitCoin,
            }
          : item
      );
      return recalculatePercentages(updatedItems);
    });
  };

  const totalCalculatorValue = () => {
    const sumTotal = items.reduce(
      (acc, item) => acc + item.count * item.current_price,
      0
    );

    // TODO: #1 formatter
    // TODO: #2 condition
    // TODO: #3 currency ?

    return sumTotal;
  };

  return (
    <DataContext.Provider
      value={{ items, addItem, removeItem, updateItem, totalCalculatorValue }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
