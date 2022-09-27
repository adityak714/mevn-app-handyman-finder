<template>
  <div class='con'>
    <div v-for="client in clients" v-bind:key="client._id">
        <Client v-bind:client='client'/>
    </div>
  </div>
</template>

<script>
import Client from './Client.vue'

export default {
  name: 'clients',
  components: {
    Client
  },
  props: ['clients']
}
</script>

<style>

</style>
