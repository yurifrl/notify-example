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
/* import Schema from 'js-schema' */
/* const Note = Schema({ */
/*   header: String.of(2, ''), */
/*   body: String.of(2, ''), */
/*   infoDuration: Number.min(1).below(999), */
/*   level: Array.like(['info', 'error', 'warning']) */
/* }) */

export default {
  props: {
    notes: {
      type: Array,
      required: true
      /* validator: function (value) { */
      /*   /1* return Note(value[0]) *1/ */
      /*   /1* return false *1/ */
      /* } */
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
      return this.notes.map((note, index) => {
        const duration = note.infoDuration || 9
        if (note.level === 'info') {
          note.timer = setTimeout(() => {
            this.dismiss(index)
          }, duration * 1000)
        }

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
