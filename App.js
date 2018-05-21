import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

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
    let price = this.state.price/100;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Text style={styles.name}>{this.state.name}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header:{
    backgroundColor:'pink',
    width:'100%',
    height:45,
    paddingTop:10,
  },
  name:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  price:{
    position:'absolute',
    right:0,
    marginRight:20,
    paddingTop:13
  }
});
