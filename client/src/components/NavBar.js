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
      <div>
        <Menu pointing>
          <Link to='/'>
            <Menu.Item name='home' active={this.activeItem('/')} />
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
      </div>
    )
  }
}

export default withRouter(NavBar);
