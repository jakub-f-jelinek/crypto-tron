"use client";

import { Calculator } from "../components/Calculator/Calculator";
import styles from "./Calculator.module.scss";

interface CalculatorProps {}

export default function CalculatorPage() {
  return (
    <div>
      <Calculator />
    </div>
  );
}
