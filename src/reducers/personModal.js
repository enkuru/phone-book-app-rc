import * as personModalActions from '../actions/personModal';

const initialState = {
  person: {firstName: '', lastName: '', email: '', numbers: []},
  modalOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case personModalActions.LOAD_PERSON:
      return {person: action.payload, modalOpen: true};
    default:
      return state;
  }
}