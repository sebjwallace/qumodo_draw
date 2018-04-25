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

const TitleBar = ({handleAppAction}) => (
    <div className={styles.TitleBar}>

        <div className={styles.logoBox}>
            <img src={qumodoLogo} alt='Qumodo' />
            Qumodo Draw
        </div>

        <ul className={styles.buttonStrip}>
            <li>
                <button className={icons.addButton}
                        title='New Image'
                        onClick={handleClick.bind(this, AppActions.NewImage, handleAppAction)}>
                    New
                </button>
            </li>
            <li>
                <button className={icons.openButton}
                        title='Open Image'
                        onClick={handleClick.bind(this, AppActions.OpenImage, handleAppAction)}>
                    Open
                </button>
            </li>
            <li>
                <button className={icons.saveButton}
                        title='Save Image'
                        onClick={handleClick.bind(this, AppActions.SaveImage, handleAppAction)}>
                    Save
                </button>
            </li>
        </ul>

    </div>
);

TitleBar.propTypes = {
    handleAppAction: PropTypes.func.isRequired
};

export default TitleBar;