<template>
    <div>
        <iframe
            width="550"
            height="350"
            frameborder="0" style="border:0"
            referrerpolicy="no-referrer-when-downgrade"
            :area='region'
            :src="src"
            allowfullscreen>
        </iframe>
    </div>
</template>

<script>
export default {
  name: 'Gmap',
  props: ['region'],
  data() {
    return {
    }
  },
  computed: {
    src() {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyC4pT64-QJowJNQWUPsJwPyWkxcBdBcBUw&q=${this.region}`
    }
  }
}
</script>

<style>

</style>
