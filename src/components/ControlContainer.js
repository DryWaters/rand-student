import React from 'react';
import ButtonContainer from './ButtonContainer';
import InputContainer from './InputContainer';
import styles from '../styles/components/ControlContainer.module.css';

const ControlContainer = () => (
  <div className={styles.container}>
    <ButtonContainer />
    <InputContainer />
  </div>
);

export default ControlContainer;