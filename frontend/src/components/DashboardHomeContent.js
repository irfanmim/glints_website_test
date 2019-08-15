import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import {Typography, Button, Grid} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CollectionDetail from './CollectionDetail'
import ListOfCollection from './ListOfCollection'

const styles = {
    tableContainer: {
        marginBottom: 50,
    },
    addButton: {
        textAlign: 'right',
        marginTop: 5
    },
}

class DashboardHomeContent extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div>
                <div className={classes.tableContainer}>
                    <Grid container>
                        <Grid item md={10}>
                            <Typography variant="h4" gutterBottom component="h2">
                                List of Collection
                            </Typography>
                        </Grid>
                        <Grid item md={2} className={classes.addButton}>
                            <Link to="/dashboard/collection/add" style={{textDecoration: 'none'}}>
                                <Button color="default" variant="contained">+ Add Collection</Button>
                            </Link>
                        </Grid>
                    </Grid>
                    
                    <ListOfCollection key={[]} data={[]}/>
                </div>

                <Switch>
                    <Route path="/dashboard/collection/:collectionId" component={CollectionDetail}/>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles)(DashboardHomeContent);