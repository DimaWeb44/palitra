import styles from "./color.module.css";
import React, {useEffect, useRef, useState} from "react";
import {changeColorAC, colorType, deleteColorAC} from "../../../../bll/palitraReducer";
import {useAppDispatch, useIsFirstRender} from "../../../../utils/hooks";

type ItemType = {
    item: colorType
}
export const ColorMemo = React.memo(function Color({item}: ItemType) {
    const dispatch = useAppDispatch()
    const firstRender = useIsFirstRender()
    const colorPicker = useRef<HTMLInputElement>(null)
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)

    const handleMouseOver = () => setShowDeleteBtn(true)
    const handleMouseOut = () => setShowDeleteBtn(false)
    const deleteColor = () => dispatch(deleteColorAC(item.id))
    const changeColor = (color: string) => dispatch(changeColorAC(item.id, color))
    const handlePicker = () => {
        if (colorPicker && colorPicker.current) {
            colorPicker.current.click()
        }
    }

    useEffect(() => {
        if (firstRender) {
            const timer = setTimeout(() => {
                handlePicker()
            })
            return () => {
                clearTimeout(timer)
            }
        }
    }, [firstRender])

    return <div style={{backgroundColor: `${item.tint}`}}
                key={item.id}
                className={styles.item}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handlePicker}>
        {showDeleteBtn && <div className={styles.deleteBtn}
                               onClick={deleteColor}>
          <div className={styles.containerBtn}>
            <span className={styles.line1}/>
            <span className={styles.line2}/>
          </div>
        </div>}
        <input type={"color"}
               value={item.tint}
               onChange={event => changeColor(event.currentTarget.value)}
               ref={colorPicker}
               className={styles.inputColor}/>
    </div>
})
