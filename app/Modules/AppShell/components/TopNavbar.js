import React from 'react'
import { Link } from 'react-router'
import TestRPCProvider from 'Data/Providers/TestRPCProvider'
import Spinner from 'Elements/Spinner'

import Styles from './TopNavbar.css'

class TopNavbar extends React.PureComponent {

  componentDidMount () {
    this.props.appGetBlockChainState()
  }

  _handleStopMining = (e) => {
    this.props.appStopMining()
  }

  _handleStartMining = (e) => {
    this.props.appStartMining()
  }

  _handleForceMine = (e) => {
    this.props.appForceMine()
  }

  _handleMakeSnapshot = (e) => {
    this.props.appMakeSnapshot()
  }

  _handleRevertSnapshot = (e) => {
    this.props.appRevertSnapshot(this.props.testRpcState.snapshots.length)
  }

  _renderSnapshotControls = () => {
    const { snapshots } = this.props.testRpcState
    const currentSnapshotId = snapshots.length
    const hasSnapshots = currentSnapshotId > 0
    const firstSnapshot = currentSnapshotId === 1

    return (
      hasSnapshots
      ? <button className={Styles.MiningBtn}
          onClick={this._handleRevertSnapshot}
          disabled={snapshots.length === 0}
        >
          { firstSnapshot ? `REVERT TO BASE` : `REVERT TO SNAPSHOT #${currentSnapshotId - 1}` }
        </button>
      : null
    )
  }

  _renderMiningTime = () => {
    if (this.props.testRpcState.blocktime !== 'Automining') {
      return `${this.props.testRpcState.blocktime} (SEC)`
    } else {
      return 'Automining'
    }
  }

  _renderMiningButtonText = () => {
    if (this.props.testRpcState.blocktime !== 'Automining') {
      return `MINING`
    } else {
      return 'AUTOMINING'
    }
  }

  render () {
    const { isMining, blockNumber, blocktime, gasPrice, snapshots } = this.props.testRpcState
    const miningPaused = !isMining
    const currentSnapshotId = snapshots.length

    if (!this.props.testRpcState.testRpcServerRunning) {
      return <div></div>
    }

    return (
      <nav className={Styles.Nav}>
        <main className={Styles.Main}>
          <Link to="/dashboard" activeClassName={Styles.Active}>Accounts</Link>
          <Link to="/block_explorer" activeClassName={Styles.Active}>Blocks</Link>
          <Link to="/block_explorer" activeClassName={Styles.Active}>Transactions</Link>
          <Link to="/repl" activeClassName={Styles.Active}>Console</Link>
          <Link to="/config" activeClassName={Styles.Active}>Settings</Link>
        </main>
        <footer className={Styles.Footer}>
          <div>
            <h4>CURRENT BLOCK NUMBER</h4>
            <span>{blockNumber}</span>
          </div>
          <div>
            <h4>BLOCK INTERVAL TIME</h4>
            <span>{this._renderMiningTime()}</span>
          </div>
          <div>
            <h4>GAS PRICE / LIMIT</h4>
            <span>{gasPrice} / {this.props.testRpcState.gasLimit}</span>
          </div>
          <div>
            <h4>MINING CONTROLS</h4>
            {
              this.props.testRpcState.isMining
              ?
                <button className={Styles.MiningBtn} disabled={!this.props.testRpcState.isMining} onClick={this._handleStopMining}>Stop {this._renderMiningButtonText()}</button>
              :
                <button className={Styles.MiningBtn} disabled={this.props.testRpcState.isMining} onClick={this._handleStartMining}>Start {this._renderMiningButtonText()}</button>
            }
            { miningPaused ? <button className={Styles.MiningBtn} onClick={this._handleForceMine}>Force Mine</button> : null }
            { miningPaused ? <button className={Styles.MiningBtn} onClick={this._handleMakeSnapshot}>TAKE SNAPSHOT #{currentSnapshotId + 1}</button> : null }
            { miningPaused ? this._renderSnapshotControls() : null }
            { !miningPaused
              ? <div className={Styles.MiningStatus}><Spinner width={'30px'} height={'30px'} /><span>Mining</span></div>
              : null
            }
          </div>
        </footer>
      </nav>
    )
  }

}

export default TestRPCProvider(TopNavbar)
