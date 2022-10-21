import {NavLink} from "react-router-dom";
import {PATH} from "../../app/App";
import styles from "./header.module.css"

export const Header = () => {
    return (<div className={styles.header}>
            <NavLink className={navData => navData.isActive ? styles.active : styles.item} to={PATH.FORM}>
                Форма
            </NavLink>
            <NavLink className={navData => navData.isActive ? styles.active : styles.item} to={PATH.PALITRA}>
                Палитра
            </NavLink>
        </div>
    )
}