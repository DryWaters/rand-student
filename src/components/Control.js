import React from 'react';
import styles from './Control.module.css';
import { Button } from 'reactstrap';
import '../assets/css/fontello.css'

const soundIcon = (speech) => {
  if (speech) {
    return <i className="icon-sound"></i>
  } else {
    return <i className="icon-mute"></i>
  }
}

const Control = ({ control, speech }) => (
  <div>
    <Button color="primary" size="lg" className={styles.control} onClick={control.action}>
      {control.name === 'Sound' ? soundIcon(speech) : control.name}
    </Button>
  </div>
)

export default Control;