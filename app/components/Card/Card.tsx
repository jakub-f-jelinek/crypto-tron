"use client";

import styles from "./Card.module.scss";

interface CardProps {
  id: string;
  title: string;
  headerElements?: React.ReactNode[];
  contentElements?: React.ReactNode[];
  footerElements?: React.ReactNode[];
}

export const Card: React.FC<CardProps> = ({
  id,
  title,
  headerElements = [],
  contentElements = [],
  footerElements = [],
}) => {
  return (
    <div id={id} key={id} className={styles.Card}>
      <div className={styles.Header}>{headerElements}</div>
      <h4>{title}</h4>
      <div className={styles.Content}>{contentElements}</div>
      <div className={styles.Footer}>{footerElements}</div>
    </div>
  );
};
