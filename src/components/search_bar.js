import React, { Component } from "react";

//functional component example - doesn't communicate with other components
/*const SearchBar = () => {
	return <input />;
};*/

//class component
//define new class "searchbar" and give it all functionality of react.components
class SearchBar extends Component {
    //initialize state
	constructor(props) {
		super(props);

		this.state = { term: ''};
	}
	//define method(function)
	render() {
		return (
		<div className="search-bar">
		<input 
		  value={this.state.term}
		  onChange={event => this.onInputChange(event.target.value)} />
		</div>
		);
	}
	//check for user input change and pass to input above with onChange
	//event (e) describes the context or information about the event that occured
	/*onInputChange(event) {
		//check log to see what it returns
		console.log(event.target.value);
	}*/
	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChange(term);
	}
}

export default SearchBar;
