/* eslint no-unused-vars: "error" */

import Vue from 'vue'
import Notify from 'src/components/Notify.vue'

// helper function that mounts and returns the rendered text
const getRenderedText = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el.textContent
}

describe('Notify.vue', () => {
  // it('should render correct contents', () => {
  //   const vm = new Vue({
  //     el: document.createElement('div'),
  //     render: (h) => h(Notify)
  //   })

  //   console.log(vm.$el.querySelector('.notifications').textContent)
  //   expect(vm.$el.querySelector('.notifications').textContent)
  //     .to.equal('Welcome to Your Vue.js App')
  //   // expect(vm.$el.querySelector('.note h3').textContent)
  //   //   .to.equal('Welcome to Your Vue.js App')
  // })
  it('should render correct contents', () => {
    const notes = [
      {
        header: 'Header lorem',
        body: 'Body lorem',
        duration: 1,
        level: 'info'
      }
    ]

    expect(getRenderedText(Notify, {
      notes: notes
    })).to.equal('Header lorem Body lorem')
  })
})
