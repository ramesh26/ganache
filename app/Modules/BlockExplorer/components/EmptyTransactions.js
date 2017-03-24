import React, { Component } from 'react'

import Styles from './BlockExplorer.css'

export default class EmptyTransactions extends Component {
  render () {
    return (
      <div className={Styles.EmptyTransactions}>
        <p>No transactions have occured.</p>
      </div>
    )
  }
}

