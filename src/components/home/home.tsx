import React, { useEffect, useRef, useState } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import { Accordion, AccordionDetails, AccordionSummary, Button, Paper, TextField, Snackbar } from "@material-ui/core";
import TesseractComponent from './tesseractComponent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { IHTMLFileType } from "../../utils/interfaces/interfaces";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isMobile } from "../../utils/functions";
import ImageLanguageSelector from "../imageLanguageSelector";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    radio: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    img: {
        maxWidth: '100%'
    },
    paper: {
        margin: 10,
        minHeight: '70vh'
    }
}));

export default function HomeComponent() {
    const { t } = useTranslation();
    const classes = useStyles();

    const [inputType, setInputType] = useState<string>("url");
    // const [imageSource, setImageSource] = React.useState<string>("https://tesseract.projectnaptha.com/img/eng_bw.png");
    const [imageSource, setImageSource] = useState<string>("");
    const [file, setFile] = useState<IHTMLFileType>();
    const imgRef = useRef<any>();
    // let pasteContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [buttonText, setButtonText] = useState<string>("");
    const [isUrlError, setIsUrlError] = useState<boolean>(false);
    const [imageLanguageSelected, setImageLanguageSelected] = useState<string>("");
    const [isImageFromClipboard, setIsImageFromClipboard] = useState<boolean>(true);

    const handleInputFile = (e: any) => {
        // console.log(e);
        if (e.target.files.length) {
            if (e.target.files[0].type && e.target.files[0].type.indexOf('image/') === -1) {
                alert(t('file_not_image'));
                return;
            }
            setImageSource('');
            setFile(e.target.files[0]);
            setButtonText(e.target.files[0].name);

            let reader = new FileReader();
            reader.onload = (e) => {
                // setImageSource(e.target.result);
                if (e.target)
                    imgRef.current.src = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setButtonText("");
            setFile(undefined);
            setImageSource("");
        }

    }

    const handleImageFromClipboard = (event: ClipboardEvent | any) => {
        if (!event || event.target.tagName === "INPUT" || event.target.tagName === "input") return false;

        var items: DataTransferItemList | [] = (event && event.clipboardData && event.clipboardData.items) || [];
        if (items && items.length) {
            let lastItem = items[0];
            if (lastItem.kind === "file" && lastItem.type.indexOf("image") > -1) {
                var blob = lastItem.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    let result: any = (event && event.target && event.target.result) || null;
                    setImageSource('');
                    setFile(result);
                    imgRef.current.src = result;
                };

                if (blob)
                    reader.readAsDataURL(blob);
            } else {
                setIsImageFromClipboard(false);
                setTimeout(() => setIsImageFromClipboard(true), 2500);
            }
        }
    }

    // console.log('state: ', file)

    const handleRadioChange = (value: string) => {
        setInputType(value);
        setFile(undefined);
        setImageSource("");
        setButtonText("");
        imgRef.current.src = "";
    };

    useEffect(() => {
        document.addEventListener('paste', (event) => handleImageFromClipboard(event));

        const delayInput = setTimeout(() => {
            //wait 1.5 sec until user stop typing
            if (imageSource.length > 5) {
                const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                const regexURL = new RegExp(expression);
                if (imageSource.match(regexURL))
                    setIsUrlError(false);
                else
                    setIsUrlError(true);
            }

        }, 1500);

        if (imageSource.length > 0 && imageSource.length < 5) {
            setIsUrlError(true);
        }

        return () => {
            clearTimeout(delayInput);
            document.removeEventListener('paste', handleImageFromClipboard);
        };
    }, [imageSource]);

    return (
        <Grid container>
            <Grid container direction="row" justify="center" className={classes.radio}>
                {/* <p style={{ textAlign: 'center' }}>{t("hello_welcome")}</p> */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">{t('select_input_type')}</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <Grid item xs={4} sm={4} lg={4}>
                            <FormControlLabel value="url" checked={inputType === 'url'} control={<Radio color="primary" />} label="URL" onClick={() => handleRadioChange('url')} />
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <FormControlLabel value="file" checked={inputType === 'file'} control={<Radio color="primary" />} label="File" onClick={() => handleRadioChange('file')} />
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <ImageLanguageSelector handleImageLanguage={setImageLanguageSelected} />
                        </Grid>
                    </RadioGroup>
                </FormControl>

                <Grid container justify="center">
                    {inputType === 'file' ? <Grid item lg={12}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}>
                            {buttonText ? buttonText : t('upload_file')}
                            <input type="file" hidden onChange={handleInputFile} accept="image/*" />
                        </Button>
                    </Grid> :

                        <Grid item xs={12} sm={12} lg={6}>
                            <TextField
                                error={isUrlError}
                                label={t('insert_url')}
                                fullWidth
                                value={imageSource}
                                onChange={(e) => setImageSource(e.target.value)}
                                helperText={isUrlError ? t('incorrect_url') : ''}
                            />
                        </Grid>
                    }
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} lg={6}>
                    {isMobile() &&
                        <Accordion defaultExpanded style={{ margin: 10 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <span>{t('image_panel')}</span>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img style={{ display: (imageSource || file) ? 'block' : 'none' }} ref={imgRef} src={imageSource} className={classes.img} alt={t('image_alt')} />
                                {(!imageSource && !file) && (
                                    <p style={{ padding: 15 }}>
                                        {t('no_image')} <br /> <br />
                                        {t('hint_image_paste')} 🙃
                                    </p>
                                )}
                            </AccordionDetails>
                        </Accordion>}

                    {!isMobile() &&
                        <Paper className={classes.paper}>
                            <div>
                                <img style={{ display: (imageSource || file) ? 'block' : 'none' }} ref={imgRef} src={imageSource} className={classes.img} alt={t('image_alt')} />
                                {(!imageSource && !file) && (
                                    <p style={{ padding: 15 }}>
                                        {t('no_image')} <br /> <br />
                                        {t('hint_image_paste')} 🙃
                                    </p>
                                )}
                            </div>
                        </Paper>}

                </Grid>

                <Grid item xs={12} lg={6}>
                    <Paper className={classes.paper}>
                        {!isUrlError && <TesseractComponent imageSource={imageSource ? imageSource : file} imageLanguage={imageLanguageSelected} />}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={!isImageFromClipboard}
                message={t('no_image_pasted')}
            />

        </Grid>
    );
};