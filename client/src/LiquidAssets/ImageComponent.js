import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';

const styles = {
    card: {
        maxWidth: 345,
        marginTop: 50,
        marginLeft: 170,
    },
    media: {
        height: 525,
    },
};

const MediaCard = (props) => {
    const { classes } = props;
    return (
        <Card className={classes.card}>

            <CardActionArea>

                <CardMedia
                    className={classes.media}
                    image={require("../images/pappy15.jpg")}
                />

                <CardContent>

                    <Typography gutterBottom 
                        variant="h5" 
                        component="h2" 
                        align="center"
                    >
                            {props.formInputs.brandStyle}
                    </Typography>

                    <Typography 
                        component="p" 
                        align="center"
                    >
                        damn that shit is smooth!
                    </Typography>

                </CardContent>

            </CardActionArea>

            <CardActions>
                <Grid item xs 
                    align='left'
                    style={{marginLeft: 40}}
                >
                    <Button size="small" color="primary">
                        Add To Orders
                    </Button>
                </Grid>

                <Grid item xs 
                    align='right'
                    style={{marginRight: 50}}
                >
                    <Button size="small" color="primary" align="right">
                            Track
                    </Button>
                </Grid>


            </CardActions>

        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);

