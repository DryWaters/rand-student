import CONSTANTS from '../utils/constants';
import ACTION_TYPES from '../actions/actionTypes';

const studentReducerDefaultState = {
  numStudents: CONSTANTS.defaultNumStudents,
  section: CONSTANTS.minSection,
  speech: true,
  day: new Date().getDate(),
  students: new Array(CONSTANTS.defaultNumStudents).fill().map((_, index) => ({
    id: index + 1,
    status: 'unpicked'
  })),
  unpickedStudents: new Array(CONSTANTS.defaultNumStudents).fill().map((_, index) => index + 1)
}

export default (state = studentReducerDefaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SPEECH:
    case ACTION_TYPES.TOGGLE_STUDENT:
    case ACTION_TYPES.PICK_STUDENT:
    case ACTION_TYPES.CLEAR_STUDENT:
      return {
        ...state,
        ...action.payload
      }
    default: {
      return state;
    }
  }

}