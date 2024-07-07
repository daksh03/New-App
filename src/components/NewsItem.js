import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageurl, nurl, author, date,source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{
                        display:`flex`,
                        justifyContent:`flex-end`,
                        postion:`absolute`,
                        right:`0`
                    }}>

                         <span className="badge rounded-pill bg-danger" style={{left:'85%'}}>
                           {source}
                        </span>
                    </div>
                    <h5 className="card-title">{title} </h5>
                    <img src={imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="card-text">{description} </p>
                        <p className="card-text"><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={nurl} target='_blank' className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div></div>
        )
    }
}

export default NewsItem