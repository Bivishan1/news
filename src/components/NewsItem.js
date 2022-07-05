import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className="card">
        <img
          src={
            !imageUrl
              ? "https://d32r1sh890xpii.cloudfront.net/article/718x300/2022-07-01_ug9m5fdejt.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          {/*7.  we can set state with this.props. props are for only read only in both rcc  rfc.  But we can pass through title, descirption with this.props / this.description but it's not intention to be dynamic withtout loading the page,so  */}
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}....</p>
          <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">
            Go to news
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
