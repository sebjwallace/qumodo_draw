import React from 'react'
import styles from './Button.scss'

const Button = ({ children }) => <div className={styles.Button}>
    { children }
</div>

export default Button;