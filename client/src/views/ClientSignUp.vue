<template>
    <div>
      <b-row>
        <Header />
      </b-row>
      <b-row>
          <b-col cols = "12" class = "main-container">
            <Form />
          </b-col>
      </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import Form from '@/components/Form.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'clientSignUp',
  components: {
    Form,
    Header
  },
  data() {
    return {
      message: 'none',
      firstName: '',
      lastName: '',
      email: '',
      phonenumber: '',
      address: '',
      password: ''
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        }).catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style scoped>
  html{
    width: 100%;
    height: 100%;
  }

  .container {
      min-height: 600px;
  }
  .left-container {
    background: yellow;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .right-container {
    background-color: #0D1951;
  }
  .input{
      all: unset;
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
  }
  .left-container {
      background-color: #FFFFFF;
  }
  .information-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      min-height: 400px;
  }
  .sign-up-form {
      padding-top: 2px;
      padding-bottom: 2px;
      margin-top: 5px;
      margin-bottom: 5px;
      min-height: 35px;
      align-items: center;
      display: flex;
      background: rgba(247, 233, 118, 0.5);
      border-radius: 30px;
      color: #808080;
  }
  .first-name {
    margin-top: 2px;
    margin-bottom: 2px;
  }
  #handyman-logo{
    width: 300px;
    height: 100px;
  }
</style>
