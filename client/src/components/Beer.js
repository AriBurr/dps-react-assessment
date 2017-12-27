import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { Grid, Container, Dimmer, Header, Image, Loader } from 'semantic-ui-react';

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

  renderLabel = (beer) => {
    return (
      <Image src={beer.labels.medium} />
    )
  }

  displayBeer = () => {
    const { beer } = this.state;
    return (
      <Grid>
        <Grid.Column width={4}>
          {beer.labels ? this.renderLabel(beer) : null }
        </Grid.Column>
        <Grid.Column width={9}>
          <Header>{ beer.name }</Header>
          <Grid.Row>{ beer.description }</Grid.Row>
        </Grid.Column>
        <Grid.Column width={3}>
          <Grid.Row>{ beer.style.short_name }</Grid.Row>
          <Grid.Row>ABV: { beer.abv }</Grid.Row>
          <Grid.Row>Organic: { beer.is_organic }</Grid.Row>
        </Grid.Column>
      </Grid>
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
