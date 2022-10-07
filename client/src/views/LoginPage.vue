<template>
    <!----- Header -->
<div class="home-page">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
    <b-row>
        <b-col col="12">
          <div class="header-container">
              <Header :firstName="firstName" :lastName='lastName'/>
          </div>
        </b-col>
    </b-row>
    <b-row>
    <b-container fluid>
        <div class="main-container">
        <b-col cols="12">
            <div class = "information-container">
              <SignInBox v-on:signIn='login'/>
            </div>
    </b-col>
</div>
    </b-container>
    </b-row>
</div>
</template>

<script>
// @ is an alias to /src
import SignInBox from '../components/SignIn'
import Header from '../components/Header.vue'

export default {
  name: 'login',
  data() {
    return {
      loggedIn: false
    }
  },
  components: {
    SignInBox,
    Header
  },
  created() {
    this.loggedIn = true
    // this.$router.push('/account')
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
