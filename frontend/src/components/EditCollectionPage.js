import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {FormControl, TextField, Grid, InputLabel} from '@material-ui/core'
import Axios from 'axios'
import Select from 'react-select';

const style = {
    button: {
        marginTop: 30,
    },
    textField: {
        backgroundColor: 'white',
        width: 700 
    },
    questions: {

    },
    navigation: {
        textAlign: "center",
        padding: "20px 0 70px 0"
    },
}

class QuestionEditExamPage extends React.Component {
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

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    componentDidMount() {
        this.setState({...this.state, isLoading: true})
        Axios.get("http://localhost:8000/restaurantOption")
            .then( response => 
                Axios.get("http://localhost:8000/collection/"+this.props.match.params.collectionId+"/", { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
                    .then( response2 => 
                        this.setState({
                            ...this.state,
                            isLoading : false, 
                            name: response2.data.name,
                            restaurant : response.data,
                            selectedOption : response2.data.detail,
                        })
                    )
                    .catch(error => this.setState({...this.state, error, isLoading: false}))
            )
            .catch(error => this.setState({...this.state, error, isLoading: false}))
        
    }
    
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

        Axios.put("http://localhost:8000/collection/"+this.props.match.params.collectionId+"/", data)
            .then( response => 
                this.props.history.push("/dashboard")
            )
            .catch(error => this.setState({...this.state, error, isLoading: false}))
    }

    handle = (data) => {        
        let questionsCopy = JSON.parse(JSON.stringify(this.state.questions))
        let idx

        questionsCopy.map((question, index) => {
            if(question.number === data.number) idx=index;
            return question
        })
        questionsCopy[idx] = data

        this.setState({
            ...this.state,
            questions : questionsCopy
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Link to={'/dashboard'} style={{textDecoration: 'none'}}><Button size="small" variant="outlined">Back</Button></Link>
                <h1>Edit Collection</h1>
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
                                placeholder="Title"
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

export default withStyles(style)(QuestionEditExamPage)