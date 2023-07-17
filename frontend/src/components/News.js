import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner"
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country : "in",
        pageSize : 8
      }
      
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number
    }

    constructor(){
        super();
        this.state = {
            articles : [],       
            loading : false,
            page : 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c6978c3826740158dab336b6eff91d9&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({articles : parsedData.articles,
                    totalResults : parsedData.totalResults,
                    loading : false})
    }

    PreviousClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c6978c3826740158dab336b6eff91d9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page : this.state.page - 1,
            articles : parsedData.articles,
            loading : false
        })
    }

    NextClick = async ()=>{
        if (!(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize))) {
            
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c6978c3826740158dab336b6eff91d9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page : this.state.page + 1,
            articles : parsedData.articles,
            loading : false
        })
    }
    }
    

    render() {
        return (
            <div className="container">
                <h1 className="my-3 text-center">Current News (Fetching data from News API)</h1>
                {this.state.loading && <Spinner/>}
                <div className="row my-4">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return(
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 65):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                            </div>
                        )
                    })}
                    
                </div>
                <div className="container my-4 d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.PreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.NextClick}>Next &rarr;</button>
                </div>
                
                </div>
        )
    }
}