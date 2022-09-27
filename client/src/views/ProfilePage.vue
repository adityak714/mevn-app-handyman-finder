<template>
  <div>
    <Clients v-bind:clients='clients'/>
  </div>
</template>

<script>
import { Api } from '../Api'
import Clients from '@/components/Clients.vue'

export default {
  name: 'ProfilePage',
  props: [],
  components: {
    Clients
  },
  data() {
    return {
      clients: {}
    }
  },
  created() {
    Api.get('/clients')
      .then((res) => {
        this.clients = res.data
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style>

</style>
