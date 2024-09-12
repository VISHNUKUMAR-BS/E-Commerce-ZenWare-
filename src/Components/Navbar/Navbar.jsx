import React from 'react';
import { AppBar, Typography, IconButton, Toolbar, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import logo from '../../assests/commerce.png';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems = 0 }) => {

    const classes = useStyles();
    const location = useLocation();

    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="ZenWare    " height="25px" className={classes.image} /> ZenWare
                </Typography>
                <div className={classes.grow} />
                {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
