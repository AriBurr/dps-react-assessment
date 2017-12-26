import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { Card, Container, Dimmer, Loader } from 'semantic-ui-react';

import { connect } from 'react-redux';

class Beer extends React.Component {
  state = { beer: {}, loading: true }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const { name } = this.props.match.params
    axios.get(`/api/beer/${name}`)
      .then( res => {
        this.setState({ beer: res.data.entries[0], loading: false })
      })
      .catch( err => {
        dispatch(setFlash('Unable to retrieve beer. Please try again', 'red'))
      });
  }

  loadingMessage = () => {
    return (
      <Dimmer active style={{ height: '100vh' }}>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  displayBeer = () => {
    const { beer } = this.state;
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            { beer.name }
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          { beer.description }
        </Card.Content>
      </Card>
    );
  }

  render () {
    const { loading } = this.state;

    return (
      <Container>
        { loading ? this.loadingMessage() : this.displayBeer() }
      </Container>
    );
  }
}

export default connect()(Beer);
