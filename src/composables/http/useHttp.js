import axios from 'axios'

export function useHttp () {
  const fnAxios = (method, pUrl, pData, request, loading) => {
    // const cancelToken = axios.CancelToken
    // const source = cancelToken.source()
    const urlroute = pUrl
    loading.value.loading = true
    axios({
      url: urlroute,
      method: method,
      data: pData
      // cancelToken: source.token
    }).then(response => {
      request.value.data = response.data
      if (response.data.status === 0) {
        request.value.error = response.data.data
      }
    }).catch(error => {
      request.value.error = error
      if (error.response.status === 422) {
        request.value.validate = error.response.data.errors
      }
    }).finally(() => {
      request.value.status = 3
      loading.value.loading = false
    })
  }

  const fnAxiosToken = (method, pUrl, pToken, pData, request, loading) => {
    const urlroute = pUrl
    loading.value.loading = true
    // const cancelToken = axios.CancelToken
    // const source = cancelToken.source()

    axios({
      url: urlroute,
      method: method,
      data: pData,
      // cancelToken: source.token,
      headers: {
        Authorization: 'Bearer ' + pToken
      }
    }).then(response => {
      request.value.data = response.data
      if (typeof response.data.status !== 'undefined' && response.data.status === 0) {
        request.value.error = response.data.data
      }
    }).catch(error => {
      request.value.error = error
      if (error.response.status === 422) {
        request.value.validate = error.response.data.errors
      }
    }).finally(() => {
      request.value.status = 3
      loading.value.loading = false
    })
  }

  const fnAxiosTokenObj = (method, pUrl, pToken, pData, request, loading) => {
    const urlroute = pUrl
    loading.loading = true
    request.data = []
    axios({
      url: urlroute,
      method: method,
      data: pData,
      // cancelToken: source.token,
      headers: {
        Authorization: 'Bearer ' + pToken
      }
    }).then(response => {
      request.data = response.data
    }).catch(error => {
      request.value.error = error
    }).finally(() => {
      loading.loading = false
    })
  }

  const fnAxiosTokenOps = (method, pUrl, pToken, pData, request1, request2, loading) => {
    const urlroute = pUrl
    loading.loading = true
    request1.data = []
    request2.data = []
    axios({
      url: urlroute,
      method: method,
      data: pData,
      // cancelToken: source.token,
      headers: {
        Authorization: 'Bearer ' + pToken
      }
    }).then(response => {
      request1.data = response.data
      request2.data = response.data
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      loading.loading = false
    })
  }

  const fnAxiosFile = (method, pUrl, pToken, pData, request, progress) => {
    progress.value.progress = 0
    progress.value.loading = true
    const urlroute = pUrl
    axios({
      url: urlroute,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + pToken
      },
      method: method,
      data: pData,
      onUploadProgress: function (e) {
        if (e.lengthComputable) {
          let percentComplete = e.loaded / e.total
          percentComplete = parseInt(percentComplete * 100)
          progress.value.progress = percentComplete
        }
      }.bind()
    }).then(response => {
      request.value.data = response.data
      if (response.data.status === 0) {
        request.value.error = response.data.data
      }
    }).catch(error => {
      request.value.error = error
      if (error.response.status === 422) {
        request.value.validate = error.response.data.errors
      }
    }).finally(() => {
      request.value.status = 3
      progress.value.loading = false
    })
  }

  const fnAxiosAuth = (method, loading, pUrl, pData, pHead, request) => {
    const urlroute = pUrl
    loading.value.loading = true
    axios({
      url: urlroute,
      method: method,
      auth: {
        username: pHead.getHeadUsuario,
        password: pHead.getHeadPassword
      },
      data: pData
    }).then(response => {
      request.value.data = response.data
      if (response.data.status === 0) {
        request.value.error = response.data.data
      }
    }).catch(error => {
      request.value.error = error
      if (error.response.status === 422) {
        request.value.validate = error.response.data.errors
      }
    }).finally(() => {
      request.value.status = 3
    })
  }

  return { fnAxios, fnAxiosFile, fnAxiosAuth, fnAxiosToken, fnAxiosTokenObj, fnAxiosTokenOps }
}
