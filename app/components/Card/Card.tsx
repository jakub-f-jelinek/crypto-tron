"use client";

import classNames from "classnames";
import styles from "./Card.module.scss";

interface CardProps {
  id?: string;
  title?: string | number;
  titleSize?: "sm" | "md" | "lg" | "xl";
  subTitle?: string | number;
  img?: string;
  className?: string;
  headerElements?: React.ReactNode[];
  contentElements?: React.ReactNode[];
  footerElements?: React.ReactNode[];
  theme?: "light" | "dark";
}

export const Card: React.FC<CardProps> = ({
  id,
  title,
  titleSize = "md",
  subTitle,
  className,
  headerElements = [],
  contentElements = [],
  footerElements = [],
  theme = "dark",
}) => {
  return (
    <div
      id={id}
      key={id}
      className={classNames(styles.Card, styles[`Theme--${theme}`], className)}
    >
      <div className={styles.Header}>{headerElements}</div>
      <div className={styles.TitleWrapper}>
        <h4 className={classNames(styles.Title, styles[`Title--${titleSize}`])}>
          {title}
        </h4>
        <span className={styles.SubTitle}>{subTitle}</span>
      </div>
      <div className={styles.Content}>{contentElements}</div>
      <div className={styles.Footer}>{footerElements}</div>
    </div>
  );
};
