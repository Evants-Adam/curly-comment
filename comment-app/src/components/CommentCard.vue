<template>
  <div class="col-lg-12">
      <div class="grid-item-content">
        <ul class="list-inline mb-0">
          <li class="list-inline-item float-right">
            <div class="grid-fev-icon" v-if="comment.UserId === userProfile.id">
              <a href="" @click.prevent="handleEditClick" class="text-danger"><i class="mdi mdi-circle-edit-outline"></i></a>
            </div>
            <div class="grid-fev-icon" v-if="userProfile.role === 'Admin' || comment.UserId === userProfile.id">
              <a href="" @click.prevent="handleDeleteClick" class="text-danger"><i class="mdi mdi-trash-can"></i></a>
            </div>
          </li>
        </ul>
        <div class="media mt-4">
          <div class="blog-comment-img">
            <img class="d-block mx-auto rounded-pill" height="60" alt="" src="https://via.placeholder.com/400X400//88929f/5a6270C/O https://placeholder.com/">
          </div>
          <div class="media-body ml-3">
            <h6 class="mb-0"><a class="text-dark">By {{ comment.User.username }}</a></h6>
            <p class="text-muted mb-0">{{ formattedDate }}</p>
            <p class="text-muted mb-2 page-header"><span v-html="comment.message"></span></p>
            <p class="text-muted mb-1 badge badge-success">Tags: {{ comment.tag }}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
  props: ['comment'],
  computed: {
    formattedDate () {
      const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const date = new Date(parseInt(this.comment._id.substring(0, 8), 16) * 1000)
      return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}, at ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
    },
    userProfile () {
      return this.$store.state.userProfile
    }
  },
  methods: {
    handleDeleteClick () {
      this.$emit('deleteCommentClick', this.comment._id)
    },
    handleEditClick () {
      this.$emit('editCommentClick', this.comment._id)
    }
  }
}
</script>

<style>
  .page-header {
    padding-bottom: 9px;
    border-bottom: 1px solid #eee;
  }
</style>
