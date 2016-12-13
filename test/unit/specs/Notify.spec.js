import Vue from 'vue'
import Notify from 'src/components/Notify.vue'

// helper function that mounts and returns the rendered text
const vmBuilder = Vue => components => propsData => {
  return new Vue({
    template: '<div><notify :notes="notes"></notify></div>',
    data: function () { return propsData },
    components: components
  })
}

const getVm = vmBuilder(Vue)({ notify: Notify })

describe('Notify.vue elements structure', () => {
  it('should render correct contents', () => {
    const notes = [
      {
        header: 'Header lorem',
        body: 'Body lorem',
        level: 'warning'
      }
    ]
    const vm = getVm({ notes: notes }).$mount()

    expect(vm.$el.querySelector('.notifications .warning h3').textContent).to.equal('Header lorem')
    expect(vm.$el.querySelector('.notifications .warning p').textContent).to.equal('Body lorem')
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

    const vm = getVm({ notes: notes }).$mount()

    expect(vm.$el.querySelector('.notifications .error h3').textContent).to.equal('header2')
    expect(vm.$el.querySelector('.notifications .info h3').textContent).to.equal('header1')

    setTimeout(() => {
      expect(vm.$el.querySelector('.notifications .info h3')).to.equal(null)
      done()
    }, 300)
  })
})

// No selector
describe('Notify.vue page content', () => {
  it('should render correct contents', () => {
    const notes = [
      {
        header: 'Header lorem',
        body: 'Body lorem',
        level: 'warning'
      }
    ]
    const vm = getVm({ notes: notes }).$mount()

    expect(vm.$el.textContent).to.equal('Header lorem Body lorem')
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

    const vm = getVm({ notes: notes }).$mount()

    expect(vm.$el.textContent).to.equal('header2 body2header1 body1')

    setTimeout(() => {
      expect(vm.$el.textContent).to.equal('header2 body2')
      done()
    }, 300)
  })
})

