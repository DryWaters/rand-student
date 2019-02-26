import React from 'react';
import { connect } from 'react-redux';
import NumberInput from './NumberInput';
import { updateSection, updateStudents } from '../actions/student'
import constants from '../utils/constants'
import styles from '../styles/components/InputContainer.module.css';

export const InputContainer = (props) => {

  const inputs = [
    { name: 'Section', min: constants.minSection, max: constants.maxSection, action: props.updateSection },
    { name: 'Students', min: constants.minStudents, max: constants.maxStudents, action: props.updateStudents }
  ];

  return (
    <div className={styles.container}>
      {inputs.map(input =>
        <NumberInput
          key={input.name}
          name={input.name}
          min={input.min}
          max={input.max}
          value={input.name === 'Students' ? props.numStudents : props.section}
          action={input.action}>
        </NumberInput>)}
    </div>);
}


const mapStateToProps = (state) => ({
  numStudents: state.numStudents,
  section: state.section
});

const mapDispatchToProps = (dispatch) => ({
  updateSection: (section) => dispatch(updateSection(section)),
  updateStudents: (numStudents) => dispatch(updateStudents(numStudents))
});

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);