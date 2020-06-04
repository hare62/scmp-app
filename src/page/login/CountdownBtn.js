import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';
import Constants from '../../utils/Constants';

// 默认倒计时时间
const defaultTime = 60;
// 默认倒计时间隔
const defaultInterval = 1000;

class CountdownBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: defaultTime,
      isClickable: true
    };

    this.handleBtnClick = this.handleBtnClick.bind(this);
    props.navigation.addListener('didFocus', () => { this.resetLoginStatus() });
  }

  resetLoginStatus = () =>{
    this.setState({
      isClickable: true
    })
  }

  clearTimer() {
    this.timer && clearInterval(this.timer);
  }

  resetState() {
    this.setState(() => ({
      time: defaultTime,
      isClickable: true
    }));
  }

  onCountdown() {
    if (this.state.time > 0) {
      this.setState((prevState) => ({
        time: --prevState.time
      }));
    }
    else {
      this.clearTimer();
      this.resetState();
    }
  }

  handleBtnClick() {
    this.setState(() => ({
      isClickable: false
    }));

    this.timer = setInterval(() => {
      this.onCountdown();
    }, defaultInterval);
    let { getVerificationCode } = this.props;
    getVerificationCode();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {

    const { text, isEdit } = this.props;
    const { isClickable, time } = this.state;

    return (
      <View style={styles.isEdit}>
        <TouchableOpacity
          onPress={() => { isClickable && isEdit ? this.handleBtnClick() : null }}
          disabled={(isClickable && isEdit) ? false : true}
        >
          <Text>
            {
              isClickable ? text : time
            }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  isEdit: {
    backgroundColor: '#41BD41',
    height: 40,
    justifyContent: 'center',
    width: 130,
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 20,
    borderColor: Constants.BORDER_COLOR,
    borderRadius: 5
  },
  isNotEdit: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 20,
    width: 130,
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 20,
    borderColor: Constants.BORDER_COLOR,
    borderRadius: 5
  },
})

export default CountdownBtn;