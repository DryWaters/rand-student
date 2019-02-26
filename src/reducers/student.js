import CONSTANTS from '../utils/constants';
import { createStudents } from '../actions/student';
import ACTION_TYPES from '../actions/actionTypes';

const studentReducerDefaultState = Object.assign({}, {
  numStudents: CONSTANTS.defaultNumStudents,
  section: CONSTANTS.minSection,
  speech: true,
  day: new Date().getDate(),
}, createStudents(CONSTANTS.defaultNumStudents));

export default (state = studentReducerDefaultState, action) => {
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