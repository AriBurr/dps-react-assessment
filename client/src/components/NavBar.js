import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class NavBar extends Component {
  activeItem = (navPath) => {
    return navPath === this.props.location.pathname;
  }

  render() {
    return (
      <Menu>
        <Link to='/'>
          <Menu.Item name='Bittr' active={this.activeItem('/')} />
        </Link>
        <Menu.Menu position='right'>
          <Link to='/api/all_beers'>
            <Menu.Item name='Beers' />
          </Link>
          <Link to='/api/all_breweries'>
            <Menu.Item name='Breweries' />
          </Link>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(NavBar);
