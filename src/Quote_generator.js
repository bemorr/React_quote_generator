import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './styles/styles.scss';

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: [],
			quote: '',
			author: '',
		};
		this.getRandomQuoteNum = this.getRandomQuoteNum.bind(this);
	}

	componentWillMount() {
		axios
			.get(
				'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json?'
			)
			.then((res) => {
				let randomNum = Math.floor(
					Math.random() * res.data.quotes.length
				);
				this.setState({
					quotes: res.data.quotes,
					quote: res.data.quotes[randomNum].quote,
					author: res.data.quotes[randomNum].author,
				});
			})
			.catch((err) => console.log(err));
	}

	getRandomQuoteNum() {
		let randomNum = Math.floor(Math.random() * this.state.quotes.length);
		let currentQuote = this.state.quotes[randomNum].quote;
		let currentAuthor = this.state.quotes[randomNum].author;
		this.setState({
			quote: currentQuote,
			author: currentAuthor,
		});
	}

	render() {
		return (
			<div id="wrapper">
				<div id="quote-box">
					<div id="text" style={{ color: 'black' }}>
						"{this.state.quote}"
					</div>
					<div id="author" style={{ color: 'black' }}>
						"{this.state.author}"
					</div>
					<Button
						id="new-quote"
						// bsSize="large"
						onClick={this.getRandomQuoteNum}
					>
					<a className="effect-5" href="" data-content="Link-effect" style={{ color: 'black' }}
					>
					<span>
					Get Quotes
					</span>
					</a>
					</Button>
					<a
						href="twitter.com/intent/tweet"
						value="link"
						id="tweet-quote"
					>
						<i class="fa fa-twitter fa-3x"></i>
					</a>
				</div>
			</div>
		);
	}
}

export default Wrapper;

const container = document.getElementById('root');
container ? ReactDOM.render(<Wrapper />, container) : false;
