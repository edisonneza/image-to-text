import React, { useEffect, useRef, useState } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import { Button, Paper, TextField } from "@material-ui/core";
import TesseractComponent from './tesseractComponent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { IHTMLFileType } from "../../utils/interfaces/interfaces";

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
        minHeight: '50vh'
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
    const [buttonText, setButtonText] = useState<string>(t('upload_file'));



    const handleInputFile = (e: any) => {
        // console.log(e);
        if (e.target.files.length) {
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
            setButtonText(t('upload_file'));
            setFile(undefined);
            setImageSource("");
        }

    }

    console.log('state: ', file)

    const handleRadioChange = (value: string) => {
        setInputType(value);
        setFile(undefined);
        setImageSource("");
        setButtonText(t('upload_file'));
        imgRef.current.src = "";
    };

    return (
        <Grid container>
            <Grid container direction="row" justify="center" className={classes.radio}>
                {/* <p style={{ textAlign: 'center' }}>{t("hello_welcome")}</p> */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">{t('select_input_type')}</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <Grid item xs={6} sm={6} lg={6}>
                            <FormControlLabel value="url" checked={inputType === 'url'} control={<Radio color="primary" />} label="URL" onClick={() => handleRadioChange('url')} />
                        </Grid>
                        <Grid item xs={6} sm={6} lg={6}>
                            <FormControlLabel value="file" checked={inputType === 'file'} control={<Radio color="primary" />} label="File" onClick={() => handleRadioChange('file')} />
                        </Grid>
                    </RadioGroup>
                </FormControl>

                <Grid container justify="center">
                    {inputType === 'file' ? <Grid item lg={12}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<CloudUploadIcon />}>
                            {buttonText}
                            <input type="file" hidden onChange={handleInputFile} />
                        </Button>
                    </Grid> :

                        <Grid item xs={12} sm={12} lg={6}>
                            <TextField
                                label={t('insert_url')}
                                fullWidth
                                value={imageSource}
                                onChange={(e) => setImageSource(e.target.value)}
                            />
                        </Grid>
                    }
                </Grid>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Paper className={classes.paper}>
                    <img ref={imgRef} src={imageSource} className={classes.img} alt={t('image_alt')} />
                </Paper>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Paper className={classes.paper}>
                    <TesseractComponent imageSource={imageSource ? imageSource : file} />
                </Paper>
            </Grid>


        </Grid>
    );
};