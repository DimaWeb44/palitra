import React from 'react'
import styles from "./palitra.module.css"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {addColorAC} from "../../../bll/palitraReducer";
import {v1} from 'uuid'
import {ColorMemo} from "./components/Color";

export const Palitra = () => {
    const dispatch = useAppDispatch()
    const colors = useAppSelector(state => state.palitra.colors)

    const addColor = () => {
        dispatch(addColorAC({tint: '#b93c30', id: v1()}))
    }

    return (<div className={styles.palitra}>
        <div className={styles.colors}>
            {colors.map(((item) => <ColorMemo key={item.id} item={item}/>))}
        </div>
        <button onClick={addColor} className={styles.btn}>Добавить цвет</button>
    </div>)
}