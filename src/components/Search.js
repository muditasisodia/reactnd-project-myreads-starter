import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './../BooksAPI';
import '../App.css'

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var query =  e.target.value;
    this.setState({query: query});
    BooksAPI.search(e.target.value).then(data =>
      this.setState({ books: query === "" ? "" : data })
    );
  }

  handleShelfChange(){

  }

  render(){
    var shelfType, coverUrl;
    var {shelfBooks} = this.props;
    return(<div className="search-books">
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
          <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.value}
            onChange={this.handleChange}
          />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books.length>0 && this.state.books!=="" ? (this.state.books.map(book=> {

            shelfBooks.forEach(shelfBook => {
              if(shelfBook.id === book.id){
                shelfType = shelfBook.shelf;
              }
              else{
                shelfType = book.shelf;
              }
            }
          );

            return (
              <li key = {book.id}>
                <Book
                  coverUrl ={book.imageLinks ? book.imageLinks.thumbnail : ""}
                  title = {book.title}
                  authors = {book.authors}
                  id = {book.id}
                  shelfType = {shelfType}
                />
              </li>);
                }
            )): null
          }
        </ol>
      </div>
    </div>);
  }
}

export default Search;
