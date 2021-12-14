"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = void 0;
var styles_1 = require("@mui/styles");
exports.useStyles = (0, styles_1.makeStyles)(function (theme) { return ({
    root: {
        width: "100%",
        height: "100%",
        position: "relative",
        background: "rgb(255, 255, 255)",
        borderBottom: function (props) { return props.isOnModal ? "1px solid #c3c3c3" : "none"; },
        boxShadow: function (props) { return props.isOnModal ? "none" : "rgb(43 52 69 / 10%) 0px 4px 16px"; },
        borderRadius: function (props) { return props.isOnModal ? "none" : "10px"; },
        padding: theme.spacing(2)
    },
    rowCartItem: {
        '& img': {
            width: "76px",
            height: "76px",
            objectFit: "cover"
        },
        '& .item-info': {
            '& h4.item-name': {
                fontWeight: "bold",
                fontSize: "14px",
                opacity: 0.9,
                maxWidth: "70%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.5rem",
                maxHeight: function (props) { return props.isOnModal ? "3rem" : "4.5rem"; }
            },
            '& .price': {
                fontWeight: "bold",
                fontSize: "14px",
                '&:last-child': {
                    color: theme.customColor.tomato.main
                }
            }
        }
    },
    rowIconButtons: {
        alignSelf: function (props) { return props.isOnModal ? "center" : "flex-end"; },
        '& .icon-button': {
            border: "1px solid " + theme.customColor.tomato.main,
            width: "25px",
            height: "25px",
            '& .cart-icon': {
                color: theme.customColor.tomato.main
            },
            '&:disabled': {
                border: "1px solid #c5c5c5",
                '& .cart-icon': {
                    color: "#c5c5c5"
                }
            },
        },
        '& .quantity': {
            color: theme.customColor.indigo.dark,
            fontWeight: "bold",
            fontSize: "15px",
            opacity: 0.9
        }
    },
    removedButton: {
        '&.MuiButtonBase-root': {
            position: "absolute",
            top: function (props) { return props.isOnModal ? "50%" : theme.spacing(2); },
            right: theme.spacing(2),
            transform: function (props) { return props.isOnModal ? "translateY(-50%)" : "translateY(0)"; },
            webkitTransform: function (props) { return props.isOnModal ? "translateY(-50%)" : "translateY(0)"; },
            mozTransform: function (props) { return props.isOnModal ? "translateY(-50%)" : "translateY(0)"; },
            msTransform: function (props) { return props.isOnModal ? "translateY(-50%)" : "translateY(0)"; },
            oTransform: function (props) { return props.isOnModal ? "translateY(-50%)" : "translateY(0)"; }
        }
    }
}); });
