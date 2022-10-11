<template>
    <header class="header">
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
        <b-navbar  class="navbar">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-navbar-brand>
      <img v-on:click="toHomePage" class="full-logo"/>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" id ="collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
            <a data-v-280d9330="" v-on:click="toHomePage" aria-current="page" class="link router-link-exact-active router-link-active">
              <p data-v-280d9330=""><b-icon icon="house-fill"></b-icon> <strong>Home</strong></p>
            </a>
          </b-nav-item>
          <b-nav-item>
            <a data-v-280d9330="" v-on:click="toMyRequests" aria-current="page" class="link router-link-exact-active router-link-active">
              <p data-v-280d9330=""><b-icon icon="inboxes-fill"></b-icon> <strong>My Requests</strong></p>
            </a>
          </b-nav-item>
          <b-nav-item>
            <a data-v-280d9330="" v-on:click="toFindHandyMen" aria-current="page" class="link router-link-exact-active router-link-active">
              <p data-v-280d9330=""><b-icon icon="tools"></b-icon> <strong>Find Handymen</strong></p>
            </a>
          </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class = "ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
              <div class="material-symbols-outlined"><b-icon icon="person-fill"></b-icon> </div><span v-bind:firstName='firstName' v-bind:lastName='lastName'>{{firstName}} {{lastName}}</span>
          </template>
          <b-dropdown-item v-on:click="toProfile">Profile</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
          <!--
          <b-collapse class="nav-collapse" is-nav>
              <b-navbar-nav>
                <img v-on:click="toHomePage" class="full-logo" src='../assets/full-logo.png'/>
                <div class="header-right">
                <div id="nav">
                <a data-v-280d9330="" v-on:click="toHomePage" aria-current="page" class="link router-link-exact-active router-link-active">
                  <p data-v-280d9330=""><strong>Home</strong></p>
                </a>
                <a data-v-280d9330="" v-on:click="toMyRequests /*To be done*/" aria-current="page" class="link router-link-exact-active router-link-active">
                  <p data-v-280d9330=""><strong>My Requests</strong></p>
                </a>
                <a data-v-280d9330="" v-on:click="popUpReqForm /*To be done*/" aria-current="page" class="link router-link-exact-active router-link-active">
                  <p data-v-280d9330=""><strong>Create Request</strong></p>
                </a>
                <a data-v-280d9330="" v-on:click="toFindHandymen /*To be connected (already existing)*/" aria-current="page" class="link router-link-exact-active router-link-active">
                  <p data-v-280d9330=""><strong>Find Handymen</strong></p>
                </a>
                </div>
                </div>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <template #button-content>
                      <div class="material-symbols-outlined">person</div><span v-bind:firstName='firstName' v-bind:lastName='lastName'>{{firstName}} {{lastName}}</span>
                  </template>
                  <b-dropdown-item v-on:click="toProfile">Profile</b-dropdown-item>
                  <b-dropdown-item v-on:click="logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-collapse>
        </b-navbar>
      </div>
    </header>
</template>
<script>
export default {
  name: 'Header',
  props: ['firstName', 'lastName', 'userId'],
  data() {
    return {
      id: ''
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
    toHomePage() {
      this.id = this.$route.params.accountId
      this.$router.push(`/account/${this.id}`)
    },
    toMyRequests() {
      this.id = this.$route.params.accountId
      this.$router.push(`/account/requests/${this.id}`)
    },
    toProfile() {
      this.id = this.$route.params.accountId
      this.$router.push(`/account/profile/${this.id}`)
    },
    toFindHandyMen() {
      this.id = this.$route.params.accountId
      this.$emit('findHandy', true)
      this.$router.push(`/account/findhandymen/${this.id}`)
    },
    mounted() {
      // console.log(userId)
    }
  }
}
</script>
<style scoped>
.material-symbols-outlined {
    display: block;
    padding-top: 10px;
}
.full-logo{
    display: flex;
    align-self: center;
    width: 300px;
    height: 65px;
    transform: rotate(0.8deg);
    padding-right: 20px;
}
.header {
    background-color: white;
}
.header a.link, .header a.link p {
    display: block;
    margin: 10px 20px 10px 20px;
    font-size: 1.3rem;
    color: rgba(100, 0, 0, 0.6)
}

#nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-right{
  display: flex;
  align-items: center;
  justify-content: center;
}
.testrow {
    padding-top: 50px;
  background-color: green;
  height: 1000px;
}
</style>
