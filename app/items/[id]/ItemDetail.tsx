"use client";

import { useFetchData } from "@/app/useFetchData";
import { useData } from "@/app/hooks/Provider";
import { CoinData } from "@/app/utils/types";

import { Card } from "@/app/components/Card/Card";
import { Icon } from "@/app/components/Icon/Icon";
import { Text } from "@/app/components/Text/Text";
import { Button } from "@/app/components/Button/Button";
import { CalculatorCard } from "@/app/components/CalculatorComp/CalculatorCard";
import { useCallback } from "react";

import styles from "./ItemDetail.module.scss";
import "../../styles/utils/page.scss";
import classNames from "classnames";
import Link from "next/link";

export default function ItemDetail({ id }: { id: string }) {
  const { isLoading, error, data } = useFetchData();
  const { items, addItem } = useData();

  const handleAdd = useCallback(
    (item: CoinData) => {
      addItem(item);
    },
    [addItem]
  );

  if (isLoading) return <div>Načítám...</div>;
  if (error || !data) return <div>Chyba při načítání dat</div>;

  const item = data.find((item: CoinData) => item.id === id);
  if (!item) return <div>Item nenalezen</div>;

  const itemCalculator = items.find((item: CoinData) => item.id === id);

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={classNames("col-33", styles.HeaderInfo)}>
          <Link href="/">
            <Button
              variant="link"
              size="iconBox"
              iconName="FaArrowLeft"
              iconPositon="before"
              iconColor="light"
              className={styles.ButtonOutline}
            />
          </Link>
          <img className={styles.ItemImg} src={item.image} alt={item.name} />
          <span>
            {item.symbol} #{item.market_cap_rank}
          </span>
          <h1>{item.name}</h1>
          <div className={styles.Col}>
            <Icon name="FaCoins" color="component" size={18} />
            <Text type="span" subtitle="Aktuální cena" subtitleSize="sm" />
            <Text
              type="h3"
              title={item.current_price}
              subtitle="CZK"
              subtitleSize="md"
              subtitlePosition="after"
            />
          </div>
          {!itemCalculator && (
            <Button
              variant="primary"
              title="Přidat"
              iconName="FaPlus"
              iconPositon="after"
              iconColor="dark"
              onClick={() => handleAdd(item)}
            />
          )}
        </div>

        <div className="col-66">
          {itemCalculator && <CalculatorCard item={itemCalculator} />}
        </div>
      </div>

      <div className={styles.Main}>
        <Card
          className={classNames("col-33", styles.Card)}
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
                numberColor
              />
              <Text
                type="span"
                title={item.price_change_percentage_24h}
                subtitle="%"
                size="sm"
                subtitleSize="sm"
                subtitlePosition="after"
                numberColor
              />
            </div>,
          ]}
        />

        <Card
          className={classNames("col-33", styles.Card)}
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
          className={classNames("col-33", styles.Card)}
          theme="light"
          headerElements={[
            <div key="marketCap" className={styles.Col}>
              <Icon name="IoCashOutline" color="component" size={18} />
              <Text
                type="span"
                subtitle="Tržní kapitalizace"
                subtitleSize="sm"
              />
              <Text
                type="span"
                title={item.market_cap}
                subtitle="CZK"
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
