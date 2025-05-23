"use client";

import { useData } from "../../hooks/Provider";
import { CalculatorCard } from "./CalculatorCard";
import styles from "./Calculator.module.scss";
export interface HandleCountParams {
  id: string;
  count?: number | string;
  step?: "increase" | "decrease";
  startInvestmentValue?: number;
}

export const Calculator = () => {
  const { items } = useData();

  return (
    <div className={styles.Wrapper}>
      {items.map((item) => {
        return <CalculatorCard key={item.id} item={item} />;
      })}
    </div>
  );
};
