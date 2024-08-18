import { useState } from "react";
import styles from "../layout/Loading.module.css";

function Loading() {
    return (
        <div className={styles.container_loader}>
            <span className={styles.loader}></span>
        </div>
    );
}

export default Loading;
