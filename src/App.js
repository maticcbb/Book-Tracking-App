import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import ListShelf from './ListShelf'
import ListBooks from "./ListBooks";
import * as BooksAPI from './BooksAPI'
import './App.css'



class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      found: [],
    }
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

  foundBooks = (frase) => {
    if (frase)
      BooksAPI.search(frase)
        .then((matched) => {
          return this.checkBooks(matched)
        })
        .then((checked) => {
         
          this.setState({ found : checked })
        })
        .catch((error) => {
         
          console.log(error)
          this.setState({found : []})
        })
    else
      this.setState({found : []})
  }

  moveBook = (book, shelf) => {
    console.log(book.shelf)
    
    BooksAPI.update(book, shelf)
      .then(
        BooksAPI.get(book.id).then(bu => console.log(bu.shelf)),
        BooksAPI.get(book.id).then(bu => (this.updateFound(bu))),
    
        BooksAPI.getAll()
          .then((books) => {this.setState({ books })})
          .then(console.log(this.state.books)),

        console.log("po"),
        (() => (this.state.found.length > 0 && (
                  console.log("nie pusta")
        ))),
        console.log(this.state.found.length),
    )
   
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input onChange={(event) => this.foundBooks(event.target.value)} type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
               <ListBooks
                    listBooks={this.state.found}
                    addBook={this.addBook}
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
              >Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
