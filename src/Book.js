import React, { Component } from 'react'

 class Book extends Component {
  render() {
    //console.log(this.props.book)
    const url = (this.props.book.imageLinks) ? this.props.book.imageLinks.thumbnail : false
    const authors = (this.props.book.authors) ? this.props.book.authors : false
    const shelf = (this.props.book.shelf) ? this.props.book.shelf : false
    //console.log(url)
    //console.log(authors)
     return (
      <div className="book">
        <div className="book-top">
          {url ?
            (<div className="book-cover"
              style={{ backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
            ) : (<div className="book-cover"></div>)
          }
          {shelf ?
            (<div className="book-shelf-changer">
              <select>
                <option value="move" disabled>Move to...</option>
                {this.props.book.shelf !== 'currentlyReading' && (
                  <option value="currentlyReading">Currently Reading</option>
                )}
                {this.props.book.shelf !== 'wantToRead' && (
                  <option value="wantToRead">Want to Read</option>
                )}
                {this.props.book.shelf !== 'read' && (
                  <option value="read">Read</option>
                )}
                <option value="none">None</option>
              </select>
            </div>
            ) : (
              <div className="book-add">
                <a ></a>
              </div>
            )}
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
      </div>
    )
  }
}
 export default Book 