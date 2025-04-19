"use client";

import { Button } from "../Button/Button";
import styles from "./Calculator.module.scss";
import { Input } from "../Input/Input";
import { Card } from "../Card/Card";
import classNames from "classnames";
import { Text } from "../Text/Text";

import { CoinData } from "@/app/utils/types";
import { useData } from "@/app/hooks/Provider";
import { useAppSelector } from "@/app/redux/hooks";
import { removeItem, updateItem } from "../../redux/CoinSlice";
import {
  useHandleCountChange,
  useHandleInvestmentChange,
  useHandleRemove,
} from "@/app/utils/utils";

interface CalculatorCardProps {
  item: CoinData;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ item }) => {
  const items = useAppSelector((state) => state.coins.items);
  const handleRemove = useHandleRemove();
  const handleCountChange = useHandleCountChange();
  const handleInvestmentChange = useHandleInvestmentChange();

  return (
    <div>
      <Card
        key={item.id}
        id={item.id}
        img={item.image}
        headerElements={[
          <div key="cardHeader" className={styles.Header}>
            <div className={styles.HeaderInfo}>
              <img
                className={styles.ItemImg}
                src={item.image}
                alt={item.name}
              />
              <span className={classNames(styles.SubText, styles.Symbol)}>
                {item.symbol}
              </span>
              <span className={styles.SubText}>
                {item.current_price} CZK / 1 jednotku
              </span>
            </div>
            <Button
              variant="link"
              size="iconBox"
              iconName="IoClose"
              iconColor="light"
              onClick={() => handleRemove(item.id)}
            />
          </div>,
        ]}
        contentElements={[
          <div key="contentElements" className={styles.Content}>
            <Text
              type="span"
              subtitleSize="sm"
              subtitle="Celková hodnota coinu"
            />
            <Text
              type="h4"
              title={item.totalValue}
              subtitleSize="sm"
              subtitle="CZK"
              subtitlePosition="after"
            />
            <div className={styles.Number}>
              <Text
                type="span"
                subtitleSize="sm"
                subtitle="Počet jednotek"
                subtitlePosition="up"
              />
              <Input
                type="number"
                value={item.count}
                onChange={(e) =>
                  handleCountChange({
                    id: item.id,
                    count: Number(e.target.value),
                  })
                }
              />
              <Text
                type="span"
                subtitleSize="sm"
                subtitle="Počáteční investice"
                subtitlePosition="up"
              />

              <Input
                type="number"
                value={item.startInvestmentValue}
                onChange={(e) =>
                  handleInvestmentChange(item.id, Number(e.target.value))
                }
              />

              <Text
                type="span"
                subtitleSize="sm"
                subtitle="Celkový profit coinu"
                subtitlePosition="up"
              />

              <Text
                type="span"
                subtitleSize="sm"
                subtitle="CZK"
                subtitlePosition="after"
                title={item.profit}
              />
              <div className={styles.Divider}></div>
              <Text
                type="span"
                subtitleSize="sm"
                subtitle="Podíl hodnoty coin vs. kalkulačka"
                subtitlePosition="up"
              />
              <Text
                type="span"
                subtitleSize="sm"
                subtitle="%"
                subtitlePosition="after"
                title={item.itemPercentage}
              />
            </div>
          </div>,
        ]}
      />
    </div>
  );
};
