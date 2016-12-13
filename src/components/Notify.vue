<template>
  <div class="notifications">
    <div class="notification-icon">
      <svg viewBox="0 0 18 21"><path d="M7.01,19.01C7.01,20.11,7.9,21,9,21s1.99-0.89,1.99-1.99H7.01z M15.88,14.82V9c0-3.25-2.25-5.97-5.29-6.69V1.59 C10.59,0.71,9.88,0,9,0S7.41,0.71,7.41,1.59v0.72C4.37,3.03,2.12,5.75,2.12,9v5.82L0,16.94V18h18v-1.06L15.88,14.82z"/></svg>
    </div>
    <div v-for="(note, index) in filteredNotes">
      <div :class="['note', note.level]">
        <h3>{{ note.header }}</h3>
        <p>{{ note.body }}</p>
        <span class="close" @click="dismiss(index)">&times;</span>
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
      required: true,
      default: []
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
          }, duration * 100)
        }

        return note
      })
    }
  },
  watch: {
    notes: function (val) {
      this.$el.scrollTop = 0
    }
  }
}
</script>

<style lang="less" scoped>
  @border_color: #e2e2e2;

  .notifications {
    position: fixed;
    top: 10px;
    right: 10px;
    overflow: auto;
    max-height: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,.20);
    border-radius: 6px;
    padding: 5px 5px 0 5px;
    background-color: #ffffff;
    z-index: 1;

    .note {
      border: 1px solid @border_color;
      width: 200px;
      background-color: #ededed;
      border-radius: 4px;
      padding:  8px 5px;
      margin-bottom: 5px;
      text-align: left;
      position: relative;

      p {
        margin: 0;
      }
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 15px;
      opacity: .2;
      transition: opacity .2s ease-in-out;
      cursor: pointer;
      color: red;

      &:hover {
        opacity: 1;
      }
    }
  }

  h3 {
    font-size: 1.1em;
    margin-top: 0;
    margin-bottom: .5em;
  }

  .notification-icon {
    cursor: pointer;
    padding: 8px;
    display: block;
    text-align: right;

    svg {
      fill: #2dc17d;
      width: 15px;
    }
  }

  @media only screen and (min-width: 600px) {
    .notifications {
      top:   0;
      border-top-left-radius:  0px;
      border-top-right-radius: 0px;
    }
    .notification-icon {
      display: none;
    }
  }
</style>
