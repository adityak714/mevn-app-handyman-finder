<template>
  <b-navbar toggleable="lg" type="dark" variant="info">

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
            <a data-v-280d9330="" v-on:click="toMyRequests /*To be done*/" aria-current="page" class="link router-link-exact-active router-link-active">
              <p data-v-280d9330=""><strong>My Requests</strong></p>
            </a>
          </b-nav-item>
          <b-nav-item>
            <a data-v-280d9330="" v-on:click="toMyRequests /*To be done*/" aria-current="page" class="link router-link-exact-active router-link-active">
              <p data-v-280d9330=""><strong>My Requests</strong></p>
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
          -->

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
    toProfile() {
      this.id = this.$route.params.accountId
      this.$router.push(`/account/profile/${this.id}`)
    },
    toMyRequests() {

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
    color: black;
}

.full-logo{
    cursor: pointer;
    display: flex;
    align-self: center;
    width: 300px;
    height: 65px;
    background-image: url("../assets/full-logo.png");
    background-size: 300px 65px;
    border: 0;
}

a.link, .header a.link p {
    cursor: pointer;
    display: block;
    margin: 10px 20px 10px 20px;
    font-size: 1.3rem;
    color: rgba(170, 0, 0, 0.7);
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
  width: 100%;
}

html body {
    background-color: white;
}

.bg-info {
  background-color: white !important;
}

button#collapse {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='50' height='35' viewBox='0 0 30 30'%3e%3cpath stroke='black' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

span {
  color: black;
}

.left-header {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.navbar {
  width: 100%;
}

@media only screen and (max-width: 992px) {
  .full-logo {
    background-image: url("../assets/handymanlogomobile.png");
    background-size: 65px 65px;
    background-repeat: no-repeat;
  }
}

</style>
