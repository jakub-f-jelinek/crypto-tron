"use client";

import { useFetchData } from "../../useFetchData";
import { useData } from "../../hooks/Provider";
import { Button } from "../../components/Button/Button";
import { ListItem } from "./ListItem/ListItem";
import { CoinData } from "@/app/utils/types";
import { useMemo, useState, useCallback } from "react";
import { FilterBar } from "../FilterBar/FilterBar";
import Link from "next/link";
import { Chart } from "../Chart/Chart";
import { Card } from "../Card/Card";
import { Text } from "../Text/Text";
import "../../styles/utils/page.scss";
import styles from "./List.module.scss";

export default function List() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const { data, isLoading, error } = useFetchData();
  const { items, addItem, totalCalculatorValue, totalProfit } = useData();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const reset = () => {
    setSearch("");
    setSortOrder(null);
  };

  const handleAdd = useCallback(
    (item: CoinData) => {
      addItem(item);
    },
    [addItem]
  );

  const sortedAndFilteredData = useMemo(() => {
    if (!data) return [];

    let result = data.filter((item: CoinData) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.current_price - b.current_price);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.current_price - a.current_price);
    }

    return result;
  }, [data, search, sortOrder]);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  const total = totalCalculatorValue();
  const sumProfit = totalProfit();

  return (
    <>
      <div className={styles.IntroWrapper}>
        <div className={styles.Card}>
          <Card
            title={items.length}
            titleSize="xl"
            theme="light"
            headerElements={[
              <Text
                type="span"
                size="sm"
                subtitlePosition="up"
                subtitle="Počet kryptoměn v kalkulačce"
              />,
            ]}
          />
        </div>
        <div className={styles.Card}>
          <Card
            title={total !== null && total > 0 ? total : 0}
            titleSize="xl"
            subTitle="CZK"
            theme="light"
            headerElements={[
              <Text
                type="span"
                size="sm"
                subtitlePosition="up"
                subtitle="Celková hodnota kalkulačky"
              />,
            ]}
            footerElements={[
              <Text
                type="span"
                size="sm"
                subtitlePosition="up"
                subtitle="Celková profitní hodnota"
                title={
                  sumProfit !== null && sumProfit > 0 ? sumProfit.toFixed(2) : 0
                }
              />,
            ]}
          />
        </div>
        <div className={styles.Card}>
          <Card
            theme="light"
            headerElements={[
              <Text
                type="span"
                size="sm"
                subtitlePosition="up"
                subtitle="Zisk kalkulačky"
              />,
            ]}
            contentElements={[<Chart data={items} />]}
          />
        </div>
      </div>

      <FilterBar
        value={search}
        onChange={handleSearch}
        reset={reset}
        buttonSortAsc={() => setSortOrder("asc")}
        buttonSortDesc={() => setSortOrder("desc")}
      />

      {sortedAndFilteredData.map((item: CoinData) => {
        const isInCalculator = items.some((coin) => item.id === coin.id);

        return (
          <ListItem
            key={item.id}
            id={item.id}
            position={item.market_cap_rank}
            title={item.name}
            price={item.current_price}
            img={item.image}
            symbol={item.symbol}
            priceChange={item.price_change_24h}
            priceChangePercentage={item.price_change_percentage_24h}
            elements={[
              <div key="buttons" className="FlexRow GapMd">
                <Button
                  key="add"
                  title="Přidat"
                  onClick={() => handleAdd(item)}
                  variant="primary"
                  disabled={isInCalculator}
                  iconName="MdAdd"
                />
                <Link href={`/items/${item.id}`}>
                  <Button
                    key="detail"
                    title="Detail"
                    variant="secondary"
                    iconName="MdArrowForward"
                  />
                </Link>
              </div>,
            ]}
          />
        );
      })}
    </>
  );
}
