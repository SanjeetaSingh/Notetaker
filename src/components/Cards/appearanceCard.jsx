import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List, Switch} from 'react-native-paper';
import * as themeActions from "../../theme/redux/actions/theme.action";
import { useDispatch, useSelector } from "react-redux";

function AppearanceCard() {
    const dispatch = useDispatch();
    const themeReducers = useSelector(({ themeReducer }) => themeReducer);

    return (
        <Card style={styles.toggle}>
          <List.Item
            title="Dark Mode"
            left={props => <List.Icon  {...props} icon="moon-waxing-crescent" />}
            right={() => <Switch value={themeReducers.theme} onValueChange={(val) => dispatch(themeActions.ToggleTheme(val))} />}
          />
        </Card>
    )
}

const styles = StyleSheet.create({
    toggle: {
        backgroundColor: '#9AC4F8',
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },

})

export default AppearanceCard;