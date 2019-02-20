import React from 'react';
import styles from './Control.module.css';

const Control = ({control}) => (
    <button className={styles.control} onClick={control.action}>{control.name}</button>
)

export default Control;