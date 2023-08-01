import React from 'react'

const NewsItem = (props) => {
    return (
      <div className='my-3'>
        <div className="card">
          <img src={!props.imageUrl?"https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/338200/338246.6.jpg":props.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.title}...</h5>
            <p className="card-text">{props.description}...</p>
            <a href={props.newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
