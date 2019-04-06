import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';
import { blueGrey, cyan, grey, pink, purple } from '@material-ui/core/colors';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'  
const styles = {
    card: {
        maxWidth: 345,
        marginTop: 50,
        marginLeft: 140,
    },
    media: {
        height: 525,
    },
    typography: {
        fontFamily: [
            'Iceland',
            'Russo One',
            'VT323',
            'Iceland',
            'Hind Madurai',
            'Roboto'
        ].join(',')
    }
};

const MediaCard = (props) => {
    const { classes } = props;
    return (
        <Card 
            className={classes.card}
            elevation={24}
        >

            <CardActionArea>

                <CardMedia
                    className={classes.media}
                    image={props.image}
                />

                <CardContent>

                    <Typography gutterBottom 
                        variant="h5" 
                        component="h2" 
                        align="center"
                        className={classes.typography}
                        style={{ fontFamily: 'Russo One' }}
                    >
                            {props.formInputs.brandStyle}
                    </Typography>

                    <Typography 
                        component="p" 
                        align="center"
                        style={{fontSize: 18, fontFamily: 'Iceland'}}
                    >
                        {props.tastingNotes}
                    </Typography>

                </CardContent>

            </CardActionArea>

            <CardActions>
                <Grid item xs 
                    align='center'
                >
                    <Button 
                        size="small" 
                        color="secondary"
                        style={{fontSize: 16, color: cyan[400] }}
                    >
                        {/* <AddShoppingCartIcon /> */}UPDATE ORDER
                    </Button>
                </Grid>

                {/* <Grid item xs 
                    align='right'
                    style={{marginRight: 50}}
                >
                    <Button size="small" color="primary" align="right">
                            Track
                    </Button> */}
                {/* </Grid> */}


            </CardActions>

        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);

