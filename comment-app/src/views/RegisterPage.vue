<template>
  <div>
    <div class="bg-overlay"></div>
    <section id="bg-register" class="vh-100">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="login_page bg-white shadow rounded p-4">
                  <div class="text-center">
                    <h4 class="mb-4 fw-bold">Register</h4>
                  </div>
                  <RegisterForm
                    @newUserRegisterSubmit="newUserRegisterSubmit"
                    @handleSignInClick="handleSignInClick"
                  ></RegisterForm>
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
import RegisterForm from '@/components/RegisterForm.vue'
export default {
  name: 'RegisterPage',
  components: {
    RegisterForm
  },
  methods: {
    newUserRegisterSubmit (newUserCredentials) {
      this.$store.dispatch('registerSubmit', newUserCredentials)
        .then((response) => {
          Swal.fire(
            'Success!',
            'Register success!',
            'success'
          )
          this.$router.push({ path: 'login' })
        })
        .catch((error) => {
          Swal.fire(
            'Opss..!',
            error.response.data.message,
            'error'
          )
        })
    },
    handleSignInClick () {
      this.$router.push({ path: 'login' })
    },
    handleHomeClick () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
#bg-register {
  background: url('@/assets/christian-wiediger-WkfDrhxDMC8-unsplash.jpg');
  background-size: cover;
  position: relative;
  background-position: center center;
}
</style>
