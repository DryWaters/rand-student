import React from 'react';
import { Button } from 'reactstrap';
import styles from '../styles/components/Btn.module.css';
import '../styles/base/fontello.css'

const selectSoundIcon = (speech) => {
  if (speech) {
    return <i className="icon-sound"></i>
  } else {
    return <i className="icon-mute"></i>
  }
};

export const Btn = (props) => (
  <Button color="primary" size="lg" className={styles.btn} onClick={props.action} >
    {props.name === 'Sound' ? selectSoundIcon(props.speech) : props.name}
  </Button>
);

export default Btn;