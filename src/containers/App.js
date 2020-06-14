import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) =>
      dispatch(setSearchField(event.target.value)),
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users })
      );
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobot = robots.filter(robot => {
      return robot.name.toLowerCase()
        .includes(searchField.toLowerCase());
    })

    return !robots.length ?
      <h1>Loading...</h1> :
      (
        <Fragment>
          <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
              <ErrorBoundry>
                <CardList robots={filteredRobot} />
              </ErrorBoundry>
            </Scroll>
          </div>
        </Fragment>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
