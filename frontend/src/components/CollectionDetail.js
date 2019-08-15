import React from 'react'
import {Link} from  'react-router-dom'
import { Typography, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, Hidden } from '@material-ui/core'
import axios from 'axios'

class CollectionDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collectionId : this.props.match.params.collectionId,
            data : {
                restaurant: [],
                detail: []
            },
            isLoading : false,
            error : null
        }
    }

    componentDidMount() {
        this.setState({...this.state, isLoading: true})
        axios.get("http://localhost:8000/collection/"+this.props.match.params.collectionId+"/", { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
          .then( response => 
            this.setState({
                ...this.state,
                isLoading : false, 
                data : response.data,
            })
          )
          .catch(error => this.setState({...this.state, error, isLoading: false}))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, isLoading: true})
        axios.get("http://localhost:8000/collection/"+nextProps.match.params.collectionId+"/", { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
            .then( response => 
                this.setState({
                    ...this.state,
                    isLoading : false, 
                    data : response.data,
                })
            )
            .catch(error => this.setState({...this.state, error, isLoading: false}))
    }

    render() {
        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    Detail
                </Typography>

                <Grid container>
                    <Grid item md={2} xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                        Name 
                    </Typography>
                    </Grid>
                    <Grid alignItems="center" item md={1} xs={1}><Typography variant="subtitle1" align="center" gutterBottom>:</Typography></Grid>
                    <Grid item md={9} xs={5}>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.state.data.name}
                        </Typography>
                    </Grid>
                    
                    <Grid item md={2} xs={6}>
                        <Typography variant="subtitle1" gutterBottom>
                            Number of Restaurants
                        </Typography>
                    </Grid>
                    <Grid alignItems="center" item md={1} xs={1}><Typography variant="subtitle1" align="center" gutterBottom>:</Typography></Grid>
                    <Grid item md={9} xs={5}>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.state.data.restaurant.length}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container style={{marginTop: 10}}></Grid>
                <Paper style={{padding:30, width: '100%', overflow: 'auto',}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Schedule</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.detail.map((restaurant, index) => (
                                <TableRow key={restaurant.id} hover={true} style={{textDecoration: 'none'}}>
                                    <TableCell component="th" scope="row">{index+1}</TableCell>
                                    <TableCell align="left">{restaurant.name}</TableCell>
                                    <TableCell align="left">{restaurant.schedule}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default CollectionDetail;