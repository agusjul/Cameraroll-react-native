import React, { Component } from 'react';
import CameraRoll from "@react-native-community/cameraroll";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar, 
  PermissionsAndroid, 
  Platform,
  Image
} from 'react-native';

export default class App extends Component {

  state = {
    latestImage : []
  }

  hasAndroidPermission= async() => {
  const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

  tekantombol = async() =>{
    if (await this.hasAndroidPermission()){
      CameraRoll.getPhotos({
        first: 100,
        groupTypes: 'All'
      }).then(r => {
        console.log(r.edges[0].node.image);
        if (r.edges.length > 0) {
          console.log('loaded image');
          this.setState({ latestImage: r.edges });
        } else {
          console.log('User does not have photos');
        }
      }).catch((err) => {
        console.log('Error loading latest image ' + err);
      });
    }
   // console.log(await this.hasAndroidPermission())
  }

  render(){
    return(
      <View>
        <Button title="Aji" onPress={()=> this.tekantombol()}/>
        <ScrollView >
          <View style={{ flexDirection: 'row', flexWrap : 'wrap', justifyContent : 'center'}}>
              {this.state.latestImage.map((p, i) => {
                return (
                  <View 
                    key={i}
                  style={{width: '50%', height : 150, padding : 5}}>
                    <Image
                      
                      style={{
                        width : '100%',
                        height: '100%',
                      }}
                      source={{ uri: p.node.image.uri }}
                    />
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    );
  }
}