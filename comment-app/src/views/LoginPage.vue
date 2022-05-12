<template>
  <div>
    <div class="bg-overlay"></div>
    <section id="bg-login" class="vh-100">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6">
                <div class="login-page bg-white shadow rounded p-4">
                  <div class="text-center">
                    <h3 class="fw-bold">Login</h3>
                    <p class="mb-3">Hello, glad to see you again! </p>
                  </div>
                  <LoginForm
                    @signInSubmit="signInSubmit"
                    @signUpClick="handleSignUpClick"
                  ></LoginForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
  methods: {
    signInSubmit (userCredentials) {
      this.$store.dispatch('signInSubmit', userCredentials)
        .then((response) => {
          if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token)
            Swal.fire(
              'Success!',
              'Login success!',
              'success'
            )
            this.$router.push({ name: 'CommentPage' })
          }
        })
        .catch((error) => {
          Swal.fire(
            'Opss..!',
            error.response.data.message,
            'error'
          )
        })
    },
    handleSignUpClick () {
      this.$router.push({ path: 'register' })
    }
  }
}
</script>

<style>
#bg-login {
  background: url('@/assets/christian-wiediger-WkfDrhxDMC8-unsplash.jpg');
  background-size: cover;
  position: relative;
  background-position: center center;
}
</style>
