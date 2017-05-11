import React, {Component} from 'react';
import {
  Text,
  View,
  Drawer
} from 'native-base';

class Sidebar extends Component {
  render(){
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this.navigator} />}
          onClose={() => this.closeDrawer()} >
        <View>
          <Text>
            Test
          </Text>
        </View>
      </Drawer>


    )
  }
}

export default Sidebar
