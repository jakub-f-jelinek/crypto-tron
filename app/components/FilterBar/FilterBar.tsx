"use client";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./FilterBar.module.scss";

interface FilterBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  reset: () => void;
  buttonSortAsc: () => void;
  buttonSortDesc: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  value,
  onChange,
  placeholder,
  reset,
  buttonSortAsc,
  buttonSortDesc,
}) => {
  return (
    <div className={styles.Wrapper}>
      <Input
        type="text"
        onChange={onChange}
        value={value}
        iconName="FaSearch"
        placeholder={placeholder}
      />
      <Button
        onClick={buttonSortDesc}
        variant="primary"
        iconName="FaSortAmountDown"
        size="iconBox"
      />
      <Button
        onClick={buttonSortAsc}
        variant="primary"
        iconName="FaSortAmountUp"
        size="iconBox"
      />
      <Button
        onClick={reset}
        variant="secondary"
        iconName="IoClose"
        size="iconBox"
      />
    </div>
  );
};
