import React from 'react';
import Control from '../Control'
import { Input, Label } from 'reactstrap';
import styles from '../../styles/components/ControlContainer/ControlContainer.module.css';

const ControlContainer = ({controls, numStudents, updateStudents, speech}) => (
  <div className={styles.container}>
    {controls.map(control => <Control control={control} key={control.name} speech={speech}/>)}
    <div className={styles.numberPicker}>
      <Label className={styles.label} for="numStudents">Students</Label>
      <Input className={styles.input} min="1" id="numStudents" type="number" value={numStudents} onChange={e => updateStudents(e.target.value)}></Input>
    </div>
  </div>
);

export default ControlContainer;