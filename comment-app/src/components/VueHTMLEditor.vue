<template>
  <form @submit.prevent="saveContent">
    <vue-editor class="mt-2" v-model="content"  :editorToolbar="customToolbar" placeholder="Write your comment here.."></vue-editor>
    <label class="mt-2">Tags <span class="text-danger mt-2">*</span></label>
    <input type="text" class="form-control" placeholder="Insert Tags here: (Example) Food, Drinks, Tech." name="tags" required=""
    v-model="tags">
    <div class="row text-right mt-3">
      <div class="col-sm-12">
        <input type="submit" id="submit" @click.prevent="handleCancelClick" name="send" class="btn btn-warning mr-2" value="Cancel Edit" v-if="commentToEdit.length !== 0">
        <input type="submit" id="submit" name="send" class="submitBnt btn btn-primary" value="Post comment">
      </div>
    </div>
  </form>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'VueHTMLEditor',
  components: {
    VueEditor
  },
  data () {
    return {
      tags: '',
      content: '',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }],
        ['link'],
        ['clean']
      ]
    }
  },
  computed: {
    commentToEdit () {
      return this.$store.state.commentToEdit
    }
  },
  methods: {
    saveContent () {
      const data = {
        message: this.content,
        tag: this.tags
      }
      if (this.$route.name !== 'EditPage') {
        this.tags = ''
        this.content = ''
      }
      this.$emit('postComment', data)
    },
    handleCancelClick () {
      this.$store.commit('SET_COMMENT_TO_EDIT', [])
      this.$router.push({ name: 'CommentPage' })
      this.tags = ''
      this.content = ''
    }
  },
  created () {
    if (this.commentToEdit[0]) {
      this.tags = this.commentToEdit[0].tag
      this.content = this.commentToEdit[0].message
    }
  }
}
</script>

<style>
</style>
