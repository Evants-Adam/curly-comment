<template>
  <div>
    <form class="register-form" @submit.prevent="newUserRegisterSubmit">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Your Username <span class="text-danger">*</span></label>
            <input type="text" class="form-control" placeholder="Username" required=""
            v-model="newUser.username">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Your Email <span class="text-danger">*</span></label>
            <input type="email" class="form-control" placeholder="Email" required=""
            v-model="newUser.email">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Password <span class="text-danger">*</span></label>
            <input type="password" class="form-control" placeholder="Password" required=""
            v-model="newUser.password">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label>Confirm Password <span class="text-danger">*</span></label>
            <input type="password" class="form-control" placeholder="Password" required=""
            v-model="newUser.confirmPassword">
            <label id="confirm-password" v-if="newUser.password !== newUser.confirmPassword">Password does not match!</label>
            <label id="confirm-password-true" v-if="newUser.confirmPassword.length >= 1 &&newUser.password === newUser.confirmPassword">Password match!</label>
          </div>
        </div>
        <div class="col-md-12">
          <button class="btn btn-info w-100">Register</button>
        </div>
        <div class="mx-auto text-center">
          <p class="mb-0 mt-3"><small class="text-dark mr-2">Already have an account ?</small> <a href="" @click.prevent="handleSignInLinkClick" class="text-dark fw-bold">Sign in</a></p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'RegisterForm',
  data () {
    return {
      newUser: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    newUserRegisterSubmit () {
      if (this.newUser.password === this.newUser.confirmPassword) {
        this.$emit('newUserRegisterSubmit', {
          username: this.newUser.username,
          email: this.newUser.email,
          password: this.newUser.password
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password does not match, please check again.'
        })
      }
    },
    handleSignInLinkClick () {
      this.$emit('handleSignInClick')
    }
  }
}
</script>

<style>
  #confirm-password {
    color: red;
  }

  #confirm-password-true {
    color: green;
  }
</style>
