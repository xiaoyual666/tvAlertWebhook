import * as types from './mutation-types'

export const setAlertHandlingState = ({commit}, payload) => {
  commit(types.UPDATE_ALERT_HANDLING_STATE, payload)
}
