import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { Card, Container, Dimmer, Loader } from 'semantic-ui-react';

import { connect } from 'react-redux';

class Brewery extends React.Component {
  state = { brewery: {}, loading: true }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const { id } = this.props.match.params
    axios.get(`/api/brewery/${id}`)
      .then( res => {
        console.log(res.data.entries);
        this.setState({ brewery: res.data.entries[0], loading: false })
      })
      .catch( err => {
        dispatch(setFlash('Unable to retrieve brewery. Please try again', 'red'))
      });
  }

  loadingMessage = () => {
    return (
      <Dimmer active style={{ height: '100vh' }}>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  displayBrewery = () => {
    const { brewery } = this.state;
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            { brewery.name }
          </Card.Header>
          <Card.Meta>
            Est: { brewery.established }
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          { brewery.description }
        </Card.Content>
      </Card>
    );
  }

  render () {
    const { loading } = this.state;

    return (
      <Container>
        { loading ? this.loadingMessage() : this.displayBrewery() }
      </Container>
    );
  }
}

export default connect()(Brewery);
