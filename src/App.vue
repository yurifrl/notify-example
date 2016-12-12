<template>
  <div id="app">
    <img src="./assets/logo.png">
    <notify :notes="notes"></notify>
    <form @submit.prevent="createNotification">
      <input type="text" v-model="header">
      <input type="text" v-model="body">
      <input type="number" v-model.number="duration">
      <select v-model="level">
        <option value="warning">Warning</option>
        <option value="info">Info</option>
      </select>
      <button type="submit">New Notification</button>
    </form>
  </div>
</template>

<script>
import Notify from './components/Notify'

export default {
  name: 'app',
  components: {
    Notify
  },
  data () {
    return {
      notes: [],
      header: 'Header lorem',
      body: 'Body lorem',
      duration: 1,
      level: 'info'
    }
  },
  methods: {
    createNotification () {
      const data = {
        header: this.header,
        body: this.body,
        duration: this.duration,
        level: this.level
      }
      this.notes.push(data)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

