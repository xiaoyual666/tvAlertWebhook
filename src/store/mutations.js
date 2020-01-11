import * as types from './mutation-types'

export default {
  [types.UPDATE_ALERT_HANDLING_STATE] (state, payload) {
    state.shouldHanleAlert = payload
  }
}
