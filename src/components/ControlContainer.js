import React from 'react';
import Control from './Control'
import styles from './ControlContainer.module.css';



const ControlContainer = (props) => (
  <div className={styles.container}>
    {props.controls.map(control => <Control control={control} key={control.name} />)}
  </div>
);

export default ControlContainer;