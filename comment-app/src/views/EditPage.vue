<template>
  <div>
    <PreLoader />
    <div class="bg-overlay"></div>
    <section id="bg-login" class="vh-100">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-12 col-md-6">
                <div class="login-page bg-white shadow rounded p-4">
                  <div class="text-center">
                    <h3 class="fw-bold">Edit Quote</h3>
                  </div>
                  <VueHTMLEditor
                    @postComment="handleEditCommentSubmit"
                  ></VueHTMLEditor>
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
import PreLoader from '@/components/PreLoader.vue'
import Swal from 'sweetalert2'
import VueHTMLEditor from '@/components/VueHTMLEditor.vue'
export default {
  name: 'EditPage',
  props: ['comment'],
  components: {
    VueHTMLEditor,
    PreLoader
  },
  computed: {
    commentToEditId () {
      return this.$store.state.commentToEdit[0]._id
    }
  },
  methods: {
    handleEditCommentSubmit (data) {
      this.$store.dispatch('editComment', { ...data, id: this.commentToEditId })
        .then((data) => {
          if (data.message === 'Comment has been edited successfully') {
            Swal.fire(
              'Success!',
              data.message,
              'success'
            )
            this.$router.push({ name: 'CommentPage' })
            this.$store.commit('SET_COMMENT_TO_EDIT', [])
          } else {
            Swal.fire(
              'Opss..!',
              data.message,
              'error'
            )
          }
        })
    }
  },
  created () {
    this.$store.dispatch('getOneComment', this.$route.query.id)
      .then(() => {
        this.$nextTick(function () {
          this.$store.commit('SET_PRELOADER_STATE', true)
        })
      })
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
