<template>
  <div>
    <form class="login-form" @submit.prevent="signInSubmit">
      <div class="row">
        <div class="col-lg-12">
          <div class="form-group position-relative">
            <label>Your Email <span class="text-danger">*</span></label>
            <input type="email" class="form-control" placeholder="Email" name="email" required=""  autocomplete="off"
            v-model="userCredentials.email">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group position-relative">
            <label>Password <span class="text-danger">*</span></label>
            <input type="password" class="form-control" placeholder="Password" required=""  autocomplete="off"
            v-model="userCredentials.password">
          </div>
        </div>
        <div class="col-lg-12 mb-0">
          <button class="btn btn-info w-100">Sign in</button>
        </div>
        <div class="mx-auto text-center">
          <p class="mb-0 mt-3"><small class="text-dark mr-2">Doesn't have an account ?</small> <a href="" @click.prevent="handleSignUpClick" class="text-dark fw-bold">Sign Up here</a></p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      userCredentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signInSubmit () {
      this.$emit('signInSubmit', this.userCredentials)
      this.userCredentials.email = ''
      this.userCredentials.password = ''
    },
    handleSignUpClick () {
      this.$emit('signUpClick')
    }
  }
}
</script>

<style>
</style>
