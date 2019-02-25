import React from 'react';
import { connect } from 'react-redux';
import Student from './Student'
import { toggleStudent } from '../actions/student'
import styles from '../styles/components/StudentContainer.module.css';

export const StudentContainer = (props) => (
  <div className={styles.container}>
    {props.students.map(student => <Student student={student} key={student.id} toggleStudent={props.toggleStudent} />)}
  </div>
);

const mapStateToProps = (state) => ({
  students: state.students
});

const mapDispatchToProps = (dispatch) => ({
  toggleStudent: (id) => dispatch(toggleStudent(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentContainer);