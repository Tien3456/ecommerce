"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = void 0;
var styles_1 = require("@mui/styles");
exports.useStyles = (0, styles_1.makeStyles)(function (theme) { return ({
    root: {},
    formControl: {
        '& .MuiOutlinedInput-root': {
            width: "100%"
        },
        '& .MuiInputLabel-root': {
            fontSize: "15px"
        },
        '& button': {
            width: "100%",
            textTransform: "capitalize",
            border: "1px solid " + theme.customColor.tomato.main,
            color: theme.customColor.tomato.main
        },
        '& .btn-link': {
            width: "100%",
            textTransform: "capitalize",
            color: "#fff",
            background: theme.customColor.tomato.main,
            '&:disabled': {
                color: "#fff"
            },
            '& a': {
                color: "inherit",
                textDecoration: "none"
            },
            '&:hover': {
                background: theme.palette.error.main
            }
        }
    }
}); });
