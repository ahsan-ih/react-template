import { 
  ADD_TODO, 
  TOGGLE_TODO, 
  SET_VISIBILITY_FILTER
} from '../types'

import { VisibilityFilters } from '../actions'

const { SHOW_ALL } = VisibilityFilters

const initialState = {
  visibilityFilter: SHOW_ALL,
  todos: []
}

const todos = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_TODO:
      return [ 
        ...state,
        {
          ...payload,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === payload)
          return {
            ...todo,
            completed: !todo.completed
          }
        return todo
      })
    default:
      return state
  }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_VISIBILITY_FILTER:
      return payload
    default:
      return state
  }
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: todos(state.todos, action)
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: todos(state.todos, action)
      }
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
      }
    default:
      return state
  }
}