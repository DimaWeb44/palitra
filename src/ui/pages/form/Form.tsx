import React, {useRef, useState} from 'react'
import styles from "./form.module.css";
import {setResponseTC} from "../../../bll/formReducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";

export const Form = () => {
    const dispatch = useAppDispatch()
    const response = useAppSelector(state => state.form.response)
    const data = new FormData()
    const inputFile = useRef<HTMLInputElement>(null)
    const [drop, setDrop] = useState(false)
    const [photo, setPhoto] = useState<File | null>(null)

    const handleInputFile = () => {
        if (inputFile && inputFile.current) inputFile.current.click()
    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrop(true)
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrop(false)
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        let file = e.dataTransfer.files[0]
        setPhoto(file)
        setDrop(false)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | null) => {
        if (e!.target.files) {
            const file = e!.target.files[0];
            setPhoto(file)
        }
    }

    const setResponse = () => {
        data.set('action', "send_data")
        data.set('id', '1')
        data.set('image', photo as Blob)
        dispatch(setResponseTC(data))
        setPhoto(null)
    }

    return (<div className={styles.form}>
        <form>
            <div className={styles.itemBox}>
                <label className={styles.label}>Имя</label>
                <input name={'contact[name]'}
                       className={styles.input}
                       type={"text"}
                       placeholder={'Лев'}
                       onChange={e => data.set('contact[name]', e.currentTarget.value)}/>
            </div>
            <div className={styles.itemBox}>
                <label className={styles.label}>Фамилия</label>
                <input name={'contact[surname]'}
                       className={styles.input}
                       type={"text"}
                       placeholder={'Лещенко'}
                       onChange={e => data.set('contact[surname]', e.currentTarget.value)}/>
            </div>
            <div className={styles.itemBox}>
                <label className={styles.label}>Отчество</label>
                <input name={'contact[patronymic]'}
                       className={styles.input}
                       type={"text"}
                       placeholder={'Валерьянович'}
                       onChange={e => data.set('contact[patronymic]', e.currentTarget.value)}/>
            </div>
            <div className={styles.itemBox}>
                <label className={styles.label}>Фото</label>
                <div className={styles.inputFileBox}
                     onClick={handleInputFile}
                     onDragOver={e => dragOverHandler(e)}
                     onDragLeave={e => dragLeaveHandler(e)}
                     onDrop={e => onDropHandler(e)}>
                    {drop
                        ? <div className={styles.dragTitle}>Отпустите файл</div>
                        : <img className={styles.photo}
                               alt={'photo'}
                               src={`${photo
                                   ? URL.createObjectURL(photo)
                                   : 'https://img.icons8.com/sf-regular/56/000000/add-image.png'}`}/>}
                </div>
                <input name={'image'}
                       required
                       onChange={e => onChangeHandler(e)}
                       ref={inputFile}
                       className={styles.inputFile}
                       type={"file"}
                       accept={"image/*"}/>
            </div>
            <button type="reset"
                    onClick={setResponse}
                    className={styles.btn}>
                Сохранить
            </button>
        </form>
        <div className={styles.itemBox}>
            <span className={styles.label}>Response</span>
            <pre className={styles.response}
                 style={{
                     color: `${response && JSON.parse(response).data.status === 'error'
                         ? 'red'
                         : 'rgba(235, 235, 245, 0.6)'}`
                 }}>
                {response}
            </pre>
        </div>
    </div>)
}