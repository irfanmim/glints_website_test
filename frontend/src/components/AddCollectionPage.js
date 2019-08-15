import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {FormControl, TextField, Grid, InputLabel, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Select from 'react-select';
import Axios from 'axios';

const styles = theme => ({
    root: {
    },
    textField: {
        backgroundColor: 'white',
        width: 700 
    },
    paper: {
        padding: theme.spacing.unit * 3,
    },
    navigation: {
      marginTop: 50,
      textAlign: 'center'
    },
    button: {
      marginRight: theme.spacing.unit,
    },
});


class AddCollectionPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : "",
            restaurant : [],
            selectedOption: [],
        }
    }

    handleChange1 = selectedOption => {
        this.setState({ selectedOption });
      };
    
    handleForm = () => {
        let data = {
            name: this.state.name,
            restaurant: []
        }

        let selected = this.state.selectedOption
        let restaurants = []
        for (let restaurant of selected) {
            restaurants.push(restaurant.id)
        }
        data.restaurant = restaurants

        console.log(data)

        Axios.post("http://localhost:8000/collection/", data)
            .then( response => 
                this.props.history.push("/dashboard")
            )
            .catch(error => this.setState({...this.state, error, isLoading: false}))
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    componentDidMount() {
        this.setState({...this.state, isLoading: true})
        Axios.get("http://localhost:8000/restaurantOption")
            .then( response => 
            this.setState({
                ...this.state,
                isLoading : false, 
                restaurant : response.data
            })
            )
            .catch(error => this.setState({...this.state, error, isLoading: false}))
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Link to={'/dashboard'} style={{textDecoration: 'none'}}><Button size="small" variant="outlined">Back</Button></Link>
                <h1>Add Collection</h1>
                <Grid container spacing={0} className={classes.root}>
                    <Grid justify="center" item xs={2}>
                        <div className={classes.paper}>
                        <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Name
                        </InputLabel>
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <FormControl>
                            <TextField
                                id="outlined-bare"
                                className={classes.textField}
                                placeholder="Name"
                                margin="normal"
                                variant="outlined"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                        <div className={classes.paper}>
                        <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Restaurant
                        </InputLabel>
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <Select
                            className={classes.textField}
                            value={this.state.selectedOption}
                            onChange={this.handleChange1}
                            options={this.state.restaurant}
                            isMulti={true}
                        />
                    </Grid>
                </Grid>

                <div className={classes.navigation}>
                    <Button variant="contained" color="primary" onClick={this.handleForm} className={classes.button}>Save</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AddCollectionPage);