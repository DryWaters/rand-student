import React from 'react';
import Btn from '../Btn';
import styles from '../../styles/components/ButtonContainer/ButtonContainer.module.css';

const ButtonContainer = ({ buttons, speech }) => (
    <div className={styles.container}>
      {buttons.map(button => <Btn key={button.name} name={button.name} speech={speech} action={button.action}/>)}
    </div>
  )
  
  export default ButtonContainer;