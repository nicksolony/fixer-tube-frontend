import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import NewVideo from './components/NewVideo'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {loadData} from "./redux/actions/videoActions"
import './App.css';
import MainCategory from './components/MainCategory';
import Category from './components/Category';
import Brand from './components/Brand';
import Video from './components/Video';
import SearchResults from './components/SearchResults';
import EditVideo from './components/EditVideo';
import Header from './components/Header';




class App extends Component {
  componentDidMount() {
    this.props.loadDataFromDb()
  }

  render() {
     return (
      <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/videos/new" component={NewVideo} />
          <Route path="/videos/:slug/edit" component={EditVideo} />
          <Route path="/main_categories/:slug" component={MainCategory} />
          
          <Route path="/categories/:slug" component={Category} />
          
          <Route path="/mainCategory/:main_category_slug/brands/:slug" component={Brand} />
          <Route path="/brands/:slug" component={Brand} />
          
          <Route path="/videos/:slug" component={Video} />
          <Route path="/search=:searchValue" component={SearchResults} />
          <Redirect from="/videos/" to="/" />
          <Redirect from="/brands" to="/" />
          <Redirect from="/categories" to="/" />
          <Redirect from="/main_categories" to="/" />

        </Switch>
        <div className="footer"></div>
      </Router>
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      loadDataFromDb: () => dispatch(loadData())
  }
}


export default connect (null, mapDispatchToProps)(App);
