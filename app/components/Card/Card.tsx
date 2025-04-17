"use client";

import classNames from "classnames";
import styles from "./Card.module.scss";

interface CardProps {
  id?: string;
  title?: string | number;
  subTitle?: string | number;
  img?: string;
  className?: string;
  headerElements?: React.ReactNode[];
  contentElements?: React.ReactNode[];
  footerElements?: React.ReactNode[];
}

export const Card: React.FC<CardProps> = ({
  id,
  title,
  subTitle,
  className,
  headerElements = [],
  contentElements = [],
  footerElements = [],
}) => {
  return (
    <div id={id} key={id} className={classNames(styles.Card, className)}>
      <div className={styles.Header}>{headerElements}</div>
      <div className={styles.TitleWrapper}>
        <h4 className={styles.Title}>{title}</h4>
        <span className={styles.SubTitle}>{subTitle}</span>
      </div>
      <div className={styles.Content}>{contentElements}</div>
      <div className={styles.Footer}>{footerElements}</div>
    </div>
  );
};
