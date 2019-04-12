import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import lightGreen from '@material-ui/core/colors/lightGreen'
const RunningTotal = props => {
    return (
        <Paper 
            className='running-total' 
            elevation={0}
            style={{padding: 10, width: 400, marginLeft: -30, marginBottom: 40}}
        >
            <Typography 
                variant="h5" 
                component="h3"
                align='center'>
                    Current Inventory Value: 
                    <Typography 
                        variant='h5' 
                        component='h3' 
                        color='secondary'
                        align='center'>
                            ${props.runningTotal.toFixed(2)} 
                    </Typography>
            </Typography>
            <Typography component="p">
                
            </Typography>
        </Paper>
    )
}

export default RunningTotal;

