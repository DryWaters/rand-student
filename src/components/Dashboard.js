import React from 'react';
import ControlContainer from './ControlContainer';
import StudentContainer from './StudentContainer';
import lsUtils from '../utils/localstorageUtils';
import styles from '../styles/components/Dashboard.module.css';

class Dashboard extends React.Component {

  shouldLoadSection(section) {
    const lsAvailable = lsUtils.isLocalStorageAvailable();
    this.setState(() => ({ lsAvailable }));
    return lsAvailable && lsUtils.isSectionCurrent(section);
  }

  loadSection(section) {
    const oldState = lsUtils.loadSection(section);
    this.setState(() => oldState);
  }
  
  render() {
    return (
      <div styles={styles.dashboard}>
        <ControlContainer />
        <StudentContainer />
      </div >
    )
  }
}

export default Dashboard;