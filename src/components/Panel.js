import React     from 'react'
import styles    from './Panel.scss'
import icons     from '../icons/icons.scss'
import PropTypes from 'prop-types'

export const PanelTypes = {
    text: 'text',
    password: 'password',
    file: 'file'
};

const Panel = ({title, message, type, value, onCancel, onComplete}) => {
    let newValue = value;

    return  (
        <div className={styles.PanelContainer}>

            <div className={styles.Panel}>
                <h2 className={styles.titleBar}>{title}</h2>

                <div className={styles.content}>
                    <p>{message}</p>
                    <p>
                        <input type={type} defaultValue={value} onChange={
                            event => {
                                if (type === PanelTypes.file) {
                                    newValue = event.target.files[0];
                                } else {
                                    newValue = event.target.value;
                                }
                            }
                        }/>
                    </p>
                </div>

                <ul className={styles.buttons}>
                    <li>
                        <button className={icons.cancelButton} onClick={e => {
                            e.preventDefault();
                            onCancel();
                        }}>Cancel</button>
                    </li>
                    <li>
                        <button className={icons.checkButton} onClick={e => {
                            e.preventDefault();
                            onComplete(newValue);
                            newValue = null;
                        }}>OK</button>
                    </li>
                </ul>
            </div>

        </div>
    );
};

Panel.propTypes = {
    value: PropTypes.string,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired
};

export default Panel;