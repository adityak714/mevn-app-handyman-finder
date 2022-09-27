<template>
    <div class = "web-container">
      <b-row class = "container">
        <b-col cols = "9" class="left-container">
            <div class = "information-container">
              <SignInBox v-on:signIn='login'/>
            </div>
        </b-col>
      <b-col cols = "3" class="right-container" style="background-color:green">Hola buenas</b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import SignInBox from '../components/signIn.vue'

export default {
  name: 'login',
  data() {
    return {
      loggedIn: false
    }
  },
  components: {
    SignInBox
  },
  methods: {
    login() {
      this.loggedIn = true
      this.$router.push('/profile')
    }
  }
}
</script>

<style>

html{
  width: 100%;
  height: 100%;
}

.web-container{
    background-color: #EFEFEF52;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.container {
    min-height: 600px;
}

input {
    all: unset;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
}

.left-container {
  background: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.right-container {
  background: #3BBB85;
}

.left-container {
    background-color: #FFFFFF;
}
</style>
