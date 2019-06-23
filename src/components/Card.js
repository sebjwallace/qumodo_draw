
import React from 'react'
import styles from './Card.scss'

const Card = ({ title, children }) => <div className={styles.Card}>
    <div className={styles.title}>
        { title }
    </div>
    <div className={styles.body}>
        { children }
    </div>
</div>

export default Card;