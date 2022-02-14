import { mount } from '@vue/test-utils'
import JazflixLogo from '@/components/JazflixLogo.vue'

describe('JazflixLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(JazflixLogo)
    expect(wrapper.vm).toBeTruthy()
  })
})
