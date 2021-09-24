import { DARK_THEME,LIGHT_THEME } from "../constants";

//Setting the initial state to false
const initialState = {
    theme: false
};

/**
 * Switch cases to switch between themes
 */
export default (theme = initialState,{ type }) => {
    switch (type) {
        case DARK_THEME:
            return { theme: true };
        case LIGHT_THEME:
            return { theme: false };
        default:
            return theme;
    }
};