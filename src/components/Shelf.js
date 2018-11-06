import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import '../App.css';

class Shelf extends React.Component {
  render(){
    var {books, shelfType} = this.props;
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfType}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {books.length>0 && (books.map(book=>
                  <li key = {book.id}>
                    <Book
                      coverUrl ={book.imageLinks.thumbnail}
                      title = {book.title}
                      authors = {book.authors}
                    />
                  </li>
                ))
              }
          </ol>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  books: PropTypes.array,
  shelfType: PropTypes.string.isRequired
}

export default Shelf;
