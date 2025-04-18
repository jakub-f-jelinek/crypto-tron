"use client";

import { useFetchData } from "@/app/useFetchData";
import { useData } from "@/app/hooks/Provider";
import { CoinData } from "@/app/utils/types";

import { Card } from "@/app/components/Card/Card";
import { Icon } from "@/app/components/Icon/Icon";
import { Text } from "@/app/components/Text/Text";

import styles from "./ItemDetail.module.scss";
import "../../styles/utils/page.scss";
import classNames from "classnames";
import { Button } from "@/app/components/Button/Button";
import { Input } from "@/app/components/Input/Input";
import { HandleCountParams } from "@/app/components/Calculator/Calculator";

export default function ItemDetail({ id }: { id: string }) {
  const { isLoading, error, data } = useFetchData();
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
      const startValue =
        startInvestmentValue ?? currentItem?.startInvestmentValue ?? 0;
      const profitCoin = totalValue - startValue;

      updateItem({
        id,
        count: numberCount,
        totalValue,
        startInvestmentValue:
          startInvestmentValue ?? currentItem?.startInvestmentValue,
        profitCoin,
      });
    }
  };

  if (isLoading) return <div>Is loading...</div>;
  if (error) return <div>Error</div>;

  const item = data.find((item: CoinData) => item.id === id);
  const itemCalculator = items.find((item: CoinData) => item.id === id);
  console.log(item);

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={classNames("col-33", styles.HeaderInfo)}>
          <img className={styles.ItemImg} src={item.image} alt={item.name} />
          <span>{item.symbol}</span>
        </div>
        <h1>{item.name}</h1>
        {/* calculator item component */}
        <div className="col-66"></div>
      </div>

      <div className={styles.Main}>
        <Card
          className="col-33"
          theme="light"
          headerElements={[
            <div key="priceBox" className={styles.Col}>
              <Icon name="FaCoins" color="component" size={18} />
              <Text type="span" subtitle="Aktuální cena" subtitleSize="sm" />
              <Text
                type="span"
                title={item.current_price}
                subtitle="CZK"
                subtitleSize="sm"
                subtitlePosition="after"
              />
            </div>,
          ]}
        />

        <Card
          className="col-33"
          theme="light"
          headerElements={[
            <div key="priceChange" className={styles.Col}>
              <Icon name="FaChartLine" color="component" size={18} />
              <Text type="span" subtitle="Vývoj ceny (24h)" subtitleSize="sm" />
              <Text
                type="span"
                title={item.price_change_24h}
                subtitle="CZK"
                size="sm"
                subtitleSize="sm"
                subtitlePosition="after"
                numberColor={true}
              />
              <Text
                type="span"
                title={item.price_change_percentage_24h}
                subtitle="%"
                size="sm"
                subtitleSize="sm"
                subtitlePosition="after"
                numberColor={true}
              />
            </div>,
          ]}
        />
        <Card
          className="col-33"
          theme="light"
          headerElements={[
            <div key="highLow" className={styles.Col}>
              <Icon name="FaChartBar" color="component" size={18} />
              <Text
                type="span"
                subtitle="Denní maximum a minimum"
                subtitleSize="sm"
              />
              <Text
                type="span"
                title={item.high_24h}
                subtitle="CZK (max)"
                size="sm"
                subtitleSize="sm"
                subtitlePosition="after"
              />
              <Text
                type="span"
                title={item.low_24h}
                subtitle="CZK (min)"
                size="sm"
                subtitleSize="sm"
                subtitlePosition="after"
              />
            </div>,
          ]}
        />

        <Card
          className="col-100"
          theme="light"
          headerElements={[
            <div key="highLow" className={styles.Col}>
              <Icon name="FaChartBar" color="component" size={18} />
              <Text
                type="span"
                subtitle="Denní maximum a minimum"
                subtitleSize="sm"
              />
              <Text
                type="span"
                title={item.high_24h}
                subtitle="CZK (max)"
                size="sm"
                subtitleSize="sm"
                subtitlePosition="after"
              />
              <Text
                type="span"
                title={item.low_24h}
                subtitle="CZK (min)"
                size="sm"
                subtitleSize="sm"
                subtitlePosition="after"
              />
            </div>,
          ]}
        />
      </div>
    </div>
  );
}
