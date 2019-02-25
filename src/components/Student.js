import React from 'react';
import styles from '../styles/components/Student.module.css';

const selectStyle = (status) => {
  if (status === 'unpicked') {
    return styles.unpicked;
  } else if (status === 'picked') {
    return styles.picked;
  } else {
    return styles.selected;
  }
};

const Student = ({ student, toggleStudent }) => (
  <div className={`${styles.student} ${selectStyle(student.status)}`} onClick={() => toggleStudent(student.id)}>
    <p className={styles.studentId}>{student.id}</p>
  </div>
);

export default Student;