import React, { Component } from 'react'
 

class ListShelf extends Component {
  render() {

return (

 <div className="list-books-content">
        <ul className="bookshelf">
          {this.props.myReads.map((shelf, index) => (
            <li key={index}>
              <h2 className="bookshelf-title">
                {shelf.bookshelf_title}
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelf.books.map((book) => (
                    <li key={book.title}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            backgroundImage: `url(${book.cover})`
                            }}>
                          </div>
                         </div>
                        <div className="book-title">
                          {book.title}
                        </div>
                        <div className="book-authors">
                          {book.author}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
      </div>

       )
  }
}
 export default ListShelf