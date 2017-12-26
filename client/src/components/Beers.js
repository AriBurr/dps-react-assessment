import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { Card, Image, Dimmer, Loader, Segment } from 'semantic-ui-react';

class Beers extends React.Component {
  state = { beers: [], loading: true }

  componentDidMount() {
    const { dispatch } = this.props;
    axios.get('/api/all_beers')
      .then( res => {
        this.setState({ beers: res.data.entries, loading: false})
      })
      .catch( err => {
        dispatch(setFlash('Unable to retrieve beers. Please try again', 'red'))
      });
  }

  loadingMessage = () => {
    return (
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  displayBeers = () => {
    const { beers } = this.state;
    return beers.map( b => {
      return (
        <Card>
          <Card.Content>
            <Card.Header>
              {b.name}
            </Card.Header>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
    <Card.Group stackable itemsPerRow={3}>
      { this.state.loading ? this.loadingMessage() : this.displayBeers() }
    </Card.Group>
    );
  }

}

export default connect()(Beers);
