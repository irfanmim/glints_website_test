import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Typography} from '@material-ui/core'
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    root: {
      width: '100%',
      overflowX: 'auto',
      boxShadow: "none",
      border: "1px solid #E3E7E8",
    }
}

class ListOfCollection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading : false,
            data : this.props.data,
            error : null,
            modalOpen: false,
            shareEmail: ""
        }
    }

    handleClickOpen = () => {
        this.setState({...this.state, modalOpen: true});
    }
    
    handleClose = () => {
        console.log("Share to " + this.state.shareEmail)
        this.setState({...this.state, modalOpen: false, shareEmail: ""});
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    
    componentDidMount() {
        this.setState({...this.state, isLoading: true})
        
        Axios.get("http://localhost:8000/collection")
        .then( response => 
        this.setState({
            ...this.state,
            isLoading : false, 
            data : response.data
        })
        )
        .catch(error => this.setState({...this.state, error, isLoading: false}))

        setInterval( () => {
            Axios.get("http://localhost:8000/collection")
                .then( response => 
                this.setState({
                    ...this.state,
                    isLoading : false, 
                    data : response.data
                })
                )
                .catch(error => this.setState({...this.state, error, isLoading: false}))
        }, 5000)
    }

    remove = (collectionId) => {
        console.log("remove")
        Axios.delete("http://localhost:8000/collection/"+collectionId+"/")
            .then( response => 
                Axios.get("http://localhost:8000/collection")
                    .then( response2 => {
                        this.setState({
                            ...this.state,
                            isLoading : false, 
                            data : response2.data
                        })
                    })
                    .catch(error => this.setState({...this.state, error, isLoading: false}))
            )
            .catch(error => this.setState({...this.state, error, isLoading: false}))
        
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map(n => (
                                <TableRow key={n.id} hover={true} component={Link} to={'/dashboard/collection/'+n.id} style={{textDecoration: 'none'}}>
                                    <TableCell component="th" scope="row">{n.name}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" variant="contained" onClick={this.handleClickOpen} style={{textDecoration: 'none', marginRight: 10}}>Share</Button>
                                        <Link to={'/dashboard/collection/edit/'+n.id} style={{textDecoration: 'none', marginRight: 10}}>
                                            <Button size="small" variant="contained">Edit</Button>
                                        </Link>
                                        <Button size="small" variant="contained" onClick={() => this.remove(n.id)}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    { this.state.data.length === 0 ? <Typography style={{textAlign: "center"}}>no collection</Typography> : <div></div>}
                </Paper>
                <Dialog open={this.state.modalOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Share</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        value={this.state.shareEmail}
                        onChange={this.handleChange('shareEmail')}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Share
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(ListOfCollection);