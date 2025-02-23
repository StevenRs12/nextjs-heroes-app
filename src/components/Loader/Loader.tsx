import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderContainer} role="status">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
