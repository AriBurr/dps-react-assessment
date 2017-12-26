import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFlash } from '../actions/flash';
import { Button, Card, Container, Header, Image, Dimmer, Loader, Segment } from 'semantic-ui-react';

class Beers extends React.Component {
  state = { beers: [], loading: true, page: 1, hasMore: true }

  componentWillMount() {
    this.fetchBeers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ beers: [], loading: true, hasMore: true, page: 1 });
    this.fetchBeers(nextProps, 1);
  }

  fetchBeers = (props, page = 1) => {
    const { dispatch } = this.props;
    axios.get(`/api/all_beers?page=${page}&per_page=30`)
    .then( res => {
      const { data } = res;
      if(data.total_pages) {
        if (data.total_pages === page)
          this.setState({ hasMore: false});
        this.setState({ beers: [...this.state.beers, ...data.entries], total_pages: data.total_pages, page })
      } else {
        this.setState({ beers: data.entries, hasMore: false })
      }
    })
    .catch( err => {
      dispatch(setFlash('Unable to retrieve beers. Please try again', 'red'))
    })
    .then( () => {
      this.setState({ loading: false });
    });
  }

  loadingMessage = () => {
    return (
      <Dimmer active style={{ height: '100vh' }}>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  loadMoreBeers = () => {
    this.fetchBeers(this.props, this.state.page + 1)
  }

  displayBeers = () => {
    const { beers } = this.state;
    return beers.map( b => {
      return (
        <Card key={b.name}>
          <Card.Content>
            <Card.Header>
              {b.name}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Button color='teal' as={Link} to={`/api/beer/${b.name}`}>More Info</Button>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    const { page, hasMore, loading } = this.state;
    if (loading) {
      return (
        <Container>
          { this.loadingMessage() }
        </Container>
      )
    } else {
      return (
        <Container>
          <Header as='h1' textAlign='center' block>Beers</Header>
          <Segment style={{ height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMoreBeers}
            hasMore={hasMore}
            useWindow={false}
          >
            <Card.Group stackable itemsPerRow={3}>
              { this.displayBeers() }
            </Card.Group>
          </InfiniteScroll>
        </Segment>
        </Container>
      );
    }
  }

}

export default connect()(Beers);
