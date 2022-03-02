import React from 'react'

export default function NewsItem(props) {

	let { tittle, description, imgUrl, newsUrl, author, date, source } = props;

	return (
		<div className="card my-3" style={{ width: "18rem", height: "30rem" }}>
			<img src={(imgUrl) ? imgUrl : "https://images.moneycontrol.com/static-mcnews/2022/02/stocks_stock_market-stock-770x433.jpg"} style={{ minHeight: "33%" }} className="card-img-top" alt="" />
			<div className="card-body">
				<h5 className="card-title" >{tittle.substring(0, 50)}... <span className="badge bg-secondary bg-success">{source}</span></h5>
				<p className="card-text" >{(!description) ? "To know more click on read more" : description.substring(0, 120)}...</p>
				<p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
				<a href={newsUrl} className="btn btn-sm btn-dark">Read more</a>
			</div>
		</div>
	)

}
