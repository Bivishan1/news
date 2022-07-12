import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroller'; // infinite scrolling

export class News extends Component {
  //we can also create default static variable for props passing through it.
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  // toggleClass = () => {
  //   document.querySelector('.nav-link').classList.toggle('active');
  // }

  capitalWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }




  //for http run , to request news dynamically, we use constructor below
  constructor(props) {
    //2. constructor for to set the state of variable
    super(props); // super() method just to run constructor.
    this.state = {
      page: 1,
      articles: [],
      loading: false, // 8. while we load the article we show the spinner, when gets load we set loading false and show content.
      isActive: false,
    };
    document.title = `${this.capitalWord(this.props.category)} - NewsMonkey`;

  }



  async updateNews() {

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ff954e750b914328a0bc65c2e45304c4&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json(data);

    // this.setState({ loading: false });
    this.setState({
      articles: parsedData.articles,
      totalArticlesResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ff954e750b914328a0bc65c2e45304c4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json(data);
    // this.setState({ loading: false });
    this.setState({
      articles: parsedData.articles,
      totalArticlesResults: parsedData.totalResults,
      loading: false,
      hasMore: false
    });
  }

  loadFunc = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ff954e750b914328a0bc65c2e45304c4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json(data);
    // this.setState({ loading: false });
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticlesResults: parsedData.totalResults,
      hasMore: true
    })
  }


  handleNext = async () => {
    // console.log(this.state);
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
    // this.updateNews
    // let pagecheck =
    //   this.state.page + 1 >
    //   Math.ceil(this.state.totalArticlesResults / this.props);
    // if (!pagecheck) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category
    //     }&apiKey=ff954e750b914328a0bc65c2e45304c4&page=${this.state.page + 1
    //     }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json(data);
    //   // this.setState({  });
    //   console.log(parsedData.articles);
    //   // this.setState({parsedData.articles  });// no need to double this.setState for the article property state to set.
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    //20 means pageSize which is default 20.
  };

  handlePrevious = async () => {
    // console.log("Previous");

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category
    //   }&apiKey=ff954e750b914328a0bc65c2e45304c4&page=${this.state.page - 1
    //   }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json(data);

    // // this.setState({parsedData.articles  });// no need to double this.setState for the article property state to set.
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
  }

  render() {
    // console.log("render");
    return (
      <div className="container my-3">

        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top  {this.capitalWord(this.props.category)}  Headlines</h2>

        {this.state.loading && <Spinner />}

        <div className="row">

          {/* Infinite scrolling */}
          {/* <div style="height:700px;overflow:auto;"> */}
          <div>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadFunc}
              hasMore={this.state.articles.length != this.state.totalArticlesResults}
              loader={<Spinner key={0} />}
              useWindow={false}
            >
              {/* {this.state.articles} */}
              <div className="container">

                {!this.state.loading && // if only loading is false,then only perform mapping these artile into an array.
                  this.state.articles.map((element) => {

                    return (
                      <div className="col-md-4" key={element.url}>
                        {/* unique key to identify the relevant element. */}
                        <NewsItem
                          title={element.title ? element.title.slice(0, 45) : ""}
                          description={
                            element.description
                              ? element.description.slice(0, 88)
                              : ""
                          }

                          button="Go to News"
                          imageUrl={element.urlToImage}
                          newsUrl={element.url}
                          author={element.author}
                          date={element.publishedAt}
                          source={element.source.name}

                        />
                      </div>
                    );
                  })}
              </div>
            </InfiniteScroll>
          </div>
          {/* <div className=" my-3 d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              onClick={this.handlePrevious}
              type="button"
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalArticlesResults / this.props.pagesize)
              }
              type="button"
              onClick={this.handleNext}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div> */}
        </div>
        );
  }
}

        export default News;
