import React from 'react';
import styles from './Control.module.css';
import { Button } from 'reactstrap';

const Control = ({ control }) => (
    <Button color="primary" size="lg" className={styles.control} onClick={control.action}>{control.name}</Button>
)

export default Control;