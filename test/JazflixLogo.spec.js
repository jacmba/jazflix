import { createLocalVue, mount } from '@vue/test-utils'
import JazflixLogo from '@/components/JazflixLogo.vue'
import Vuetify from 'vuetify'

describe('JazflixLogo', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('is a Vue instance', () => {
    const wrapper = mount(JazflixLogo, { localVue, vuetify })
    expect(wrapper.vm).toBeTruthy()

    // const link = wrapper.find('.nuxt-link')
    // expect(link).toBeDefined()
  })
})
