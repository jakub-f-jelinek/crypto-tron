"use client";

import React from "react";
import { useFetchData } from "@/app/useFetchData";
import { useData } from "@/app/hooks/Provider";
import { CoinData } from "@/app/utils/types";
import styles from "./ItemDetail.module.scss";
import { Card } from "@/app/components/Card/Card";
import { DiVim } from "react-icons/di";
import { Icon } from "@/app/components/Icon/Icon";

export default function ItemDetail({ id }: { id: string }) {
  const { isLoading, error, data } = useFetchData();
  const { items } = useData();

  if (isLoading) return <div>Is loading...</div>;
  if (error) return <div>Error</div>;

  const item = data.find((item: CoinData) => item.id === id);
  const itemCalculator = items.find((item: CoinData) => item.id === id);
  console.log(item);

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <img className={styles.ItemImg} src={item.image} alt={item.name} />
        <span>{item.symbol}</span>
      </div>

      <h1>{item.name}</h1>
      <div className={styles.Main}>
        <Card
          className="col-33"
          title={item.current_price}
          subTitle="CZK"
          headerElements={[
            <div className={styles.Col}>
              <Icon name="FaMoneyBillAlt" color="component" size={18} />
              <span className={styles.SubText}>Cena (24h)</span>
            </div>,
          ]}
        />
      </div>

      <div>{itemCalculator?.count}</div>
    </div>
  );
}
