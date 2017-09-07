import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ListComponent from './ListComponent'

class SearchBooks extends Component {

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  state = {
    searchResults:[]
  }

  updateQuery = (query) => {
    query = query.trim()
    if(query) {
      this.props.onSearch(query.trim()).then((response) => {
        this.setState(state => ({searchResults: response }))
      })
    } else {
      this.setState(state => ({searchResults: [] }))
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListComponent
            books={this.state.searchResults}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
