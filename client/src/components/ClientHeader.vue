<template>
    <header class="header">
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
        <b-navbar>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

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

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <div class="material-symbols-outlined">person</div><span v-bind:firstName='firstName' v-bind:lastName='lastName'>{{firstName}} {{lastName}}</span>
                </template>
                <b-dropdown-item v-on:click="toProfile">Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="logout">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
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
}

.full-logo{
    cursor: pointer;
    display: flex;
    align-self: center;
    width: 300px;
    height: 65px;
    transform: rotate(0.8deg);
    padding-right: 20px;
}

.header a.link, .header a.link p {
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
}

html body {
    background-color: white;
}
</style>
