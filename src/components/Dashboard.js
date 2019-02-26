import React from 'react';
import ControlContainer from './ControlContainer';
import StudentContainer from './StudentContainer';
import lsUtils from '../utils/localstorageUtils';
import constants from '../utils/constants'
import styles from '../styles/components/Dashboard.module.css';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this._saveList = this._saveList.bind(this);

  }

  componentDidMount() {
    // if (this.shouldLoadSection(constants.minSection)) {
    //   this.loadSection(constants.minSection);
    // }
  }

  shouldLoadSection(section) {
    const lsAvailable = lsUtils.isLocalStorageAvailable();
    this.setState(() => ({ lsAvailable }));
    return lsAvailable && lsUtils.isSectionCurrent(section);
  }

  loadSection(section) {
    const oldState = lsUtils.loadSection(section);
    this.setState(() => oldState);
  }

  saveSection() {
    if (this.state.lsAvailable) {
      lsUtils.saveSection(this.state);
    }
  }

  componentDidUpdate() {
    this.saveSection()
  }

  // method to save the current section of picked students to a CSV file
  _saveList() {
    if (this.state.lsAvailable) {
      lsUtils.saveList()
    }
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