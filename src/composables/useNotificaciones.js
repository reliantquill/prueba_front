import { Notify } from 'quasar'

export function useNotificacion () {
  // bottom-right - top-right
  const fnError = (texto, position) => {
    Notify.create({ type: 'negative', message: texto, position: position })
  }

  const fnWarning = (texto, position) => {
    Notify.create({ type: 'warning', message: texto, position: position })
  }

  const fnSuccess = (texto, position) => {
    Notify.create({ type: 'positive', message: texto, position: position })
  }
  const fnInfo = (texto, position) => {
    Notify.create({ type: 'info', message: texto, position: position })
  }

  const fnDefault = (texto, position) => {
    Notify.create({ type: 'ongoing', message: texto, position: position })
  }

  return { fnError, fnWarning, fnSuccess, fnInfo, fnDefault }
}
