import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ranges from './ranges'
import keyboard from './keyboard'

export default combineReducers({
  form: formReducer,
  ranges,
  keyboard,
})
