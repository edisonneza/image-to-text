import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import { Button, Paper, TextField } from "@material-ui/core";

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
    }
}));

export default function HomeComponent() {
    const { t } = useTranslation();
    const classes = useStyles();

    const [inputType, setInputType] = React.useState<String>("url");
    const [textFromImage, setTextFromImage] = React.useState<String>("");

    return (
        <Grid container spacing={2}>
            <Grid container direction="row" justify="center" className={classes.radio}>
                {/* <p style={{ textAlign: 'center' }}>{t("hello_welcome")}</p> */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">{t('select_input_type')}</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <Grid item lg={6}>
                            <FormControlLabel value="url" control={<Radio color="primary" />} label="URL" onClick={() => setInputType('url')} />
                        </Grid>
                        <Grid item lg={6}>
                            <FormControlLabel value="file" control={<Radio color="primary" />} label="File" onClick={() => setInputType('file')} />
                        </Grid>
                    </RadioGroup>
                </FormControl>

                <Grid container justify="center">
                    {inputType == 'file' ? <Grid item lg={12}>
                        <Button variant="contained" component="label">
                            {t('upload_file')}
                            <input type="file" hidden />
                        </Button>
                    </Grid> :

                        <Grid item lg={6}>
                            <TextField
                                label={t('insert_url')}
                                fullWidth

                            />
                        </Grid>
                    }
                </Grid>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Paper>
                    <img src="https://tesseract.projectnaptha.com/img/eng_bw.png" className={classes.img} />
                </Paper>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Paper>
                    <div>
                        {textFromImage}
                    </div>
                </Paper>
            </Grid>


        </Grid>
    );
};