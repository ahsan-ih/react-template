import { v4 as uuidv4 } from 'uuid'
import { 
  ADD_TODO, 
  TOGGLE_TODO, 
  SET_VISIBILITY_FILTER 
} from '../types'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
}

export const addTodo = text => async dispatch => {
  dispatch({
    type: ADD_TODO,
    payload: { id: uuidv4(), text }
  })
}

export const toggleTodo = id => async dispatch => {
  dispatch({
    type: TOGGLE_TODO,
    payload: id
  })
}

export const setVisibilityFilter = filter => async dispatch => {
  dispatch({
    type: SET_VISIBILITY_FILTER,
    payload: filter
  })
}