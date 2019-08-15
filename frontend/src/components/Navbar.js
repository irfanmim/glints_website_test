import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
  },
  appbar: {
    background: '#FF5722',
    boxShadow: '0 0px 3px 0px #444'
  },
  grow: {
    flexGrow: 1,
    marginLeft: 5
  },
  menuButton: {
    padding: '5px 10px',
    margin: '0px 5px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  }
};

class Navbar extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appbar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            <Link to="/" className={classes.link}>
                            Restaurants
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Navbar);
