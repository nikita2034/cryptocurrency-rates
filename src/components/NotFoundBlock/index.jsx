import React from "react";
import styles from './NotFound.module.css'
function NotFoundBlock(){
    return <div className={styles.root}>
        <h1 >
            <span>(</span>
            <br/>
            Ничего не найдено
        </h1>
        <p className={styles.description}>Данная страница отсутствует в нашем интернет магазине</p>
    </div>
}
export default NotFoundBlock