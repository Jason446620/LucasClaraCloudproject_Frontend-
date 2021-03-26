import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

//importing css
import './style.css';
import '../../../assets/styles/global.css';
import classes from '*.module.css';

export default function Loading() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                color: '#fff'
            },
        }),
    );

    const classes = useStyles();

    return (
        <div className="loading-container">
            <CircularProgress className={classes.root} color="inherit" />
        </div>
    );
}