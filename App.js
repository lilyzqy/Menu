import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {}
  }
  componentDidMount(){
    fetch("https://runkit.io/milkte/ricepo-interview-endpoint/branches/master/:rest_id/menu",{method:'GET'})
    .then((res)=> res.json())
    .then((data)=>{
      this.setState(data);
      console.log(this.state);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
