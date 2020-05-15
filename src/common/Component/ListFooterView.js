import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';

export class ListFooterViewControl {
  static show() {
  };

  static hide() {
  }
}

export class ListFooterView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { canLoadMore } = this.props;
    
    return (
      <View style={styles.indicatorContainer}>
        {
          canLoadMore ? (
                          <View>
                            <ActivityIndicator
                              style={styles.indicator}
                            />
                            <Text>正在加载...</Text>
                          </View>
                        ) :
                        (
                          <Text>没有更多数据了</Text>
                        )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }
})
