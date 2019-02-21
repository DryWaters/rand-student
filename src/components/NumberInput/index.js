import React from 'react';
import { Input, Label } from 'reactstrap';
import styles from '../../styles/components/NumberInput/NumberInput.module.css';

const NumberInput = ({name, min, max, value, action}) => (
    <div className={styles.inputDiv}>
        <Label className={styles.label} for={name}>{name}</Label>
        <Input className={styles.input} min={min} id={name} type="number" value={value} max={max} onChange={e => action(e.target.value)}></Input>
    </div>
);

export default NumberInput;