import Vue from 'vue'
import Notify from 'src/components/Notify.vue'

// helper function that mounts and returns the rendered text
const getRenderedText = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el.textContent
}

describe('Notify.vue', () => {
  it('should render correct contents', () => {
    const notes = [
      {
        header: 'Header lorem',
        body: 'Body lorem',
        level: 'info'
      }
    ]

    expect(getRenderedText(Notify, {
      notes: notes
    })).to.equal('Header lorem Body lorem')
  })

  it('should validate that the info element leave the screen', done => {
    const notes = [
      {
        header: 'header1',
        body: 'body1',
        level: 'info',
        infoDuration: 1
      },
      {
        header: 'header2',
        body: 'body2',
        level: 'error'
      }
    ]

    const vm = new Vue({
      template: '<div><notify :notes="notes"></notify></div>',
      data: function () { return { notes: notes } },
      components: { notify: Notify }
    }).$mount()

    expect(vm.$el.textContent).to.equal('header2 body2header1 body1')

    setTimeout(() => {
      expect(vm.$el.textContent).to.equal('header2 body2')
      done()
    }, 300)
  })
})
