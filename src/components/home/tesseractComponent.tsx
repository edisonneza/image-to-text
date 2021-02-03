import React, { useEffect } from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import Tesseract from "tesseract.js";

import Grid from "@material-ui/core/Grid";
import { LinearProgressWithLabel } from '../linearProgress';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    textContainer: {
        padding: 15
    }
}));

interface ITesseractProps {
    imageSource?: string
}

export default function TesseractComponent(props: ITesseractProps) {
    const { imageSource } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    const [textFromImage, setTextFromImage] = React.useState<String>(`Mild Splendour of the various-vested Night!
    Mother of wildly-working visions! haill
    I watch thy gliding, while with watery light
    Thy weak eye glimmers through a fleecy veil;
    And when thou lovest thy pale orb to shroud
    Behind the gather’d blackness lost on high;
    And when thou dartest from the wind-rent cloud
    Thy placid lightning o’er the awaken’d sky.`);
    const [progress, setProgress] = React.useState<number>(0);

    useEffect(() => {
        if (imageSource) {
            // Tesseract.recognize(
            //     'https://tesseract.projectnaptha.com/img/eng_bw.png',
            //     'eng',
            //     { logger: m => console.log('logger: ', m) }
            //   ).then(({ data: { text } }) => {
            //     console.log('text: ', text);
            //     setTextFromImage(text);
            //   });
        }
    }, []);

    if(!imageSource)
        return (<p className={classes.textContainer}>Please select an image...</p>);

    return (
        <Grid container className={classes.textContainer}>
            {textFromImage}
        </Grid>
    );
};