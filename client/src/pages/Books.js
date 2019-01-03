import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { BookList, BookListItem } from "../components/BookList";
import { Input, TextArea, FormBtn } from "../components/Form";


class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    bookSearch: "",
    bookresults: [],
  };

  componentDidMount() {
    this.loadBooks();
    this.searchBooks("the sun also rises");
  }


  searchBooks = query => {
    API.search(query)
      .then(res => this.setState({ bookresults: res.data }))
      .catch(err => console.log(err));
  };

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
    else {
      API.search(this.state.bookSearch)
        .then(res =>
          this.setState({ bookresults: res.data }))

        .catch(err => console.log(err));
    };

  };



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="xs-9 sm-10">
            <h2>Search Google Books</h2>
            <form>

              <Input
                name="bookSearch"
                value={this.state.bookSearch}
                onChange={this.handleInputChange}
                placeholder="Search For a Book"
              />
              <FormBtn
                disabled={!(this.state.bookSearch)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>

            </form>
          </Col>
          <Col size="xs-9 sm-10">

            <h1>Search results</h1>
            {/* <ResultList results={this.state.bookresults} /> */}

             {this.state.bookresults.length ? (
              <BookList>
                {this.state.bookresults.map(bookresult => (
                  <BookListItem key={bookresult._id}>
                    {/* <BookLink to={"/books/" + bookresult._id}> */}
                      <strong>
                        {bookresult.title} by {bookresult.author}
                      </strong>
                    {/* </BookLink> */}
               
                  </BookListItem>
                ))}
              </BookList>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>

              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
