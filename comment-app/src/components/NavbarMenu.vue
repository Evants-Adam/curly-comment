<template>
 <header id="topnav" class="defaultscroll scroll-active active scroll">
    <div class="container">
      <div class="buy-button">
        <a v-if="isLogin === false" @click.prevent="handleSignInClick" href="" class="btn btn-primary">Sign in / Sign Up</a>
        <a v-else @click.prevent="handleSignOutClick" href="" class="btn btn-primary">Sign Out</a>
      </div>
      <div id="navigation">
        <ul class="navigation-menu .collapse.navbar-collapse">
          <li>
            <a v-if="isLogin === true">Hi {{ userProfile.username }}, Welcome back!</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'NavbarMenu',
  computed: {
    isLogin () {
      if (localStorage.getItem('access_token')) return true
      else return false
    },
    userProfile () {
      return this.$store.state.userProfile
    }
  },
  methods: {
    handleSignInClick () {
      this.$router.push({ name: 'LoginPage' })
    },
    handleSignOutClick () {
      this.$store.dispatch('signOutSubmit')
      this.$router.push({ name: 'LoginPage' })
      Swal.fire(
        'Success!',
        'Sign-out success! See you later!',
        'success'
      )
    }
  }
}
</script>

<style>
</style>
