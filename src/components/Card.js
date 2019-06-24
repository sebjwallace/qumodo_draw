
import React from 'react'
import styles from './Card.scss'

const Card = ({ title, children, style: propStyles }) => <div
    className={styles.Card}
    style={propStyles}
>
    <div className={styles.title}>
        { title }
    </div>
    <div className={styles.body}>
        { children }
    </div>
</div>

export default Card;