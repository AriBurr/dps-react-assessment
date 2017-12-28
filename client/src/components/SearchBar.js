import React from 'react';
import { Button, Input, Segment } from 'semantic-ui-react';

class SearchBar extends React.Component {
  state = { term: '' }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }

  render () {
    return (
      <Segment basic textAlign='center'>
        <Input
          fluid
          focus
          value={ this.state.term }
          onChange={ e => this.onInputChange(e.target.value) }
          placeholder='Search'
        />
      </Segment>
    );
  }
}

export default SearchBar;
