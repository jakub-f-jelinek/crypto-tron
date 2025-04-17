"use client";

import { useFetchData } from "@/app/useFetchData";
import { CoinData } from "@/app/utils/types";
import styles from "./pages.module.scss";
import { useData } from "@/app/hooks/Provider";
import { ListItem } from "@/app/components/List/ListItem/ListItem";

interface ItemDetailProps {
  params: {
    id: string;
  };
}

export default function ItemDetail({ params }: ItemDetailProps) {
  const { isLoading, error, data } = useFetchData();
  const { items } = useData();
  console.log(items);

  const item = data.find((item: CoinData) => item.id === params.id);
  const itemCalculator = items.find((item: CoinData) => item.id === params.id);

  console.log(itemCalculator);

  if (isLoading) return <div>Is loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="p-block">
      ItemDetail
      <div>{item.name}</div>
      <div>
        {/* <ListItem 
        
        /> */}
        {itemCalculator?.count}
      </div>
    </div>
  );
}
