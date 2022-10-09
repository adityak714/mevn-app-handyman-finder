<template>
    <div>
        <iframe
            width="350"
            height="350"
            frameborder="0" style="min-width: 200px; min-height: 200px; border-radius: 20px; margin-top: 20px;"
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
