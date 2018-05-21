import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      "name": "Signature Milk Tea",
      "price": 325,
      "options": [
        {
          "name": "Add On",
          "min": 1,
          "max": 1,
          "items": [
            {
              "name": "bubble",
              "price": 50,
              "available": true
            },
            {
              "name": "pudding",
              "price": 50,
              "available": true
            }
          ]
        },
        {
          "name": "Tea",
          "min": 1,
          "max": 1,
          "items": [
            {
              "name": "milk tea",
              "price": 0,
              "avilable": true
            },
            {
              "name": "green milk tea",
              "price": 0,
              "avilable": true
            }
          ]
        },
        {
          "name": "Size",
          "min": 1,
          "max": 1,
          "items": [
            {
              "name": "Large",
              "price": 0,
              "avilable": true
            },
            {
              "name": "Medium",
              "price": 0,
              "avilable": true
            }
          ]
        }
      ]
    };
  }
  // componentDidMount(){
  //   fetch("https://runkit.io/milkte/ricepo-interview-endpoint/branches/master/:rest_id/menu",{method:'GET'})
  //   .then((res)=> res.json())
  //   .then((data)=>{
  //     this.setState(data);
  //     console.log(this.state);
  //   });
  // }
  render() {
    console.log(this.state);
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
