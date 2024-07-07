import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        category: 'general'
    };

    static propTypes = {
        category: PropTypes.string
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
    }

    async componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {
        this.props.setProgress(10);
        this.setState({ loading: true });
        const kurl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=354194fbb1e548a3b5b396ad77b912e2&page=${this.state.page}`;
        let data = await fetch(kurl);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);

    };

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 }, async () => {
            const kurl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=354194fbb1e548a3b5b396ad77b912e2&page=${this.state.page}`;
            let data = await fetch(kurl);
            let parsedData = await data.json();
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            });
        });
    };

    render() {
        return (
            <>
                <h2 className="text-center" style={{marginTop:'100px'}}>
                    {this.capitalizeFirstLetter(this.props.category)} News Headlines
                </h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title}
                                        description={element.description ? element.description : '...'}
                                        imageurl={element.urlToImage ? element.urlToImage : 'https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg'}
                                        nurl={element.url}
                                        author={element.author ? element.author : 'Web'}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News;
