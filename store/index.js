export const state = () => ({
  notification: false,
  notificationType: '',
  notificationMessage: ''
})

export const mutations = {
  SET_MESSAGE: (state, payload) => {
    state.notification = true
    state.notificationMessage = payload.message
    state.notificationType = payload.success ? 'success' : 'error'
  },
  CLOSE_NOTIFICATION: state => {
    state.notification = false
    state.notificationMessage = ''
  }
}

export const actions = {
  notify: ({ commit }, payload) => {
    if (!payload.success) {
      commit('SET_MESSAGE', payload)
      return
    }
    if (payload.errors) {
      const obj = payload.errors
      const errors = []
      Object.keys(obj).forEach(key => {
        errors.push(obj[key])
      })
      commit('SET_MESSAGE', { success: false, message: errors.join(', ') })
    } else {
      commit('SET_MESSAGE', { success: true, message: payload.message })
    }
  }
}
