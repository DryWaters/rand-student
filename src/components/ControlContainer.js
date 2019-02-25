import React from 'react';
import ButtonContainer from './ButtonContainer';
import InputContainer from './InputContainer';
import styles from '../styles/components/ControlContainer.module.css';

const ControlContainer = ({ buttons, inputs, numStudents, section, speech }) => (
  <div className={styles.container}>
    <ButtonContainer buttons={buttons} speech={speech} />
    <InputContainer inputs={inputs} numStudents={numStudents} section={section} />
  </div>
);

export default ControlContainer;