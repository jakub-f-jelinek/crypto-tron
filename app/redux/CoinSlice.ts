import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinData } from "../utils/types";

interface CoinState {
  items: CoinData[];
}

interface UpdateItemPayload {
  id: string;
  count: number;
  totalValue: number | null;
  startInvestmentValue?: number;
  profitCoin?: number | null;
}

const initialState: CoinState = {
  items: [],
};

const recalculatePercentages = (items: CoinData[]): CoinData[] => {
  const total = items.reduce((acc, item) => acc + (item.totalValue ?? 0), 0);
  return items.map((item) => ({
    ...item,
    itemPercentage: total
      ? parseFloat((((item.totalValue ?? 0) / total) * 100).toFixed(2))
      : 0,
  }));
};

const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CoinData>) => {
      const itemExtended = {
        ...action.payload,
        count: 1,
        totalValue: action.payload.current_price,
        startInvestmentValue: 0,
        profit: 0,
      };
      state.items.push(itemExtended);
      state.items = recalculatePercentages(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = recalculatePercentages(
        state.items.filter((item) => item.id !== action.payload)
      );
    },
    updateItem: (state, action: PayloadAction<UpdateItemPayload>) => {
      const items = state.items.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              count: action.payload.count,
              totalValue: action.payload.totalValue,
              startInvestmentValue: action.payload.startInvestmentValue,
              profit: action.payload.profitCoin,
            }
          : item
      );
      state.items = recalculatePercentages(items);
    },
  },
});

export const totalCalculatorValue = (state: { coins: CoinState }) =>
  state.coins.items.reduce(
    (acc, item) => acc + item.count * item.current_price,
    0
  );

export const totalProfit = (state: { coins: CoinState }) =>
  state.coins.items.reduce((acc, item) => acc + (item.profit ?? 0), 0);

export const { addItem, removeItem, updateItem } = coinSlice.actions;
export default coinSlice.reducer;
