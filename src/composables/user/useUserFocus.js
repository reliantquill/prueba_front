import { ref } from 'vue'

export function useUserLoginFocus () {
  const refEmail = ref(null)
  const refPassword = ref(null)

  const fnEnterLogin = (key) => {
    switch (key) {
      case 'email':
        refPassword.value.focus()
        break
    }
  }
  return { refEmail, refPassword, fnEnterLogin }
}

export function useUserFocus () {
  const refDocumento = ref(null)
  const refIdentificacion = ref(null)
  const refNombres = ref(null)
  const refApellido1 = ref(null)
  const refApellido2 = ref(null)
  const refEmail = ref(null)
  const refSexo = ref(null)
  const refRol = ref(null)
  const refTelefono = ref(null)
  const refCelular = ref(null)
  const refDireccion = ref(null)
  const refEstado = ref(null)

  const fnEnterUser = (key) => {
    switch (key) {
      case 'documento':
        refIdentificacion.value.focus()
        break
      case 'identificacion':
        refNombres.value.focus()
        break
      case 'nombres':
        refApellido1.value.focus()
        break
      case 'apellido1':
        refApellido2.value.focus()
        break
      case 'apellido2':
        refEmail.value.focus()
        break
      case 'email':
        refSexo.value.focus()
        break
      case 'sexo':
        refRol.value.focus()
        break
      case 'rol':
        refTelefono.value.focus()
        break
      case 'telefono':
        refCelular.value.focus()
        break
      case 'celular':
        refDireccion.value.focus()
        break
      case 'direccion':
        refEstado.value.focus()
        break
    }
  }
  return { fnEnterUser, refDocumento, refIdentificacion, refNombres, refApellido1, refApellido2, refEmail, refSexo, refRol, refTelefono, refCelular, refDireccion, refEstado }
}
