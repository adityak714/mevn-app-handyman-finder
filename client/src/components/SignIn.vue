<template>
  <div id="login-page">
    <p class="sign-in">Log In To Your Account</p>
    <form class="sign-in-form" id="email">
        <input type='email' v-model="email" placeholder='Email'>
    </form>
    <form class="sign-in-form" id="password">
        <input type='password' v-model="password" placeholder='Password'>
    </form>
    <a href=''><p class="forgot-password"><u>Forgot your password?</u></p></a>
    <div class = "sign-in-btn-container">
        <button class="sign-in-btn" @click="signIn">Sign In</button>
      </b-col>
    </b-row>
    <b-modal id="field-empty" title="Incomplete">
          <p class="my-4">Please fill in all fields</p>
    </b-modal>
    <b-modal id="wrong-details" title="Wrong Password">
          <p class="my-4">Invalid Username or Password.</p>
    </b-modal>
  </div>
</template>

<script>
import { Api } from '../Api'
import { bus } from '../main'
// eslint-disable-next-line indent
export default {
  name: 'SignInBox',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      // eslint-disable-next-line no-unused-vars
      if (this.email === '' || this.password === '') {
        this.$bvModal.show('field-empty')
      } else {
        const auth = { email: this.email, password: this.password }
        Api.post('/auth/signin', auth)
          .then(response => {
            if (response.status === 200) {
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('user', response.data)
            }
            this.$router.push(`/account/${response.data._id}`)
          })
          .catch((err) => {
            if (err.response.status === 401 || err.response.status === 404) {
              this.$bvModal.show('wrong-details')
            } else {
              console.log(err)
            }
          })
      }
    }
  }
}
</script>

<style scoped>
div#login-page {
  width: 100%;
  height: 100%;
}

.sign-in {
    font-size: 30px;
}

.information-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-height: 400px;
}

.sign-in-form {
    min-height: 35px;
    border-radius: 20px;
    margin: 10px;
    align-items: center;
    display: flex;
    background-color: rgba(100, 0, 0, 0.4);
    color: black;
}

.right-container {
    background-color: rgba(100, 0, 0, 0.4);
}

.sign-in-btn {
    border-radius: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
    border: 1px solid rgba(100, 0, 0, 0.4);
    color: black;
    background-color: white;
}

.sign-in-btn:hover {
    border-radius: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 40px;
    border: none;
    color: white;
    background-color:rgba(100, 0, 0, 0.4);
}
</style>
