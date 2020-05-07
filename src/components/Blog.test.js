import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'One of the best blogs in the world',
      author: 'Kalle Paatalo',
      url: 'www.asdfasdfasdf.fi',
      likes: 3
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders title and author', () => {

    expect(component.container).toHaveTextContent(
      'One of the best blogs in the world'
    )

    expect(component.container).toHaveTextContent(
      'Kalle Paatalo'
    )
  })

  test('at first the blog details are hidden', () => {
    const div = component.container.querySelector('.blogDetails')

    expect(div).toHaveStyle('display: none')
  })

})
