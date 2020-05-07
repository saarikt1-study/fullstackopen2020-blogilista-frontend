import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let updateBlog

  beforeEach(() => {
    const blog = {
      title: 'One of the best blogs in the world',
      author: 'Kalle Paatalo',
      url: 'www.asdfasdfasdf.fi',
      likes: 3
    }

    updateBlog = jest.fn()

    component = render(
      <Blog blog={blog} updateBlog={updateBlog} />
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

  test('after clicking the button -show details- the details are shown', () => {
    const button = component.getByText('View details')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
  })

  test('two clicks on -like- button fire two events', () => {
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
