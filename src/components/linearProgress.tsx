import React from 'react';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        </div>
    );
}