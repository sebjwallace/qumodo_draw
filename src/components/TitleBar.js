import React         from 'react'
import styles        from './TitleBar.scss'
import qumodoLogo    from '../images/qumodo_logo.png'
import '../css/controls.scss'

const TitleBar = () => (
    <div className={styles.TitleBar}>

        <div className={styles.logoBox}>
            <img src={qumodoLogo} alt='Qumodo' />
            Qumodo CNN MNIST
        </div>

        <div className={styles.strip}></div>

    </div>
);

export default TitleBar;