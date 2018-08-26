import React, { Component } from 'react'
import { Link } from 'react-router-dom'


 class Book extends Component {

nameShelf(shelf) {
    // change 'currentlyReading' to 'Currently Reading'
      return (shelf.charAt(0).toUpperCase() + shelf.slice(1).replace(/([A-Z])/g, ' $1')).replace(' To ', ' to ')
}

  render() {
    
    const url = (this.props.book.imageLinks) ? this.props.book.imageLinks.thumbnail : false
    const authors = (this.props.book.authors) ? this.props.book.authors : false
    const shelf = (this.props.book.shelf) ? this.props.book.shelf : false
   
     return (
      <div className="book">
        <div className="book-top">
          {url ?
            (<div className="book-cover"
              style={{ backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
            ) : (<div className="book-cover"></div>)
          }
          <div className="book-shelf-changer">
            <select
              onChange={(e) => (this.props.moveBook(this.props.book, e.target.value))}
              defaultValue="move"
            >
              <option value="move" disabled >Move to...</option>
              {this.props.book.shelf !== 'currentlyReading' && (
                <option value="currentlyReading">Currently Reading</option>
              )}
              {this.props.book.shelf !== 'wantToRead' && (
                <option value="wantToRead">Want to Read</option>
              )}
              {this.props.book.shelf !== 'read' && (
                <option value="read">Read</option>
              )}
              { shelf && (
                <option value="bin">Bin</option>
              )}
              </select>
              </div>
        </div>
        <div className="book-title">
          {this.props.book.title}
        </div>
        { authors ?
          (<ul className="book-authors">
            {this.props.book.authors.map((author) => (
              <li key={author}>
                {author}
              </li>
            ))}</ul>
          ) : (<div className="book-authors">No author</div>)
        }
          { this.props.sorted && shelf &&
          (
            <div>
              <div className="book-owner">
                You have it on the shelf:
              </div>
              <div className="book-shelf-name">
                {this.nameShelf(shelf)}
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
 export default Book 