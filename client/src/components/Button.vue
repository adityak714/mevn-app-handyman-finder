<template>
    <b-button class="sign-up-btn">Sign Up</b-button>
</template>
<script>
export default {
  name: 'Button'
}
</script>
<style scoped>
     .sign-up-btn {
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 30px;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
      width: 200px;
      border: none;
      color: white;
      background-color: #FBAB9C;
      cursor: pointer;
      transition: 0.3s;
  }
  .sign-up-btn:hover{
    background-color: #FFFFFF;
    color: #FBAB9C
  }
</style>
