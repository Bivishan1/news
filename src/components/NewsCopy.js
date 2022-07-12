import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
  // 1. articles variables to hold the articles in an array content.
  //   articles = [ // comment our this bulk articles since we generating news article from api with the fetch api.
  //     {
  //       source: {
  //         id: "bbc-sport",
  //         name: "BBC Sport",
  //       },
  //       author: "BBC Sport",
  //       title: "Shane Warne memorial - watch & follow updates",
  //       description:
  //         "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
  //       url: "http://www.bbc.co.uk/sport/live/cricket/60916236",
  //       urlToImage:
  //         "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
  //       publishedAt: "2022-03-30T08:22:26.498888Z",
  //       content:
  //         "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]",
  //     },
  //     {
  //       source: {
  //         id: "espn-cric-info",
  //         name: "ESPN Cric Info",
  //       },
  //       author: null,
  //       title:
  //         "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //       description:
  //         "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //       url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //       urlToImage:
  //         "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //       publishedAt: "2020-04-27T11:41:47Z",
  //       content:
  //         "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
  //     },
  //     {
  //       source: {
  //         id: "espn-cric-info",
  //         name: "ESPN Cric Info",
  //       },
  //       author: null,
  //       title:
  //         "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //       description:
  //         "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //       url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //       urlToImage:
  //         "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //       publishedAt: "2020-03-30T15:26:05Z",
  //       content:
  //         "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
  //     },
  //   ];
  //for http run , to request news dynamically, we use constructor below
  constructor() {
    //2. constructor for to set the state of variable
    super(); // super() method just to run constructor.
    // console.log("This is constructor");
    //3. state to change dynamically, since we will change articles dynamically and while loading we will show spinner that's why we set false here.
    this.state = {
      page: 1,
      // 9. articles and loading lai state ko part banaunu ko reasons to change it's dynamically.
      // 4. setting up state with this.state.
      // 5.  we never have to set this.state directly, since in FC we use useState and it's method to set the state value.
      articles: [], // this.articles, //6. articles is variable we create above, and we can access articles content with this.articles. //this .articles will not work here because articles array is empty since we are generating articles from api. // suruma, yo blank hunxa , yo array ani, api load vayesi, yesma fetch vayera in componenetDidMount function run vayepaxi.
      loading: false, // 8. while we load the article we show the spinner, when gets load we set loading false and show content.
    };
  }

  //componenetDidMount() will run after renderling all the jsx - Html through render() method in document. where constructor will run first, then render and after than compoenentDidMount() will after execution.
  async componentDidMount() {
    // asynchronous function where we have to use await keyword.
    // console.log("cdmd"); // to check which will run first in terminal.

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ff954e750b914328a0bc65c2e45304c4&page=1&pageSize=${this.props.pageSize}`;
    // default jahile page nai dekhauxa, page value set gare pani, nagare pani. ani pagesize vaneko chai number of articles jasma kati wota article show / fetch garney vanne kura. hunxa so hamle first page 1 ma 20 wota article show garyau.
    this.setState({ loading: true });
    let data = await fetch(url); // async function can wait some time to resolve some promises inside it's body, which is here "await fetch(url)" is a promise. // promise return jun yo fetch(url) ley gariraxa, tesko lagi wait garr vanera "await" keyword use garyau.
    let parsedData = await data.json(data); // yesari fetch vayera aune data lai json or text or any other format ma convert garera show garda promise hunxa.
    // console.log(parsedData);
    this.setState({ loading: false });
    this.setState({
      articles: parsedData.articles,
      totalArticlesResults: parsedData.totalResults, //parsedData.totalResults chai json ko documetn property j xa tehi halda..
    }); //json ko articles object ko articles key bata fetching.
    console.log(this.state.totalArticlesResults);
    console.log(this.state.articles.length !== this.state.totalArticlesResults);
  }

  handleNext = async () => {
    // console.log(this.state);
    let pagecheck =
      this.state.page + 1 >
      Math.ceil(this.state.totalArticlesResults / this.props);
    if (!pagecheck) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category
        }&apiKey=ff954e750b914328a0bc65c2e45304c4&page=${this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json(data);
      // this.setState({  });
      console.log(parsedData.articles);
      // this.setState({parsedData.articles  });// no need to double this.setState for the article property state to set.
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    } //20 means pageSize which is default 20.
  };

  handlePrevious = async () => {
    // console.log("Previous");

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category
      }&apiKey=ff954e750b914328a0bc65c2e45304c4&page=${this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json(data);

    // this.setState({parsedData.articles  });// no need to double this.setState for the article property state to set.
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    // console.log("render");
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top Story Headlines.
        </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && // if only loading is false,then only perform mapping these artile into an array.
            this.state.articles.map((element) => {
              //iterate throug the array elements in our articles state.
              // console.log(element);
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
                  />
                </div>
              );
            })}
        </div>
        <div className=" my-3 d-flex justify-content-between">
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
        </div>
      </div>
    );
  }
}

export default News;
