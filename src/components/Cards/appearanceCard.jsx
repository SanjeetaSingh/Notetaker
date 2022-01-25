import React from 'react';
import { Card, List, Switch } from 'react-native-paper';
import * as themeActions from "../../theme/redux/actions/theme.action";
import { useDispatch, useSelector } from "react-redux";

// imports from internal files
import appStyle from '../../style/components/cards/appearance'

/**
 * This function represents a Card component
 * for the settings.js file in the screens 
 * directory that shows a switch button for dark and
 * light mode inside a contained button. 
 * 
 * @returns a Card component with a switch button.
 */
function AppearanceCard() {
    const dispatch = useDispatch();
    const themeReducers = useSelector(({ themeReducer }) => themeReducer);

    return (
        <Card style={appStyle.toggle}>
            {/* This list item shows text on the center of the card and an icon on the left */}
            <List.Item
                title="Dark Mode"
                left={props => <List.Icon  {...props} icon="moon-waxing-crescent" />}
                //The right side of the card is a switch button for dark mode 
                right={() => <Switch value={themeReducers.theme} onValueChange={(val) => dispatch(themeActions.ToggleTheme(val))} />}
            />
        </Card>
    )
}

export default AppearanceCard;