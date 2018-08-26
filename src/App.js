import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import ListShelf from './ListShelf'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { throttle, debounce } from "throttle-debounce"

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      found: [],
      q: ""
    }
    this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
    this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {this.setState({ books })})
      .catch((error) => {console.log(error)})
  }

  checkBooks = (toCheckBooks) => {
    return toCheckBooks.map((book) => (
      this.state.books.find(myBook => myBook.id === book.id) || book))
  }
  updateFound = (newBook) => {
    console.log("update")
    if (this.state.found.length){
          console.log("w sukanych sa")
          this.setState({found : this.state.found.map(book => (
            (book.id !== newBook.id) ? book : newBook
          ))})
    }
    return
  }

  updateBook = ( book ) => {
    // update books
    BooksAPI.getAll()
      .then(books => this.setState({books}))
    // update found if is
    if (this.state.found.length)
      BooksAPI.get(book.id)
        .then(b => (
          this.setState({found : this.state.found.map(a => (
            (a.id !== b.id) ? a : b
          ))})
        ))
  }

  foundBooks = (frase) => {
    if (frase)
      BooksAPI.search(frase)
        .then((matched) => {
          return this.checkBooks(matched)
        })
        .then((checked) => {
          //console.log(checked)
          this.setState({ found : checked })
        })
        .catch((error) => {
          // empty query test frase :'line'
          console.log(error)
          this.setState({found : []})
        })
    else
      this.setState({found : []})
  }

  moveBook = (book, shelf) => {
    //console.log(book.shelf)
    BooksAPI.update(book, shelf)
      .then( idBooksOnShelfs => this.updateBook( book) )
  }
  changeQuery = event => {
    this.setState({ q: event.target.value }, () => {
      const q = this.state.q
      if (q.length < 5) {
        this.autocompleteSearchThrottled(this.state.q)
      } else {
        this.autocompleteSearchDebounced(this.state.q)
      }
    })
  }

  autocompleteSearch = q => {
    this._fetch(q);
  }

  _fetch = frase => {

    if (frase)
      BooksAPI.search(frase)
        .then((matched) => {
          return this.checkBooks(matched)
        })
        .then((checked) => {
          //console.log(checked)
          this.setState({ found : checked })
        })
        .catch((error) => {
          // empty query test frase :'line'
          console.log(error)
          this.setState({found : []})
        })
    else
      this.setState({found : []})
  }

  render() {
    return (
      <div className="app">
      <Switch>
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to="/"
                className="close-search"
                onClick={() => this.setState({found : []})}
              >Close</Link>
              <div className="search-books-input-wrapper">
                {

                }
                <input
                  onChange={this.changeQuery}
                  type="text"
                  placeholder="Search by title or author"
                />

              </div>
            </div>
            <div className="search-books-results">
              <ListBooks
                listBooks={this.state.found}
                moveBook={this.moveBook}
              />
            </div>
          </div>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListShelf
              books={this.state.books}
              moveBook={this.moveBook}
            />
            <div className="open-search">
              <Link
                to="/search"
                onClick={() => this.setState({found : []})}
              >Add a book</Link>
            </div>
          </div>
        )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp