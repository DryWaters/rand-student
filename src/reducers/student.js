import CONSTANTS from '../utils/constants';
import { createStudents } from '../actions/student';
import * as lsUtils from '../utils/localstorageUtils';
import * as ACTION_TYPES from '../actions/actionTypes';

const initialState = (section) => {
  if (lsUtils.isSectionCurrent(section)) {
    return lsUtils.loadSection(section)
  } else {
    return Object.assign({}, {
      numStudents: CONSTANTS.defaultNumStudents,
      section: CONSTANTS.minSection,
      speech: true,
      day: new Date().getDate(),
    }, createStudents(CONSTANTS.defaultNumStudents))
  }
};

export default (state = initialState(CONSTANTS.minSection), action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SPEECH:
    case ACTION_TYPES.TOGGLE_STUDENT:
    case ACTION_TYPES.PICK_STUDENT:
    case ACTION_TYPES.CLEAR_STUDENT:
    case ACTION_TYPES.UPDATE_SECTION:
    case ACTION_TYPES.UPDATE_STUDENTS:
      return {
        ...state,
        ...action.payload
      }
    default: {
      return state;
    }
  }
}