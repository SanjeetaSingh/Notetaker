import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet,VirtualizedList} from 'react-native';

const Data = [];

const getItem = (data, index) => ({
  title: `Title of Note \n`+
          'Date'
});

const getItemCount = (data) => 10;

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const dashboard = () => {
  return (
    <View style={styles.container}>
      <VirtualizedList
        data={Data}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor= {(item) => (item.key)} 
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#80ccff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});


  export default dashboard;

  
