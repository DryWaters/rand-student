import React from 'react';
import Student from '../Student'
import styles from '../../styles/components/StudentContainer/StudentContainer.module.css';

const StudentContainer = (props) => (
  <div className={styles.container}>
    {props.students.map(student => <Student student={student} key={student.id} toggleStudent={props.toggleStudent} />)}
  </div>
);

export default StudentContainer;