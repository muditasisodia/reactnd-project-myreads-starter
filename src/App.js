import React from 'react';
import { Link, Route } from 'react-router-dom';
import Shelf from './components/Shelf';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then( (books) =>
      this.setState({books})
    )
  }

  handleShelfChange = (book, newShelf) => {

    var found = false;

    var oldBooks = this.state.books;

    var newBooks = oldBooks.map(oldBook => {
      if(oldBook.id===book.id){
        oldBook.shelf = newShelf;
        found = true
      }
      return oldBook;
    });

    if(!found){
      book.shelf = newShelf;
      newBooks.push(book);
    }

    this.setState({books: newBooks});
  }

  render() {

    const shelfTypes = ["Currently Reading", "Want To Read", "Read"];
    const checkShelf = ["currentlyReading", "wantToRead", "read"];

    return (
      <div className="app">
        <Route exact path="/search" render={()=> (
          <Search
            shelfBooks = {this.state.books}
            handleShelfChange = {this.handleShelfChange}
          />
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
