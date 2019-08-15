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
import axios from 'axios';

const styles = {
    root: {
      width: '100%',
      overflowX: 'auto',
      boxShadow: "none",
      border: "1px solid #E3E7E8",
    }
}

class ListOfRestaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading : false,
            data : this.props.data,
            error : null,
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Schedule</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(n => (
                        <TableRow key={n.id}>
                            <TableCell component="th" scope="row">{n.name}</TableCell>
                            <TableCell align="left">{n.schedule}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                { this.state.data.length === 0 ? <Typography style={{textAlign: "center"}}>restaurant not found</Typography> : <div></div>}
            </Paper>
        )
    }
}

export default withStyles(styles)(ListOfRestaurant);