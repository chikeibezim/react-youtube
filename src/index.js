import _ from "lodash";

//import react module
import React, { Component } from "react";

//import react react-dom to render html
import ReactDOM from "react-dom";

//import youtube search
import YTSearch from "youtube-api-search";

import SearchBar from "./components/search_bar";

import VideoList from "./components/video_list";

import VideoDetail from "./components/video_detail";

//youtube apikey
const API_KEY = "AIzaSyACEWpetmcqSdDiYTfP217nJm8HGyLYiRA";

//1. create a new component. this component should produce some HTML
//2. to render to dom, please create an -
//instance of the component (App) else it returns console error
//3. <App /> - this is an instance of app
//functional app component
/*const App = () => {
	return (
	<div>
	  <SearchBar />
	</div>
	);
};*/

//change app component from functional to class component to
//be able to save state
class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

	  this.videoSearch('surfboards');
	}

	videoSearch(term) {
			YTSearch({ key: API_KEY, term: term }, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
			//the above is = this.setState({ videos: videos });
			//else this.setState({videos: data}) (different key:pair value)
		});
	}
    //return a fuction that can be called once every milliseconds
	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
				videos={this.state.videos} />
			</div>
		);
	}
}

// Take this component's instance generated html and put it on the page (in the DOM)
//react-dom takes a second argument which serves -
// as a div class/id where content of instance is rendered
ReactDOM.render(<App />, document.querySelector(".container"));
