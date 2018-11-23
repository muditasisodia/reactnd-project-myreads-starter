import React from 'react';
import { Link, Route } from 'react-router-dom';
import Shelf from './components/Shelf';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then( (books) =>
      this.setState({books}, ()=>console.log(books))
    )
  }

  handleShelfChange = (bookID, newShelf) => {

    var oldBooks = this.state.books;

    var newBooks = oldBooks.map(book => {
      if(book.id===bookID){
        book.shelf = newShelf;
      }
      return book;
    });

    this.setState({books: newBooks});
  }

  render() {

    const shelfTypes = ["Currently Reading", "Want To Read", "Read"];
    const checkShelf = ["currentlyReading", "wantToRead", "read"];

    return (
      <div className="app">
        <Route exact path="/search" render={()=> (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to = "/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />

        <Route exact path = "/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfTypes.map((shelfName, i) =>
                  <Shelf
                    books = {this.state.books.filter((book) => book.shelf === checkShelf[i])}
                    shelfType = {checkShelf[i]}
                    shelfName = {shelfName}
                    key = {checkShelf[i]}
                    handleShelfChange = {this.handleShelfChange}
                  />
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to = "/search">Add a book</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
