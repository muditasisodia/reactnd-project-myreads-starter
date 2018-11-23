import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './../BooksAPI';
import '../App.css'

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: "none"};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var  newShelf = event.target.value;
    this.setState({value: newShelf});
    BooksAPI.update({id: this.props.id}, newShelf);
    this.props.handleShelfChange(this.props.book, newShelf);
  }

  render(){
    var {coverUrl, title, authors, shelfType} = this.props;
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverUrl})` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue = {shelfType} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    );
  }
}

Book.propTypes = {
  coverUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  handleShelfChange: PropTypes.func
}

Book.defaultProps = {
  coverUrl: '',
  title: '',
  authors: [],
  shelfType: "none"
};

export default Book;
