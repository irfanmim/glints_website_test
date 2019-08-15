import React from 'react';
import {Link} from 'react-router-dom'
import {Button, Grid, Typography} from '@material-ui/core'
import {FormControl, TextField, Input, InputLabel} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles'
import Axios from 'axios'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListOfRestaurant from './ListOfRestaurant';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    centered: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    grid_inside: {
        textAlign: 'center',
        padding: theme.spacing.unit * 1,
    },
    link: {
      textDecoration: 'none',
    },
    notes: {
        [theme.breakpoints.down('md')] : {
            textAlign: 'left'
        }
    },
    icon1: {
        width: '70%',
        marginBottom: 10,
        [theme.breakpoints.up('md')] : {
            width: 'auto',
            height: 120
        }
    },
    icon2: {
        width: '40%',
        marginBottom: 10,
        [theme.breakpoints.up('md')] : {
            width: 'auto',
            height: 120
        }
    },
    icon3: {
        width: '70%',
        marginBottom: 10,
        [theme.breakpoints.up('md')] : {
            width: 'auto',
            height: 120
        }
    },
    icon4: {
        width: '32%',
        marginBottom: 10,
        [theme.breakpoints.up('md')] : {
            width: 'auto',
            height: 120
        }
    },
    how: {
        textAlign: 'left',
        padding: "10px 0"
    },
  });


class HomeContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "keyword",
            keyword : "",
            day: "mon",
            hour: 0,
            minute: 0,
            isLoading : false,
            isSearch: false,
            data : [],
            error : null,
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    submitForm = event => {
        event.preventDefault();
        this.setState({...this.state, isSearch: true, isLoading: true})
        let URI = ""
        if (this.state.type === "keyword") {
            URI = "http://localhost:8000/restaurantByName?keyword="+this.state.keyword
        } else {
            URI = "http://localhost:8000/restaurantByDate?day="+this.state.day+"&hour="+this.state.hour+"&minute="+this.state.minute
        }

        Axios.get(URI)
            .then( response => 
            this.setState({
                ...this.state,
                isLoading : false, 
                data : response.data
            })
            )
            .catch(error => this.setState({...this.state, error, isLoading: false}))
    }

    menuItemHour = () => {
        let items = []
        for (let i = 0; i < 24; i++) {
            items.push(<MenuItem value={i}>{i}</MenuItem>)
        }
        return items;
    }

    menuItemMinute = () => {
        let items = []
        for (let i = 0; i <= 60; i++) {
            items.push(<MenuItem value={i}>{i}</MenuItem>)
        }
        return items;
    }

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} className={classes.centered} style={{background: '#FF5722'}}>
                        <Grid item xs={12} className={classes.grid_inside}>
                            <Typography variant="h4" style={{color: 'white', marginBottom:10}}>Looking for Restaurant ?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <form className={classes.form} onSubmit={this.submitForm}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Search By</FormLabel>
                                    <RadioGroup aria-label="position" name="position" value={this.state.type} onChange={this.handleChange('type')} row>
                                        <FormControlLabel
                                            value="keyword"
                                            control={<Radio color="primary" />}
                                            label="Keyword"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="date"
                                            control={<Radio color="primary" />}
                                            label="Open Time"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                { this.state.type == "date" ?
                                    <div style={{paddingTop: 20, paddingBottom: 30}}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel>Day</InputLabel>
                                            <Select
                                                value={this.state.day}
                                                onChange={this.handleChange('day')}
                                            >
                                                <MenuItem value="mon">Monday</MenuItem>
                                                <MenuItem value="tue">Tuesday</MenuItem>
                                                <MenuItem value="wed">Wednesday</MenuItem>
                                                <MenuItem value="thr">Thrusday</MenuItem>
                                                <MenuItem value="fri">Friday</MenuItem>
                                                <MenuItem value="sat">Saturday</MenuItem>
                                                <MenuItem value="sun">Sunday</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel>Hour</InputLabel>
                                            <Select
                                                value={this.state.hour}
                                                onChange={this.handleChange('hour')}
                                            >
                                                {this.menuItemHour()}
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel>Minute</InputLabel>
                                            <Select
                                                value={this.state.minute}
                                                onChange={this.handleChange('minute')}
                                            >
                                                {this.menuItemMinute()}
                                            </Select>
                                        </FormControl>
                                    </div>
                                :
                                    <FormControl margin="normal" required fullWidth>
                                        <TextField
                                            id="outlined-bare"
                                            className={classes.textField}
                                            placeholder="Keyword"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.keyword}
                                            onChange={this.handleChange('keyword')}
                                        />
                                    </FormControl>
                                }

                                <Button type="submit" variant="contained" color="default" className={classes.submit}>Search</Button>
                            </form>
                        </Grid>
                    </Grid>

                    { this.state.isSearch ?
                        <Grid item xs={12} className={classes.centered}>
                            <Grid container>
                                <Grid item xs={10} className={classes.how}>
                                    <Typography variant="h5">Restaurant Result</Typography>
                                </Grid>
                                <Grid item xs={2} className={classes.how}>
                                    <Link to={'/dashboard'} style={{textDecoration: 'none'}}>
                                        <Button variant="outlined" color="primary" className={classes.button}>Save the restaurants</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListOfRestaurant key={this.state.data} data={this.state.data}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    :
                        <Grid item xs={12} className={classes.centered}>
                            <Link to={'/dashboard'} style={{textDecoration: 'none'}}>
                                <Button variant="outlined" color="primary" className={classes.button}>Save the Restaurant</Button>
                            </Link>
                        </Grid>
                    } 



                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(HomeContent);