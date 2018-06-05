import React from 'react';
import { StyleSheet, Text, View, StatusBar, SectionList, TouchableOpacity, Alert } from 'react-native';
import { assign, find, findIndex, remove }  from 'lodash';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  componentDidMount(){
    fetch("https://runkit.io/milkte/ricepo-interview-endpoint/branches/master/:rest_id/menu")
    .then((res)=> res.json())
    .then((data)=>{
      data.options.forEach((option)=>{
        option.chosen = [];
        option.items.forEach((item)=>{
          item.quantity = 0;
        });
      });
      this.setState(data);
    });
  }
  _handleSubmitCheck(){
    return()=>{
      let { options, name } = this.state;
      let alert = "";
      let order = `${name} with \n`;
      options.forEach((option)=>{
        let { min, chosen} = option;
        let itemName = option.name;
        //add to alert if not meeting requiring min
        if(min && chosen.length < min){
          alert += `Please at least choose ${min} ${itemName} \n`;
        }else{
          let items = chosen.join(" ");
          order += `${itemName}: ${items} \n`;
        }
      });
      //alert will hold alert message if any of items not meeting requiring min
      if(alert){
        Alert.alert(
          'Hi Dear',
          alert,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        );
        //passed check, ready to place order
      }else{
        Alert.alert(
          'Your Order',
          order,
          [
            {text: 'Confirm', onPress: () => console.log('OK Pressed')},
            {text: 'Modify', onPress: () => console.log('Modify Pressed')},
          ]
        );
      }
    };
  }

  _handleQuantity(operation,title,name,addPrice,max){
    return ()=>{
      let {options} = this.state;
      let index = findIndex(options,{"name":title});
      let currentOption = options[index];
      let chosenArr = currentOption.chosen;
      let adjustQuanAndState = (delta)=>{
        //find clicked subitem in options
        let subChoiceA = find(currentOption.items,{name:name});
        //add quantity to this item
        subChoiceA.quantity = subChoiceA.quantity + delta;
        //update options with changed item
        options[index] = currentOption;
        //adjust price
        let totalPrice = prevPrice + (addPrice * delta);
        //change state with the new info
        this.setState({price:totalPrice,options:options});
      };
      let prevPrice = this.state.price;
      //when operation is add, handle array/delta change
      if(operation === "add"){
        // when max not reached or no max
        if(!max || chosenArr.length < max){
          chosenArr.push(name);
          adjustQuanAndState(1);
        }else{//when reach max
          for(let i = 0; i < chosenArr.length; i++){
            let a = chosenArr[i];
            if(chosenArr[i]===name){
              continue;
            }else{
              let removedChoice = chosenArr.splice(i,1)[0];
              //reduce removed choice quantity
              let subChoiceB = find(currentOption.items,{name:removedChoice});
              subChoiceB.quantity = subChoiceB.quantity - 1;
              //adjust price
              prevPrice = prevPrice - subChoiceB.price;
              chosenArr.push(name);
              adjustQuanAndState(1);
              return;
            }
          }
          Alert.alert(
            'Hi Dear',
            'No',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          return;
        }
      }else{
        //remove clicked subitem from chosenArr
        remove(chosenArr,(n)=> n === name);
        adjustQuanAndState(-1);
      }
    };
  }
  _renderItem(){
    return({item, section})=>{
      let title = section.title;
      let max = section.max;
      let { price, name, quantity } = item;
      let showPrice = (price/100).toFixed(2);
      let quanCircle;
      //hide quantity if 0, prevent from quantity going below 0
      if(quantity){
        quanCircle = (
          <TouchableOpacity
          style={styles.itemQuan}
          onPress={this._handleQuantity("minus",title,name,price)}>
            <Text style={styles.quanNumber}>{quantity}</Text>
          </TouchableOpacity>
        );
      }
      //set item unclickable when not available
      if(item.available){
        return (
          <View style={styles.itemRow}>
            <TouchableOpacity
            style={styles.itemList}
            onPress={this._handleQuantity("add",title,name,price,max)}>
              <Text>{name}</Text>
              <Text>+{showPrice}</Text>
            </TouchableOpacity>
            {quanCircle}
          </View>
        );
      }else{
        return(<View style={[styles.itemList, styles.unavailableItemList]}>
          <Text>{item.name}</Text>
          <Text>+{showPrice}</Text>
          </View>);
        }
    };
  }
  render() {
    if(this.state.name){

      let price = this.state.price/100;
      //pretreat options for sectionList
      let choices = this.state.options.map((option)=>{
        return {title:option.name, data:option.items, max:option.max};
      });
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <View style={styles.header}>
            <Text style={styles.name}>{this.state.name}</Text>
            <TouchableOpacity
            style={styles.price}
            onPress={this._handleSubmitCheck()}>
              <Text>{price}</Text>
            </TouchableOpacity>
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
    }else{
      return(<View>No data</View>);
    }
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
    flexDirection:'row'
  },
  itemQuan:{
    width:25,
    height:25,
    borderRadius:20,
    borderWidth: 0.7,
    borderColor: 'black',
    alignItems:'center',
    marginTop: 14
  },
  quanNumber:{
    paddingTop:4
  }
});

// "name": "Signature Milk Tea",
// "price": 325,
// "options": [
//   {
//     "name": "Add On",
//     "min": 0,
//     "max": 2,
//     "chosen":[],
//     "items": [
//       {
//         "name": "bubble",
//         "price": 50,
//         "available": true,
//         "quantity":0
//       },
//       {
//         "name": "pudding",
//         "price": 50,
//         "available": true,
//         "quantity":0
//       }
//     ]
//   },
//   {
//     "name": "Tea",
//     "min": 1,
//     "max": 1,
//     "chosen":[],
//     "items": [
//       {
//         "name": "milk tea",
//         "price": 0,
//         "available": true,
//         "quantity":0
//       },
//       {
//         "name": "green milk tea",
//         "price": 0,
//         "available": true,
//         "quantity":0
//       }
//     ]
//   },
//   {
//     "name": "Size",
//     "min": 1,
//     "max": 1,
//     "chosen":[],
//     "items": [
//       {
//         "name": "Large",
//         "price": 0,
//         "available": true,
//         "quantity":0
//       },
//       {
  //         "name": "Medium",
  //         "price": 0,
  //         "available": true,
  //         "quantity":0
  //       }
  //     ]
  //   }
  // ]
  // };
