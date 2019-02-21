import React from 'react';
import NumberInput from '../NumberInput';
import styles from '../../styles/components/InputContainer/InputContainer.module.css';

const InputContainer = ({ inputs, numStudents, section }) => (

  <div className={styles.container}>
    {inputs.map(input =>
      <NumberInput
        key={input.name} 
        name={input.name} 
        min={input.min} 
        max={input.max} 
        value={input.name === 'Students' ? numStudents : section} 
        action={input.action}>
      </NumberInput>)}
  </div>
  
);

export default InputContainer;