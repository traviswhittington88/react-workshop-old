import * as React from 'react'
import { connect, useDispatch } from 'react-redux'
import { actions } from './state/counterState'

function Counter() {
  const dispatch = useDispatch()

  function decrement() {
    dispatch(actions.decrement())
  }
  function increment() {
    dispatch(actions.increment())
  }

  return (
    <div className="space-x-3">
      <button className="button" onClick={decrement}>
        Decrement
      </button>
      <button className="button" onClick={increment}>
        Increment
      </button>
    </div>
  )
}

export default Counter
