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
  _renderItem({item}){
    let price = (item.price/100).toFixed(2);
    return (
      <View style={styles.itemList}>
        <Text>{item.name}</Text>
        <Text>+{price}</Text>
      </View>);
  }
  render() {
    let price = this.state.price/100;
    let choices = this.state.options.map((option)=>{return {title:option.name,data:option.items}});
    console.log(choices);
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Text style={styles.name}>{this.state.name}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.sectionList}>
          <SectionList
          sections={choices}
          renderItem={this._renderItem}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>Choose {section.title}</Text>}
          keyExtractor={(item, index) => index}
          />
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
    backgroundColor:'#fff4d3',
    width:'100%',
    height:'10%',
    paddingTop:22,
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
    paddingTop:24
  },
  sectionList:{
    width:'100%',
    height:'90%',
    paddingTop:10,
  },
  sectionHeader:{
    textAlign:'center',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine:'underline',
    width:'100%',
    height:20
  },
  itemList:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
    marginLeft:5
  }
});
