<template>
  <div class="notifications">
    <div v-for="(note, index) in filteredNotes" @click="dismiss(index)">
      <div :class="['note', note.level]">
        <h3>{{ note.header }}</h3>
        <p>{{ note.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Limit qtd of showing notes
// TODO: Duration defined by level
// TODO: Created visible canvas
export default {
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  methods: {
    dismiss (index) {
      clearTimeout(this.filteredNotes[index].timer)
      this.notes.splice(index, 1)
    }
  },
  computed: {
    filteredNotes () {
      return this.notes.reverse().map((note, index) => {
        const duration = note.infoDuration || 9
        if (note.level === 'info') {
          note.timer = setTimeout(() => {
            this.dismiss(index)
          }, duration * 1000)
        }

        return note
      })
    }
  },
  watch: {
    notes: function (val) {
      this.$el.scrollTop = this.$el.offsetHeight
    }
  }
}
</script>

<style lang="less" scoped>
  @border_color: #000;

  .notifications {
    position: fixed;
    bottom: 0;
    left: 0;
    overflow: auto;
    max-height: 50%;
    .note {
      border: 2px solid @border_color;
    }
  }
</style>
