<template>
    <header class="header">
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,0" />
        <b-navbar>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse class="nav-collapse" is-nav>
            <b-navbar-nav>
              <img class="full-logo" src='../assets/full-logo.png'/>
              <div class="header-right">
              <div id="nav">
                <router-link class="link" to="/"><p><strong>Home</strong></p></router-link>
                <router-link class="link" to="/login"><p><strong>Login</strong></p></router-link>
              </div>
              </div>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <div class="material-symbols-outlined">person</div><span>First Last</span>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </header>
</template>

<script>
export default {
  name: 'Header'
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

.header a.link, .header a.link p {
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
