import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { Container, Dimmer, Grid, Header, Image, Loader } from 'semantic-ui-react';

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

  renderImage = (brewery) => {
    return (
      <Image src={brewery.images.medium} />
    )
  }

  displayBrewery = () => {
    const { brewery } = this.state;
    return (
      <Grid>
        <Grid.Column width={4}>
          {brewery.images ? this.renderImage(brewery) : null }
        </Grid.Column>
        <Grid.Column width={9}>
          <Header>{ brewery.name }</Header>
          <Grid.Row>{ brewery.description }</Grid.Row>
        </Grid.Column>
        <Grid.Column width={3}>
          <Grid.Row>Est. { brewery.established }</Grid.Row>
          <Grid.Row>{ brewery.website }</Grid.Row>
        </Grid.Column>
      </Grid>
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
