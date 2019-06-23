import React from 'react'
import styles from './Button.scss'

const Button = ({ children, onClick }) => <div
    className={styles.Button}
    onClick={onClick}
>
    { children }
</div>

export default Button;