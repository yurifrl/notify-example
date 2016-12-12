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
export default {
  name: 'hello',
  props: {
    notes: {
      type: Array
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
      // TODO: Limit qtd of showing notes
      // TODO: Duration defined by level
      // TODO: Created visible canvas
      return this.notes.map((note, index) => {
        note.timer = setTimeout(() => this.dismiss(index), note.duration * 1000)
        return note
      })
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
    .note {
      border: 2px solid @border_color;
    }
  }
</style>
