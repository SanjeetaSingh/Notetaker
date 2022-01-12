import { DARK_THEME,LIGHT_THEME} from "../constants";

/**
 * The function to toggle the dark mode.
 * 
 * @returns dark mode
 */
export const ToggleDarkTheme = () => ({
    type: DARK_THEME,
});

/**
 * The function to toggel the light mode.
 * 
 * @returns ligth mode
 */
export const ToggleLightTheme = () => ({
    type: LIGHT_THEME,
});

/**
 * Function toggles between the two themes.
 * 
 * @param {*} theme the theme inserted 
 * @returns the theme inserted into param
 */
export const ToggleTheme = (theme) => {
    return async (dispatch) => {
        if (theme === true) {
            dispatch(ToggleDarkTheme())
        } else {
            dispatch(ToggleLightTheme())
        }

    }
}