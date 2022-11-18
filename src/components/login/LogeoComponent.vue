<template>
<q-card>
<div class="q-pa-lg">
  <div class="row">
    <div class="col-12 text-center">
      <q-icon :color="colores.principal" name="mdi-account-circle" size="100px" />
      <br>
    </div>
  </div>
  <q-form ref="myForm" greedy>
    <div class="row">
      <div class="col-12">
        <q-input :color="colores.principal" v-model="form.email" ref="refEmail"  v-on:keyup.enter="fnEnterLogin('email')" :rules="[rules.requerido, rules.email]" autofocus lazy-rules label="USUARIO *">
          <template v-slot:prepend>
            <q-icon name="mdi-email" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <q-input :color="colores.principal" v-model="form.password" ref="refPassword" v-on:keyup.enter="fnValidar" :rules="[rules.requerido]" lazy-rules label="PASSWORD *" :type="isPwd ? 'password' : 'text'">
            <template v-slot:prepend> <q-icon name="mdi-lock" /> </template>
            <template v-slot:append>  <q-icon :name="isPwd ? 'mdi-eye-off' : 'mdi-eye'" class="cursor-pointer" @click="isPwd = !isPwd"/> </template>
        </q-input>
      </div>
    </div>
    <div class="q-pa-xs"></div>
    <div class="row">
      <div class="col-12 text-right">
        <q-btn flat size="sm" label="OLVIDASTE TU PASSWORD?" />
      </div>
    </div>
    <div class="q-pa-md"></div>
    <div class="row">
      <div class="col-12">
        <q-btn @click="fnValidar" :color="colores.principal" class="full-width" label="ACEPTAR"/>
      </div>
    </div>
  </q-form>
  <mensajesComponent :dialogMsg="dialogoMsg"></mensajesComponent>
</div>
</q-card>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { useStore } from '@/composables/store/useStore.js'
import { useUserLogin } from '@/composables/user/useUser.js'
import { useUserLoginFocus } from '@/composables/user/useUserFocus.js'
import { useDialogo } from '@/composables/useDialogos.js'

export default defineComponent({
  name: 'logeoComponent',
  components: {
    mensajesComponent: defineAsyncComponent(() => import('@/components/widgets/mensajesComponent.vue'))
  },
  setup (props, context) {
    const store = useStore()
    const colores = store.getColores
    const rules = store.getRules
    const isPwd = ref(true)
    const { dialogoMsg } = useDialogo()

    const { refEmail, refPassword, fnEnterLogin } = useUserLoginFocus()
    const { myForm, form, fnValidar } = useUserLogin(dialogoMsg)
    return { fnEnterLogin, fnValidar, myForm, form, dialogoMsg, colores, rules, isPwd, refEmail, refPassword }
  }
})
</script>
