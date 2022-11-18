import CryptoJS from 'crypto-js'
// import { useStore } from '@/composables/store/useStore.js'

export function useFunciones () {
  const fnMayuscula = (str) => {
    if (str !== '') {
      str = str.toUpperCase()
      str = str.trim()
    }
    return str
  }

  const fnMinusculas = (str) => {
    if (str !== '') {
      str = str.toLowerCase()
      str = str.trim()
    }
    return str
  }

  const fnNull = (str) => {
    if (str === null) {
      str = ''
    }
    return str
  }

  const fnDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month <= 9) month = '0' + month
    if (day <= 9) day = '0' + day
    return year + '-' + month + '-' + day
  }

  const fnNow = () => {
    const h = new Date()
    let hora = h.getHours()
    let minuto = h.getMinutes()
    let segundo = h.getSeconds()

    if (hora <= 9) hora = '0' + hora
    if (minuto <= 9) minuto = '0' + minuto
    if (segundo <= 9) segundo = '0' + segundo
    return hora + ':' + minuto + ':' + segundo
  }

  const fnKey = () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    const hora = date.getHours()
    let minutos = date.getMinutes()
    let segundos = date.getSeconds()

    if (month <= 9) month = '0' + month
    if (day <= 9) day = '0' + day
    if (minutos <= 9) minutos = '0' + minutos
    if (segundos <= 9) segundos = '0' + segundos

    const ran = Math.floor(Math.random() * 100)
    const id = parseInt(year + '' + month + '' + day + '' + hora + '' + minutos + '' + segundos + '' + ran)
    return id
  }

  const fnIsNumerico = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  const fnBytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    if (i === 0) return bytes + ' ' + sizes[i]
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
  }

  const fnDateToColombia = (pfecha) => {
    if (pfecha !== '' && pfecha !== null) {
      pfecha = new Date(pfecha).toLocaleString('en-CO', { timeZone: 'America/Bogota', hour12: false })
      pfecha = this.rec_funciones_fecha_y_hora(new Date(pfecha))
    }
    return pfecha
  }

  const fnReplaceAll = (ptexto, pbuscar, preplace) => {
    const target = ptexto
    return target.split(pbuscar).join(preplace)
  }

  const fnNumberWithCommas = (x, coma) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, coma)
  }

  const fnIsCorreo = (correo) => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    let bestado
    if (reg.test(correo)) {
      bestado = true
    } else {
      bestado = false
    }
    return bestado
  }

  const fnDateRestar = (pFecha1, pFecha2) => {
    let difference = ''
    if (pFecha1 !== null && pFecha2 !== null) {
      difference = this.rec_funciones_mss_hora_minutos(new Date(pFecha1).getTime() - new Date(pFecha2).getTime())
      // console.log(new Date(difference).format('YYYY-MM-DD'))
    } else if (pFecha1 !== null && pFecha2 === null) {
      const fecha = this.rec_funciones_fecha_actual() + ' ' + this.rec_funciones_hora_actual()
      difference = this.rec_funciones_mss_hora_minutos(new Date(pFecha1).getTime() - new Date(fecha).getTime())
      // console.log(new Date(difference).format('YYYY-MM-DD'))
    }
    return difference
  }

  const fnMssTime = (mss) => {
    let h = this.rec_funciones_milisegundos_horas(mss)
    if (h >= 0) {
      h = Math.abs(this.rec_funciones_milisegundos_minutos(mss)) + ' M'
    } else {
      h = Math.abs(h) + ' H'
    }
    return h
  }

  const fnMssDays = (mss) => {
    const days = parseInt(mss / (1000 * 60 * 60 * 24))
    return days
  }

  const fnMssHours = (mss) => {
    const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    return hours
  }

  const fnMssMinutos = (mss) => {
    const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
    return minutes
  }
  const fnMssSeconds = (mss) => {
    const seconds = (mss % (1000 * 60)) / 1000
    return seconds
  }

  const fnDateToMonth = () => {
    const d = new Date()
    const numeroMes = d.getMonth() + 1
    let mes = ''
    switch (numeroMes) {
      case 1:
        mes = '01'
        break
      case 2:
        mes = '02'
        break
      case 3:
        mes = '03'
        break
      case 4:
        mes = '04'
        break
      case 5:
        mes = '05'
        break
      case 6:
        mes = '06'
        break
      case 7:
        mes = '07'
        break
      case 8:
        mes = '08'
        break
      case 9:
        mes = '09'
        break
      case 10:
        mes = '10'
        break
      case 11:
        mes = '11'
        break
      case 12:
        mes = '12'
        break
    }
    return mes
  }

  const fnMonthNumericToString = (numeroMes) => {
    let mes = ''
    switch (numeroMes) {
      case 1:
        mes = 'ENERO'
        break
      case 2:
        mes = 'FEBRERO'
        break
      case 3:
        mes = 'MARZO'
        break
      case 4:
        mes = 'ABRIL'
        break
      case 5:
        mes = 'MAYO'
        break
      case 6:
        mes = 'JUNIO'
        break
      case 7:
        mes = 'JULIO'
        break
      case 8:
        mes = 'AGOSTO'
        break
      case 9:
        mes = 'SEPTIEMBRE'
        break
      case 10:
        mes = 'OCTUBRE'
        break
      case 11:
        mes = 'NOVIEMBRE'
        break
      case 12:
        mes = 'DICIEMBRE'
        break
    }
    return mes
  }

  const fnMonthTextToString = (numeroMes) => {
    let mes = ''
    switch (numeroMes) {
      case '01':
        mes = 'ENERO'
        break
      case '02':
        mes = 'FEBRERO'
        break
      case '03':
        mes = 'MARZO'
        break
      case '04':
        mes = 'ABRIL'
        break
      case '05':
        mes = 'MAYO'
        break
      case '06':
        mes = 'JUNIO'
        break
      case '07':
        mes = 'JULIO'
        break
      case '08':
        mes = 'AGOSTO'
        break
      case '09':
        mes = 'SEPTIEMBRE'
        break
      case '10':
        mes = 'OCTUBRE'
        break
      case '11':
        mes = 'NOVIEMBRE'
        break
      case '12':
        mes = 'DICIEMBRE'
        break
    }
    return mes
  }

  const fnDateToMonthFull = () => {
    const d = new Date()
    const numeroMes = d.getMonth() + 1
    let mes = ''
    switch (numeroMes) {
      case 1:
        mes = 'ENERO'
        break
      case 2:
        mes = 'FEBRERO'
        break
      case 3:
        mes = 'MARZO'
        break
      case 4:
        mes = 'ABRIL'
        break
      case 5:
        mes = 'MAYO'
        break
      case 6:
        mes = 'JUNIO'
        break
      case 7:
        mes = 'JULIO'
        break
      case 8:
        mes = 'AGOSTO'
        break
      case 9:
        mes = 'SEPTIEMBRE'
        break
      case 10:
        mes = 'OCTUBRE'
        break
      case 11:
        mes = 'NOVIEMBRE'
        break
      case 12:
        mes = 'DICIEMBRE'
        break
    }
    return mes
  }

  const fnMonthTextToNumeric = (ptexto) => {
    let numero = '00'
    if (ptexto === 'ENERO') {
      numero = '01'
    }

    if (ptexto === 'FEBRERO') {
      numero = '02'
    }

    if (ptexto === 'MARZO') {
      numero = '03'
    }

    if (ptexto === 'ABRIL') {
      numero = '04'
    }

    if (ptexto === 'MAYO') {
      numero = '05'
    }

    if (ptexto === 'JUNIO') {
      numero = '06'
    }

    if (ptexto === 'JULIO') {
      numero = '07'
    }

    if (ptexto === 'AGOSTO') {
      numero = '08'
    }

    if (ptexto === 'SEPTIEMBRE') {
      numero = '09'
    }

    if (ptexto === 'OCTUBRE') {
      numero = '10'
    }

    if (ptexto === 'NOVIEMBRE') {
      numero = '11'
    }

    if (ptexto === 'DICIEMBRE') {
      numero = '12'
    }

    return numero
  }

  const fnEdad = (pfecha) => {
    let resultado = ''
    const birthdayArr = pfecha.split('-')
    const birthdayDate = new Date(birthdayArr[0], birthdayArr[1] - 1, birthdayArr[2])
    if (!isNaN(birthdayDate)) {
      const ageDifMs = Date.now() - birthdayDate.getTime()
      const ageDate = new Date(ageDifMs)
      resultado = Math.abs(ageDate.getUTCFullYear() - 1970)
    }
    return resultado
  }

  const fnDateToDate = (date) => {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    if (month <= 9) month = '0' + month
    if (day <= 9) day = '0' + day

    return year + '-' + month + '-' + day
  }

  const fnDayNext = () => {
    const oldDate = new Date()
    const nextday = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate() + 1)
    return fnDateToDate(nextday)
  }

  const fnJsonToString = (obj) => {
    return JSON.stringify(obj)
  }

  const fnStringToJson = (obj) => {
    return JSON.parse(obj)
  }

  const fnEncriptar = (data, pws) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), pws).toString()
  }

  const fnDescriptar = (data, pws) => {
    const bytes = CryptoJS.AES.decrypt(data, pws)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }

  return { fnJsonToString, fnStringToJson, fnMayuscula, fnMinusculas, fnNull, fnDate, fnNow, fnKey, fnIsNumerico, fnBytesToSize, fnDateToColombia, fnReplaceAll, fnNumberWithCommas, fnIsCorreo, fnDateRestar, fnMssTime, fnMssDays, fnMssHours, fnMssMinutos, fnMssSeconds, fnEdad, fnDayNext, fnMonthTextToNumeric, fnDateToMonthFull, fnMonthTextToString, fnMonthNumericToString, fnDateToMonth, fnEncriptar, fnDescriptar, fnDateToDate }
}
