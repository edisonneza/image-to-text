import React from "react";
import { useTranslation } from "react-i18next";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

type LanguageType = { value: string, label: string };

type ImageLanguageComponentType = {
    handleImageLanguage?: Function
};

const ImageLanguageSelector = (props: ImageLanguageComponentType) => {
    // console.log(props);
    const { handleImageLanguage } = props;
    const selected = localStorage.getItem("imageLang") || "eng";
    const { t } = useTranslation();

    let initialValue: any;
    const [menuAnchor, setMenuAnchor] = React.useState(initialValue);

    return (
        <div style={{ margin: 6 }}>
            <Button size="small" onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
                {languageMap.filter(item => item.value === selected)[0].label}
                <ArrowDropDown fontSize="small" />
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <div>
                    <List>
                        <ListSubheader>{t("select_image_language")}</ListSubheader>
                        {languageMap.map((item: LanguageType) => {
                            return (
                                <ListItem button key={item.value} onClick={() => {
                                    localStorage.setItem('imageLang', item.value);
                                    setMenuAnchor(null);
                                    if(handleImageLanguage)
                                        handleImageLanguage(item.value);
                                }}>
                                    {item.label}
                                </ListItem>
                            )
                        })}

                    </List>
                </div>
            </Popover>
        </div>
    );
};

export default ImageLanguageSelector;

const languageMap: LanguageType[] = [
    {
        "value": "sqi",
        "label": "Albanian"
    },
    {
        "value": "eng",
        "label": "English"
    },
    {
        "value": "afr",
        "label": "Afrikaans"
    },
    {
        "value": "ara",
        "label": "Arabic"
    },
    {
        "value": "aze",
        "label": "Azerbaijani"
    },
    {
        "value": "bel",
        "label": "Belarusian"
    },
    {
        "value": "ben",
        "label": "Bengali"
    },
    {
        "value": "bul",
        "label": "Bulgarian"
    },
    {
        "value": "cat",
        "label": "Catalan"
    },
    {
        "value": "ces",
        "label": "Czech"
    },
    {
        "value": "chi_sim",
        "label": "Chinese"
    },
    {
        "value": "chi_tra",
        "label": "Traditional Chinese"
    },
    {
        "value": "chr",
        "label": "Cherokee"
    },
    {
        "value": "dan",
        "label": "Danish"
    },
    {
        "value": "deu",
        "label": "German"
    },
    {
        "value": "ell",
        "label": "Greek"
    },
    {
        "value": "enm",
        "label": "English (Old)"
    },
    {
        "value": "meme",
        "label": "Internet Meme"
    },
    {
        "value": "epo",
        "label": "Esperanto"
    },
    {
        "value": "epo_alt",
        "label": "Esperanto alternative"
    },
    {
        "value": "equ",
        "label": "Math"
    },
    {
        "value": "est",
        "label": "Estonian"
    },
    {
        "value": "eus",
        "label": "Basque"
    },
    {
        "value": "fin",
        "label": "Finnish"
    },
    {
        "value": "fra",
        "label": "French"
    },
    {
        "value": "frk",
        "label": "Frankish"
    },
    {
        "value": "frm",
        "label": "French (Old)"
    },
    {
        "value": "glg",
        "label": "Galician"
    },
    {
        "value": "grc",
        "label": "Ancient Greek"
    },
    {
        "value": "heb",
        "label": "Hebrew"
    },
    {
        "value": "hin",
        "label": "Hindi"
    },
    {
        "value": "hrv",
        "label": "Croatian"
    },
    {
        "value": "hun",
        "label": "Hungarian"
    },
    {
        "value": "ind",
        "label": "Indonesian"
    },
    {
        "value": "isl",
        "label": "Icelandic"
    },
    {
        "value": "ita",
        "label": "Italian"
    },
    {
        "value": "ita_old",
        "label": "Italian (Old)"
    },
    {
        "value": "jpn",
        "label": "Japanese"
    },
    {
        "value": "kan",
        "label": "Kannada"
    },
    {
        "value": "kor",
        "label": "Korean"
    },
    {
        "value": "lav",
        "label": "Latvian"
    },
    {
        "value": "lit",
        "label": "Lithuanian"
    },
    {
        "value": "mal",
        "label": "Malayalam"
    },
    {
        "value": "mkd",
        "label": "Macedonian"
    },
    {
        "value": "mlt",
        "label": "Maltese"
    },
    {
        "value": "msa",
        "label": "Malay"
    },
    {
        "value": "nld",
        "label": "Dutch"
    },
    {
        "value": "nor",
        "label": "Norwegian"
    },
    {
        "value": "pol",
        "label": "Polish"
    },
    {
        "value": "por",
        "label": "Portuguese"
    },
    {
        "value": "ron",
        "label": "Romanian"
    },
    {
        "value": "rus",
        "label": "Russian"
    },
    {
        "value": "slk",
        "label": "Slovakian"
    },
    {
        "value": "slv",
        "label": "Slovenian"
    },
    {
        "value": "spa",
        "label": "Spanish"
    },
    {
        "value": "spa_old",
        "label": "Old Spanish"
    },
    {
        "value": "srp",
        "label": "Serbian (Latin)"
    },
    {
        "value": "swa",
        "label": "Swahili"
    },
    {
        "value": "swe",
        "label": "Swedish"
    },
    {
        "value": "tam",
        "label": "Tamil"
    },
    {
        "value": "tel",
        "label": "Telugu"
    },
    {
        "value": "tgl",
        "label": "Tagalog"
    },
    {
        "value": "tha",
        "label": "Thai"
    },
    {
        "value": "tur",
        "label": "Turkish"
    },
    {
        "value": "ukr",
        "label": "Ukrainian"
    },
    {
        "value": "vie",
        "label": "Vietnamese"
    }
]