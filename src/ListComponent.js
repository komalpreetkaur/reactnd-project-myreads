import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ListComponent extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  handleChange(targetValue, book) {
    book.shelf = targetValue
    this.props.onChangeShelf(book)
  }

  render() {

    const {books} = this.props

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`
                }}>
                </div>
                <div className="book-shelf-changer">
                  <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => {
                    this.handleChange(event.target.value, book)
                  }}>
                    <option value="moveTo" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {book.authors ? book.authors.map((author) => (
                <div key={author} className="book-authors">{author}</div>
              )) : <div></div>}
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default ListComponent
