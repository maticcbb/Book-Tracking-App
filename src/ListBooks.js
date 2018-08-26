import React from 'react'
import Book from './Book'

 function ListBooks (props) {
 
    if(props.listBooks && props.listBooks.length > 0)
      return (
        <ol className="books-grid">
          {props.listBooks.map((book) => (
            <li key={book.id}>
              <Book book={book}
                moveBook={props.moveBook}
                sorted={true}
              />
            </li>
          ))}
        </ol>
      )
    else
      return (<div><h1>Nothing found</h1></div>)
}
 export default ListBooks