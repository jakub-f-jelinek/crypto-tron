"use client";

import { useData } from "../hooks/Provider";
import { ListItem } from "../components/List/ListItem/ListItem";
import { Button } from "../components/Button/Button";
import styles from "./Calculator.module.scss";
import { useEffect, useState } from "react";

interface HandleCountParams {
  id: string;
  count?: number | string;
  step?: "increase" | "decrease";
  startInvestmentValue?: number;
}

export default function Calculator() {
  const { items, removeItem, updateItem } = useData();

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleCount = ({
    id,
    count,
    step,
    startInvestmentValue,
  }: HandleCountParams) => {
    const currentItem = items.find((item) => item.id === id);
    const currentCount = currentItem?.count;
    console.log(currentItem);

    if (step === "increase") {
      if (currentCount || currentCount === 0) {
        const newCount = currentCount + 1;
        const newValue = (currentItem?.current_price ?? 0) * newCount;

        const startValue =
          startInvestmentValue ?? currentItem?.startInvestmentValue ?? 0;
        const profitCoin = newValue - startValue;

        updateItem({
          id,
          count: newCount,
          totalValue: newValue,
          startInvestmentValue:
            startInvestmentValue ?? currentItem?.startInvestmentValue,
          profitCoin,
        });
      }
    } else if (step === "decrease") {
      if (currentCount) {
        const newCount = currentCount - 1;
        const newValue = currentItem.current_price * newCount;
        const startValue =
          startInvestmentValue ?? currentItem.startInvestmentValue ?? 0;
        const profitCoin = newValue - startValue;

        updateItem({
          id,
          count: newCount,
          totalValue: newValue,
          startInvestmentValue:
            startInvestmentValue ?? currentItem.startInvestmentValue,
          profitCoin,
        });
      }
    } else {
      const numberCount = Number(count);
      const itemPrice = currentItem?.current_price ?? 0;

      if (isNaN(numberCount)) return;

      const totalValue = itemPrice * numberCount;
      // TODO: check
      const startValue =
        startInvestmentValue ?? currentItem?.startInvestmentValue ?? 0;
      const profitCoin = totalValue - startValue;

      updateItem({
        id,
        count: numberCount,
        totalValue,
        // TODO: check
        startInvestmentValue:
          startInvestmentValue ?? currentItem?.startInvestmentValue,
        profitCoin,
      });
    }
  };

  return (
    <div>
      {items.map((item) => {
        const price = item.current_price;

        // TODO:
        const totalValue = item.totalValue.toFixed(2);
        const priceFormatted = new Intl.NumberFormat("cs-CZ").format(price);

        return (
          <ListItem
            key={item.id}
            id={item.id}
            title={item.name}
            price={price}
            classNameElements={styles.ListItemElements}
            elements={[
              <span>Celková hodnota coinu: {item.totalValue}</span>,
              <Button
                title="Odebrat"
                onClick={() => handleRemove(item.id)}
                variant="primary"
              />,
              <Button
                title="+1"
                onClick={() => handleCount({ id: item.id, step: "increase" })}
                variant="primary"
              />,
              <Button
                title="-1"
                onClick={() => handleCount({ id: item.id, step: "decrease" })}
                variant="primary"
              />,
              <label htmlFor="">Počet jednotek</label>,
              <input
                type="number"
                min={0}
                value={item.count}
                onChange={(e) =>
                  handleCount({ id: item.id, count: e.target.value })
                }
              />,
              <div>{item.itemPercentage} %</div>,
              <label htmlFor="">Počáteční investice</label>,
              <input
                type="number"
                min={0}
                onChange={(e) =>
                  handleCount({
                    id: item.id,
                    count: item.count,
                    startInvestmentValue: Number(e.target.value),
                  })
                }
              />,
              <div>Celkový profit: {item.profit}</div>,
            ]}
          />
        );
      })}
    </div>
  );
}
