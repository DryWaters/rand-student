import React from 'react';
import styles from '../../styles/components/Btn/Btn.module.css';
import { Button } from 'reactstrap';
import '../../styles/main/css/fontello.css'

const selectSoundIcon = (speech) => {
  if (speech) {
    return <i className="icon-sound"></i>
  } else {
    return <i className="icon-mute"></i>
  }
};

const Btn = ({ name, speech, action }) => (
  <Button color="primary" size="lg" className={styles.btn} onClick={action}>
    {name === 'Sound' ? selectSoundIcon(speech) : name}
  </Button>
);

export default Btn;