import React         from 'react'
import styles        from './TitleBar.scss'
import icons         from '../icons/icons.scss'
import qumodoLogo    from '../images/qumodo_logo.png'
import PropTypes     from 'prop-types'
import {AppActions}  from '../containers/QumodoDraw'
import '../css/controls.scss'

function handleClick(action, handler, event) {
    event.preventDefault();
    handler(action);
}

const TitleBar = () => (
    <div className={styles.TitleBar}>

        <div className={styles.logoBox}>
            <img src={qumodoLogo} alt='Qumodo' />
            Qumodo MNIST Predict
        </div>

        <div className={styles.strip}></div>

    </div>
);

TitleBar.propTypes = {
    handleAppAction: PropTypes.func.isRequired
};

export default TitleBar;