"use client";

import { useFetchData } from "@/app/useFetchData";
import { useData } from "@/app/hooks/Provider";
import { CoinData } from "@/app/utils/types";

import { Card } from "@/app/components/Card/Card";
import { Icon } from "@/app/components/Icon/Icon";
import { Text } from "@/app/components/Text/Text";
import { Button } from "@/app/components/Button/Button";
import { CalculatorCard } from "@/app/components/Calculator/CalculatorCard";
import { useCallback } from "react";

import styles from "./ItemDetail.module.scss";
import "../../styles/utils/page.scss";
import classNames from "classnames";

export default function ItemDetail({ id }: { id: string }) {
  const { isLoading, error, data } = useFetchData();
  const { items, addItem } = useData();

  if (isLoading) return <div>Is loading...</div>;
  if (error) return <div>Error</div>;

  const item = data.find((item: CoinData) => item.id === id);
  const itemCalculator = items.find((item: CoinData) => item.id === id);
  console.log(item);

  const handleAdd = useCallback(
    (item: CoinData) => {
      addItem(item);
    },
    [addItem]
  );

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Button
          title="Zpět"
          variant="link"
          iconName="FaArrowLeft"
          iconPositon="before"
        />
        <div className={classNames("col-33", styles.HeaderInfo)}>
          <img className={styles.ItemImg} src={item.image} alt={item.name} />
          <span>{item.symbol}</span>
        </div>
        <h1>{item.name}</h1>
        {/* calculator item component */}
        <div className="col-66">
          {itemCalculator !== undefined ? (
            <CalculatorCard item={itemCalculator} />
          ) : (
            <Button
              variant="primary"
              title="Přidat"
              iconName="FaPLus"
              iconPositon="after"
              iconColor="dark"
              onClick={() => handleAdd(item)}
            />
          )}
        </div>
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
