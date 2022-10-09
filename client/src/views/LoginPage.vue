<template>
    <!----- Header -->
<div class="home-page">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
    <Header/>
    <b-row>
    <b-container fluid>
        <div class="main-container">
          <b-col cols="8">
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

.main-container {
  background-color: rgba(100, 0, 0, 0.4);
  min-height: 1000px;
  display: flex;
  padding-top: 20px;
  align-items: flex-start;
  justify-content: center;
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

.information-container {
    background-color: white;
    border-radius: 30px;
    margin-top: 50px;
    padding-top: 40px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
    max-width: 700px;
}
</style>
