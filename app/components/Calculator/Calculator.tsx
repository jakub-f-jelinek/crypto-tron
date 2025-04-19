"use client";

// import { useData } from "../../hooks/Provider";
import { CalculatorCard } from "./CalculatorCard";
import styles from "./Calculator.module.scss";
import { useAppSelector } from "@/app/redux/hooks";
export interface HandleCountParams {
  id: string;
  count?: number | string;
  step?: "increase" | "decrease";
  startInvestmentValue?: number;
}

export const Calculator = () => {
  // const { items } = useData();
  const items = useAppSelector((state) => state.coins.items);

  return (
    <div className={styles.Wrapper}>
      {items.map((item) => {
        return <CalculatorCard key={item.id} item={item} />;
      })}
    </div>
  );
};
