import React from "react";
import spinner from "../../assets/spinner.svg";

import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <img className={styles.spinner} src={spinner} alt="Loading spinner" />
    </div>
  );
};

export default LoadingSpinner;
