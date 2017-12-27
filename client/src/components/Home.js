import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Grid, Header, Image, Segment } from 'semantic-ui-react';
import brewery from '../images/brewery.jpg';
import beer from '../images/beer.jpg';
import landing from '../images/landing.jpg';

const Home = () => {
  return (
    <Container>
      <Segment style={styles.backgroundImage}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header
                textAlign='center'
                style={styles.headerText}
                >
                Bittr
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header
                textAlign='center'
                style={styles.secondaryText}
                >
                Discover What's on Tap Tonight.
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Card.Group stackable itemsPerRow={2}>
        <Card>
          <Image src={brewery} />
          <Card.Content>
            <Button circular color='black' size='big' fluid as={Link} to={`/api/all_breweries`}>Discover Breweries</Button>
          </Card.Content>
        </Card>
        <Card>
          <Image src={beer} />
          <Card.Content>
            <Button circular color='black' size='big' fluid as={Link} to={`/api/all_beers`}>Discover Brews</Button>
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  )
}

const styles = {
  backgroundImage: {
    background: `linear-gradient( rgba(0, 0, 0, .25), rgba(0, 0, 0, .85) ), url(${landing})`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    width: '100%',
    height: '75vh'
  },
  headerText: {
    color: 'white',
    fontFamily: 'helvetica',
    fontSize: '6em',
    letterSpacing: '5px',
    marginTop: '55%',
  },
  secondaryText: {
    color: 'white',
    fontFamily: 'courier',
    fontSize: '2em',
    marginTop: '75%',
  }
}

export default Home;
