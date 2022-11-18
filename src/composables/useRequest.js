import { ref } from 'vue'
import { useHttp } from '@/composables/http/useHttp.js'
import { useStore } from '@/composables/store/useStore.js'

export function useRequest () {
  const store = useStore()
  const request = ref({ status: 0, error: null, data: null, validate: null, tipo: '' })
  const { fnAxios, fnAxiosToken, fnAxiosFile, fnAxiosTokenObj, fnAxiosTokenOps } = useHttp()

  const fnHttpToken = (metodo, ruta, data, loading) => {
    fnAxiosToken(metodo, store.getUrlApi + ruta, store.getToken.text, data, request, loading)
  }

  const fnHttpTokenObj = (metodo, ruta, data, obj, loading) => {
    fnAxiosTokenObj(metodo, store.getUrlApi + ruta, store.getToken.text, data, obj, loading)
  }

  const fnHttpTokenOps = (metodo, ruta, data, items1, items2, loading) => {
    fnAxiosTokenOps(metodo, store.getUrlApi + ruta, store.getToken.text, data, items1, items2, loading)
  }

  const fnHttpFile = (metodo, ruta, data, loading) => {
    fnAxiosFile(metodo, store.getUrlApi + ruta, store.getToken.text, data, request, loading)
  }

  const fnHttp = (metodo, ruta, data, loading) => {
    fnAxios(metodo, store.getUrlApi + ruta, data, request, loading)
  }

  const fnInicializarRequest = () => {
    request.value.status = 0
    request.value.error = null
    request.value.data = null
    request.value.validate = null
  }

  return { fnHttp, fnHttpToken, fnHttpTokenObj, fnHttpTokenOps, fnHttpFile, fnInicializarRequest, request }
}
