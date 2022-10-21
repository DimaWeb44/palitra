import styles from './circular-progress.module.css'
import preloader from './preloader.gif';

export const CircularProgress = () => {
    return <img src={preloader} className={styles.preloader} alt={'preloader'}/>
}