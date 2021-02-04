import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from "react-i18next";
import { Divider } from '@material-ui/core';


type AlertDialogProps = {
    open: boolean,
    handleClose: any
}

export default function AlertDialog({ open, handleClose }: AlertDialogProps) {
    const { t } = useTranslation();

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{t('about_title')} <i style={{ fontWeight: 150, fontSize: 16 }}> v.1.0</i></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('about_1')}<br />

                        {t('about_2')}<br />

                        <b>{t('about_3')}</b> <br />

                        {t('about_4')} <br /> <br />

                        {t('about_5')} <br />

                        {t('about_6')}
                        <Divider style={{ margin: '10px 0' }} />
                        <div style={{ textAlign: 'center' }}>
                            &copy; Edison Neza - <a href="https://edisonneza.github.io" target="_blank" rel="noreferrer"> edisonneza.github.io </a>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        {t('close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
