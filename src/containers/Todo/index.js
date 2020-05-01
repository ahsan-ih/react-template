import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from '../../redux/todo/actions'

import styles from './Todo.module.scss'

const { 
  SHOW_ALL, 
  SHOW_ACTIVE, 
  SHOW_COMPLETED 
} = VisibilityFilters

const Todo = props => {
  const { 
    todo: { todos, visibilityFilter },
    addTodo,
    toggleTodo,
    setVisibilityFilter
  } = props

  const [input, setInput] = useState('')

  const onSubmit = e => {
    e.preventDefault()

    if (!input) return

    addTodo(input)
    setInput('')
  }

  const filterTodos = ({ completed }) => {
    switch (visibilityFilter) {
      case SHOW_ACTIVE:
        return !completed
      case SHOW_COMPLETED:
        return completed
      default:
        return true
    }
  }

  return (
    <div className="container py-4">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            className="form-control"
            value={input} 
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </form>

      <div className="mb-3">
        <div className="custom-control custom-radio custom-control-inline">
          <input 
            type="radio" 
            id="showAllRadio" 
            className="custom-control-input"
            checked={visibilityFilter === SHOW_ALL} 
            onChange={() => setVisibilityFilter(SHOW_ALL)}
          />
          <label className="custom-control-label" htmlFor="showAllRadio">Show All</label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input 
            type="radio" 
            id="showActiveRadio" 
            className="custom-control-input"
            checked={visibilityFilter === SHOW_ACTIVE} 
            onChange={() => setVisibilityFilter(SHOW_ACTIVE)}
          />
          <label className="custom-control-label" htmlFor="showActiveRadio">Show Active</label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input 
            type="radio" 
            id="showCompletedRadio" 
            className="custom-control-input"
            checked={visibilityFilter === SHOW_COMPLETED} 
            onChange={() => setVisibilityFilter(SHOW_COMPLETED)}
          />
          <label className="custom-control-label" htmlFor="showCompletedRadio">Show Completed</label>
        </div>
      </div>

      <ul className={styles.todos}>
        {todos.filter(filterTodos).map((todo, i) => (
          <li key={todo.id} className={styles.todo}>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id={`check${i}`} checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <label className={`form-check-label ${todo.completed ? styles.completed : ''}`} htmlFor={`check${i}`}>{ todo.text }</label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  addTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  todo: state.todo
})

const actionCreators = {
  addTodo,
  toggleTodo,
  setVisibilityFilter
}

export default connect(
  mapStateToProps,
  actionCreators
)(Todo)