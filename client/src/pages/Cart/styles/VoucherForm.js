"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = void 0;
var styles_1 = require("@mui/styles");
exports.useStyles = (0, styles_1.makeStyles)(function (theme) { return ({
    root: {},
    label: {
        '&.MuiTypography-root': {
            fontWeight: "bold",
            fontSize: "14px",
            opacity: 0.9
        }
    },
    textarea: {
        width: "100%",
        outline: 0,
        resize: "none",
        padding: theme.spacing(1),
        borderRadius: "5px",
        border: function (props) { return props.isFilled
            ? "2px solid " + theme.customColor.tomato.main
            : "1px solid #c5c5c5"; },
        '&:focus': {
            border: "2px solid " + theme.customColor.tomato.main
        }
    },
    textField: {
        '& .MuiInputLabel-root': {
            fontSize: "14px",
        }
    },
    button: {
        '&.MuiButton-root': {
            border: "1px solid " + theme.customColor.tomato.main,
            color: theme.customColor.tomato.main,
            width: "100%",
            textTransform: "capitalize"
        }
    }
}); });
