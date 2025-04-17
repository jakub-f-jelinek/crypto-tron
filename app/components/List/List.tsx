"use client";

import { useFetchData } from "../../useFetchData";
import { useData } from "../../hooks/Provider";
import { Button } from "../../components/Button/Button";
import { ListItem } from "./ListItem/ListItem";
import { CoinData } from "@/app/utils/types";
import { useEffect, useState } from "react";
import "../../styles/utils/page.scss";
import { Input } from "../Input/Input";
import { FilterBar } from "../FilterBar/FilterBar";
import Link from "next/link";

export default function List() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<CoinData[]>([]);
  const { data, isLoading, error } = useFetchData();
  const { items, addItem } = useData();

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item: CoinData) =>
        item.name.toLowerCase().includes(search)
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const reset = () => {
    setFilteredData(data);
    setSearch("");
  };

  const handleAdd = (item: CoinData) => {
    addItem(item);
  };

  const filterAsc = () => {
    const sortedData = [...data].sort(
      (a, b) => a.current_price - b.current_price
    );
    setFilteredData(sortedData);
  };

  const filterDesc = () => {
    const sortedData = [...data].sort(
      (a, b) => b.current_price - a.current_price
    );
    setFilteredData(sortedData);
  };

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(data);

  return (
    <>
      <FilterBar
        value={search}
        onChange={handleSearch}
        reset={reset}
        buttonSortAsc={filterAsc}
        buttonSortDesc={filterDesc}
      />

      {filteredData.map((item: CoinData) => {
        const isInCalculator = items.some((coin) => item.id === coin.id);
        const price = item.current_price;
        // TODO:
        const priceFormatted = new Intl.NumberFormat("cs-CZ").format(price);

        return (
          <ListItem
            key={item.id}
            id={item.id}
            position={item.market_cap_rank}
            title={item.name}
            price={price}
            img={item.image}
            symbol={item.symbol}
            priceChange={item.price_change_24h}
            priceChangePercentage={item.price_change_percentage_24h}
            elements={[
              <div className="FlexRow GapMd">
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
