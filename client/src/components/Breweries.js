import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Truncate from 'react-truncate';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFlash } from '../actions/flash';
import {
  Button,
  Card,
  Container,
  Dimmer,
  Header,
  Image,
  Item,
  Loader,
  Segment,
 } from 'semantic-ui-react';

class Breweries extends React.Component {
  state = { breweries: [], loading: true, page: 1, hasMore: true }

  componentWillMount() {
    this.fetchBreweries(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ breweries: [], loading: true, hasMore: true, page: 1 });
    this.fetchBreweries(nextProps, 1);
  }

  fetchBreweries = (props, page = 1) => {
    const { dispatch } = this.props;
    axios.get(`/api/all_breweries?page=${page}&per_page=30`)
    .then( res => {
      const { data } = res;
      console.log(data);
      if(data.total_pages) {
        if (data.total_pages === page)
          this.setState({ hasMore: false});
        this.setState({ breweries: [...this.state.breweries, ...data.entries], total_pages: data.total_pages, page })
      } else {
        this.setState({ breweries: data.entries, hasMore: false })
      }
    })
    .catch( err => {
      dispatch(setFlash('Unable to retrieve breweries. Please try again', 'red'))
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

  loadMoreBreweries = () => {
    this.fetchBreweries(this.props, this.state.page + 1)
  }

  renderDesc = (brewery) => {
    return (
      <Truncate lines={1} ellipsis={<span>... <Link to={`/api/brewery/${brewery.id}`}>Read More</Link></span>}>
        { brewery.description }
      </Truncate>
    )
  }

  renderImage = (brewery) => {
    return (
      <Image src={brewery.images.icon} />
    )
  }

  displayBreweries = () => {
    const { breweries } = this.state;
    return breweries.map( brewery => {
      return (
        <Card key={brewery.name}>
          <Card.Content>
            {brewery.images ? this.renderImage(brewery) : null }
            <Card.Header>{ brewery.name }</Card.Header>
            <Card.Description>
              { brewery.description ? this.renderDesc(brewery) : <Link to={`/api/brewery/${brewery.id}`}>Read More</Link> }
            </Card.Description>
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
          <Header as='h1' textAlign='center' block>Breweries</Header>
          <Segment style={{ height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMoreBreweries}
            hasMore={hasMore}
            useWindow={false}
          >
            <Card.Group stackable itemsPerRow={2}>
              { this.displayBreweries() }
            </Card.Group>
          </InfiniteScroll>
        </Segment>
        </Container>
      );
    }
  }

}

export default connect()(Breweries);
