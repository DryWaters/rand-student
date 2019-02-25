import React from 'react';
import ButtonContainer from './ButtonContainer';
import InputContainer from './InputContainer';
import styles from '../styles/components/ControlContainer.module.css';

const ControlContainer = ({ inputs, numStudents, section }) => (
  <div className={styles.container}>
    <ButtonContainer />
    <InputContainer inputs={inputs} numStudents={numStudents} section={section} />
  </div>
);

export default ControlContainer;