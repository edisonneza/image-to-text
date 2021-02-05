import React, { useEffect } from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import Tesseract, { createWorker } from "tesseract.js";
import { Grid, Button } from "@material-ui/core";
import { LinearProgressWithLabel } from '../linearProgress';
import { Divider, LinearProgress } from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { copyToClipboard } from '../../utils/functions';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../alertComponent';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    textContainer: {
        padding: 15
    }
}));

interface ITesseractProps {
    imageSource?: any,
    imageLanguage?: string
}

export default function TesseractComponent(props: ITesseractProps) {
    const { imageSource, imageLanguage } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    const [textFromImage, setTextFromImage] = React.useState<string>("");
    const [progress, setProgress] = React.useState<number>(-1);
    const [textCopied, setTextCopied] = React.useState<boolean>(false);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    useEffect(() => {
        let worker: Tesseract.Worker;
        if (imageSource) {
            setProgress(0);
            setTextFromImage("");
            setIsLoading(true);

            // Tesseract.recognize(
            //     imageSource,
            //     'sqi',
            //     {
            //         logger: m => {
            //             console.log('logger: ', m);
            //             if (m.status === "recognizing text") {
            //                 setProgress(m.progress * 100);
            //             }
            //         }
            //     }
            // ).then(({ data: { text } }) => {
            //     console.log('text: ', text);
            //     setTextFromImage(text);
            // }).catch(error => {
            //     console.log('error', error);
            //     setErrorMessage(error.toString());
            //     setIsError(true);
            //     setIsLoading(false);

            //     // setTimeout(() => setErrorMessage(""), 3000);
            // })

            worker = createWorker({
                logger: m => {
                    // console.log(m);
                    if (m.status === "recognizing text") {
                        setProgress(m.progress * 100);
                    }
                }
            });

            (async () => {
                try {
                    await worker.load();
                    await worker.loadLanguage(imageLanguage || 'eng');
                    await worker.initialize(imageLanguage || 'eng');
                    const { data } = await worker.recognize(imageSource);
                    // console.log('data', data);
                    // console.log('text', data.text);
                    setTextFromImage(data.text);
                    await worker.terminate();
                } catch (error) {
                    console.log('error', error);
                    // setErrorMessage(error.toString());
                    setErrorMessage(t('error_cors_or_other'));
                    setIsError(true);
                    setIsLoading(false);

                    setTimeout(() => setIsError(false), 3000);
                }
            })();
        }

        return () => {
            if (worker)
                (async () => await worker.terminate())(); //end the current process if user adds new image
        }
    }, [imageSource, imageLanguage]);

    const copyText = () => {
        copyToClipboard(textFromImage);
        setTextCopied(true);

        setTimeout(() => setTextCopied(false), 1500);
    }

    if (!imageSource)
        return (<p className={classes.textContainer}>{t('please_select_image')}</p>);

    return (
        <Grid container className={classes.textContainer}>
            <Grid item style={{ width: '100%'}}>
                {(isLoading && progress !== 100) && (
                    <>
                        {progress > 0 ? <LinearProgressWithLabel value={progress} /> : <LinearProgress />}
                        <Divider style={{ margin: '12px 0' }} />
                    </>
                )}

                {textFromImage &&
                    (
                        <>
                            <pre style={{fontFamily: 'inherit', fontSize: 14, overflowX: 'auto'}}>
                                {textFromImage}
                            </pre>
                            < Divider style={{ margin: '12px 0' }} />
                            <Grid container justify="flex-end">
                                <Button
                                    variant="contained"
                                    color="default"
                                    startIcon={<FileCopyIcon />}
                                    size="small"
                                    onClick={copyText}
                                >
                                    {t('copy')}
                                </Button>
                            </Grid>
                        </>
                    )}

                {(!isLoading && errorMessage) && <p style={{ textAlign: 'center', color: 'tomato' }}>{t('error_occurred')}</p>}

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={textCopied}
                    message={t('text_copied')}
                />

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={isError}
                    message={t('text_copied')}
                >
                    <Alert onClose={() => setIsError(false)} severity="error">
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
};