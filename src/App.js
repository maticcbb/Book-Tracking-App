import React from 'react'
import ListShelf from './ListShelf'
import {  } from "./ListBooks";
import * as BooksAPI from './BooksAPI'
import './App.css'



class BooksApp extends React.Component {
  constructor(props){
    super(props);
  
  state = {

    	books: [],
    	found: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
}

componentWillMount() {
  BooksAPI.getAll().then((books) => {
    this.setState({books})
  })

}

foundBooks = (frase) => {
  if (frase && frase.length > 0){
    BooksAPI.search(frase).then((found) => {
      this.setState({found})
    })
  }
}

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
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
               <ListBooks listBooks={this.state.found} />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListShelf books={this.state.books} />
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
