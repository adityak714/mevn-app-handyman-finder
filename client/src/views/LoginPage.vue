<template>
    <!----- Header -->
<div class="home-page">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
    <Header/>
    <b-row>
    <b-container fluid>
        <div class="main-container">
          <b-row>
            <b-col align-self="center">
              <b-alert dismissible v-model="signedUp" variant="success">
                  <p> Account created. Please Log in. </p>
              </b-alert>
              <div class = "information-container">
                <SignInBox/>
              </div>
            </b-col>
          </b-row>
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
      signedUp: false
    }
  },
  components: {
    SignInBox,
    Header
  },
  methods: {
    signInPrompt() {
      this.signedUp = true
      setTimeout(() => { this.signedUp = false }, 3000)
      // Need to show this as confirmation that acc is created, and request user to log in.
    }
  }
}
</script>

<style>

html{
  width: 100%;
  height: 100%;
}

.main-container {
  background-image: linear-gradient(to bottom right, rgba(222, 46, 23, 0.5), rgba(159, 16, 8, 0.7));
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
    box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(0, 0, 0, 0.1),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
}

</style>
