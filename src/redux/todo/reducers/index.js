import { 
  ADD_TODO, 
  TOGGLE_TODO, 
  SET_VISIBILITY_FILTER
} from '../types'

import { VisibilityFilters } from '../actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [ 
          ...state.todos,
          {
            ...payload,
            completed: false
          }
        ]
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === payload)
            return {
              ...todo,
              completed: !todo.completed
            }
          return todo
        })
      }
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: payload
      }
    default:
      return state
  }
}