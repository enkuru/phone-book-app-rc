import {combineReducers} from 'redux';

import persons from './persons';
import personModal from './personModal';

export default combineReducers({persons, personModal});