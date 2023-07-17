import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner"
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        const { country, category, pageSize } = this.props;
        const apiUrl = `http://localhost:5001?country=${country}&category=${category}&pageSize=${pageSize}&page=1`;

        try {
            this.setState({ loading: true });
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.setState({
                articles: data.articles,
                totalResults: data.totalResults,
                loading: false
            });
        } catch (error) {
            console.error('Error fetching news:', error);
            this.setState({ loading: false });
        }
    }


    PreviousClick = async () => {
        try {
            const { country, category, pageSize } = this.props;
            const { page } = this.state;

            const url = `http://localhost:5001?country=${country}&category=${category}&apiKey=0c6978c3826740158dab336b6eff91d9&page=${page - 1}&pageSize=${pageSize}`;

            this.setState({ loading: true });

            const response = await fetch(url);
            const parsedData = await response.json();
            this.setState({
                page: page - 1,
                articles: parsedData.articles,
                loading: false
            });
        } catch (error) {
            console.error('Error in PreviousClick:', error);
            this.setState({ loading: false });
        }
    }

    NextClick = async () => {
        try {
            const { country, category, pageSize } = this.props;
            const { page, totalResults } = this.state;

            if (!(page + 1 > Math.ceil(totalResults / pageSize))) {
                const url = `http://localhost:5001?country=${country}&category=${category}&apiKey=0c6978c3826740158dab336b6eff91d9&page=${page + 1}&pageSize=${pageSize}`;

                this.setState({ loading: true });

                const response = await fetch(url);
                const parsedData = await response.json();
                this.setState({
                    page: page + 1,
                    articles: parsedData.articles,
                    loading: false
                });
            }
        } catch (error) {
            console.error('Error in NextClick:', error);
            this.setState({ loading: false });
        }
    }



    render() {
        return (
            <div className="container">
                <h1 className="my-3 text-center">Current News (Fetching data from News API)</h1>
                {this.state.loading && <Spinner />}
                <div className="row my-4">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 65) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        )
                    })}

                </div>
                <div className="container my-4 d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.PreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.NextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}