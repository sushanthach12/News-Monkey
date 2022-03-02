import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true)
        const data = await fetch(url);
        props.setProgress(35);
        const parsedData = await data.json();
        props.setProgress(70);

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }


    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <div className="container">
                <h2 className='text-center my-3'>News Monkey - Top {capitalizeFirstLetter(props.category)} headlines</h2>
                <hr />
            </div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container my-3">
                    <div className="row " >
                        {articles.map((element) => {
                            const props = {
                                tittle: (element.title) ? element.title : "",
                                description: (element.description) ? element.description : "",
                                imgUrl: element.urlToImage,
                                newsUrl: element.url,
                                author: element.author,
                                date: element.publishedAt,
                                source: element.source.name,
                            }
                            return <div className="col-md-3" key={element.url} >
                                <NewsItem {...props} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>
        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    totalResults: 0
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
