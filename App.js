import React from 'react';
import { StyleSheet, Text, View, StatusBar, SectionList } from 'react-native';

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
  _renderItem(item){
    console.log(item);
  }
  render() {
    let price = this.state.price/100;
    let choices = this.state.options.map((option)=>{return {titel:option.name,data:option.items}});
    console.log(choices);
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Text style={styles.name}>{this.state.name}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <SectionList
        sections={choices}
        renderItem={({item})=>{return <Text>{item.name}</Text>}}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
        />
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
    backgroundColor:'#fff4d3',
    width:'100%',
    height:60,
    paddingTop:20,
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
    paddingTop:22
  },
  sectionHeader:{
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor:'grey',
    width:'100%'
  }
});
