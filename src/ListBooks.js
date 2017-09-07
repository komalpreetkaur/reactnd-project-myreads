import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ListComponent from './ListComponent'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const BOOK_SHELFS = [
      {title:'Currently Reading', name: 'currentlyReading'},
      {title:'Want To Read', name: 'wantToRead'},
      {title:'Read', name: 'read'}
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {BOOK_SHELFS.map((shelf) => (
            <div key={shelf.name} className="bookshelf">
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <ListComponent
                  books={this.props.books.filter((b) => b.shelf === shelf.name)}
                  onChangeShelf={this.props.onChangeShelf}
                />
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
