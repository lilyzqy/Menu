import React from 'react';
import { StyleSheet, Text, View, StatusBar, SectionList, TouchableOpacity } from 'react-native';
import { assign, find, findIndex }  from 'lodash';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      "name": "Signature Milk Tea",
      "price": 325,
      "options": [
        {
          "name": "Add On",
          "min": 0,
          "max": 2,
          "chosen":[],
          "items": [
            {
              "name": "bubble",
              "price": 50,
              "available": true,
              "quantity":0
            },
            {
              "name": "pudding",
              "price": 50,
              "available": true,
              "quantity":0
            }
          ]
        },
        {
          "name": "Tea",
          "min": 1,
          "max": 1,
          "chosen":[],
          "items": [
            {
              "name": "milk tea",
              "price": 0,
              "available": true,
              "quantity":0
            },
            {
              "name": "green milk tea",
              "price": 0,
              "available": true,
              "quantity":0
            }
          ]
        },
        {
          "name": "Size",
          "min": 1,
          "max": 1,
          "chosen":[],
          "items": [
            {
              "name": "Large",
              "price": 0,
              "available": true,
              "quantity":0
            },
            {
              "name": "Medium",
              "price": 0,
              "available": true,
              "quantity":0
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
  
  
  _onPress(title,name,max,addPrice){
    return ()=>{
      let {options} = this.state;
      let index = findIndex(options,{"name":title});
      let a = options[index];
      a.chosen.push(name);
      let subA = find(a.items,{name:name});
      subA.quantity = subA.quantity + 1;
      options[index] = a;
      let prevPrice = this.state.price;
      let totalPrice = prevPrice + addPrice;
      this.setState({price:totalPrice,options:options});
      console.log(this.state);
    };
  }
  _renderItem(){
    return({item, section})=>{
      let title = section.title;
      let max = section.max;
      let { price, name, quantity } = item;
      let showPrice = (price/100).toFixed(2);
      if(item.available){
        return (
          <View style={styles.itemRow}>
            <TouchableOpacity
            onPress={this._onPress(title,name,max,price)}>
              <View style={styles.itemList}>
                <Text>{name}</Text>
                <Text>+{showPrice}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.itemQuan}>
                <Text>{quantity}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }else{
        return(<View style={[styles.itemList, styles.unavailableItemList]}>
          <Text>{item.name}</Text>
          <Text>+{showPrice}</Text>
          </View>);
        }
    }
  }
  render() {
    let price = this.state.price/100;
    let choices = this.state.options.map((option)=>{
      return {title:option.name, data:option.items, max:option.max};
    });
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
          renderItem={this._renderItem()}
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
    paddingLeft:10,
    paddingRight:10,
    alignItems:'stretch',
    width:'100%',
  },
  unavailableItemList:{
    opacity:0.2
  },
  itemRow:{

  },
  itemQuan:{
    width:25,
    height:25,
    borderRadius:20,
    borderWidth: 0.7,
    borderColor: 'black',
    alignItems:'center',
    paddingTop: 4
  }
});
