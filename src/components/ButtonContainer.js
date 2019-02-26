import React from 'react';
import { connect } from 'react-redux';
import { toggleSpeech, pickStudent, saveList } from '../actions/student';
import Btn from './Btn';
import styles from '../styles/components/ButtonContainer.module.css';

export const ButtonContainer = (props) => {

  const buttons = [
    { name: 'Pick Student', action: props.pickStudent },
    { name: 'Sound', action: props.toggleSpeech },
    { name: 'Save List', action: props.saveList },
  ];

  return (
    <div className={styles.container}>
      {buttons.map(button => <Btn key={button.name} name={button.name} speech={props.speech} action={button.action} />)}
    </div>
  );
}

const mapStateToProps = (state) => ({
  speech: state.speech,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSpeech: () => dispatch(toggleSpeech()),
  pickStudent: () => dispatch(pickStudent()),
  saveList: () => saveList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer);