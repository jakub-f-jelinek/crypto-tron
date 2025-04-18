"use client";

import { useData } from "../../hooks/Provider";
import { Button } from "../Button/Button";
import styles from "./Calculator.module.scss";
import { Input } from "../Input/Input";
import { Card } from "../Card/Card";
import classNames from "classnames";
import { Text } from "../Text/Text";
import {
  handleCountChange,
  handleInvestmentChange,
  handleRemove,
} from "../Text/utils";
import { CalculatorCard } from "./CalculatorCard";
export interface HandleCountParams {
  id: string;
  count?: number | string;
  step?: "increase" | "decrease";
  startInvestmentValue?: number;
}

export const Calculator = () => {
  const { items } = useData();

  return (
    <div>
      {items.map((item) => {
        return <CalculatorCard item={item} />;
      })}
    </div>
  );
};
