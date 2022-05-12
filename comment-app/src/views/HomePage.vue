<template>
  <div>
    <PreLoader />
    <NavbarMenu />
    <section class="section mt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="section-title text-center mb-4 pb-2">
              <h4 class="title title-line">See All Comments</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-6 col-12 order-1 order-md-2">
            <div class="rounded border mt-4 p-4">
              <h5 class="text-dark"><i class="mdi mdi-comment-multiple mr-2"></i>{{ comments.length }} Comment(s)</h5>
              <CommentCard
                v-for="(comment, index) in comments" :key="index"
                :comment="comment"
                :index="index"
                @deleteCommentClick="deleteCommentClick"
                @editCommentClick="editCommentClick"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-6 col-12 order-1 order-md-2">
          <div class="rounded border p-4 mb-5">
            <h5 class="text-dark"><i class="mdi mdi-pencil mr-2"></i>Leave Your Comment Here!</h5>
            <VueHTMLEditor
              @postComment="postComment"
            ></VueHTMLEditor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import PreLoader from '@/components/PreLoader.vue'
import NavbarMenu from '@/components/NavbarMenu.vue'
import CommentCard from '@/components/CommentCard.vue'
import VueHTMLEditor from '@/components/VueHTMLEditor.vue'
export default {
  name: 'CommentPage',
  components: {
    VueHTMLEditor,
    CommentCard,
    NavbarMenu,
    PreLoader
  },
  computed: {
    comments () {
      return this.$store.state.comments
    }
  },
  methods: {
    postComment (data) {
      this.$store.dispatch('postComment', data)
        .then((data) => {
          if (data.message === 'Message cannot be empty' || data.message === 'Tag is required') {
            Swal.fire(
              'Opss..!',
              data.message,
              'error'
            )
          } else {
            Swal.fire(
              'Success!',
              'Comment successfully posted!',
              'success'
            )
          }
        })
    },
    deleteCommentClick (id) {
      this.$store.dispatch('deleteComment', id)
        .then((data) => {
          if (data.message === 'Forbidden') {
            Swal.fire(
              'Opss..!',
              data.message,
              'error'
            )
          } else {
            Swal.fire(
              'Success!',
              'Comment successfully deleted!',
              'success'
            )
          }
        })
    },
    editCommentClick (id) {
      this.$store.dispatch('getOneComment', id)
        .then(() => {
          this.$router.push({ name: 'EditPage', query: { id: id } })
        })
    }
  },
  created () {
    this.$store.commit('SET_COMMENT_TO_EDIT', [])
    this.$store.dispatch('getUserProfile')
    this.$store.dispatch('getAllComments')
      .then(() => {
        this.$nextTick(function () {
          this.$store.commit('SET_PRELOADER_STATE', true)
          this.load = true
        })
      })
  }
}
</script>

<style>
  .ps {
    height: 75%;
  }
</style>
