import React from 'react';
import ControlContainer from './ControlContainer';
import StudentContainer from './StudentContainer';
import styles from '../styles/components/Dashboard.module.css';

const Dashboard = () => (
  <div styles={styles.dashboard}>
    <ControlContainer />
    <StudentContainer />
  </div >
);

export default Dashboard;