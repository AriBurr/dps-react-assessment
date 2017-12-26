import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { Card, Container, Header, Image, Dimmer, Loader, Segment } from 'semantic-ui-react';

class Breweries extends React.Component {
  state = { breweries: [], loading: true }

  componentDidMount() {
    const { dispatch } = this.props;
    axios.get('/api/all_breweries?page=1&per_page=10')
      .then( res => {
        this.setState({ breweries: res.data.entries, loading: false})
      })
      .catch( err => {
        dispatch(setFlash('Unable to retrieve breweries. Please try again', 'red'))
      });
  }

  loadingMessage = () => {
    return (
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  displayBreweries = () => {
    const { breweries } = this.state;
    return breweries.map( b => {
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
      <Container>
        <Header as='h1' textAlign='center block'>Beers</Header>
        <Card.Group stackable itemsPerRow={3}>
          { this.state.loading ? this.loadingMessage() : this.displayBreweries() }
        </Card.Group>
      </Container>
    );
  }

}

export default connect()(Breweries);
