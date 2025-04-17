import classNames from "classnames";
import styles from "./ListItem.module.scss";

interface ListItemProps {
  id: string;
  position?: string | number;
  title: string;
  price: number;
  img?: string;
  symbol?: string;
  priceChange?: number;
  priceChangePercentage?: number;
  totalValue?: number | null;
  elements?: React.ReactNode[];
  classNameElements?: string;
  classInfoElements?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  id,
  position,
  title,
  price,
  img,
  symbol,
  priceChange,
  priceChangePercentage,
  elements = [],
  classNameElements,
  classInfoElements,
}) => {
  return (
    <div id={id} className={classNames(styles.Item, classNameElements)}>
      <div className={classNames(styles.Info, classInfoElements)}>
        <span className={styles.Position}>{position}</span>
        {img ? <img className={styles.ItemImg} src={img} alt={title} /> : ""}
        <span className={styles.Symbol}>{symbol}</span>
        <span className={styles.Title}>{title}</span>
        <span className={styles.Price}>{price} CZK</span>
        {priceChange && (
          <span
            className={classNames(
              styles.PriceChange,
              priceChange > 0 ? styles["Is--Plus"] : styles["Is--Minus"]
            )}
          >
            {priceChange.toFixed(2)} CZK
          </span>
        )}

        {priceChangePercentage && (
          <span
            className={classNames(
              styles.PriceChangePercentage,
              priceChangePercentage > 0
                ? styles["Is--Plus"]
                : styles["Is--Minus"]
            )}
          >
            {priceChangePercentage.toFixed(2)}%
          </span>
        )}
      </div>

      <div className={styles.Elements}>{elements}</div>
    </div>
  );
};
