import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount() {
    this.getAllBooks()
  }

  updateSearchResults = (searchResults) => {
    this.setState(state => ({
      searchResults: searchResults
    }))
  }

  updateBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b)=>b.id !== book.id).concat([book])
    }))
    BooksAPI.update(book, book.shelf)
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => ({
        books: books
      }))
    })
  }

  searchBooks = (query) => {
    const {books} = this.state
    let searchResults = []
      return (
        BooksAPI.search(query, 20).then((results) => {
        if(results.length > 0){
          results.forEach(function(element) {
            let bookExists = books.filter((b)=>b.id === element.id)
            if(bookExists.length > 0) {
              element.shelf = bookExists[0].shelf
            }
            searchResults.push(element)
          })
        }
        return searchResults
      })
    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks
            onChangeShelf={this.updateBook}
            onSearch={this.searchBooks}
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
