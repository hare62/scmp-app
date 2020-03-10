import React, { Component } from 'react';
import { 
  TouchableOpacity,
  Text
} from 'react-native';

// 默认倒计时时间
const defaultTime = 3;
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
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const { text } = this.props;
    const { isClickable, time } = this.state;

    return (
      <TouchableOpacity
        onPress={() => { isClickable ? this.handleBtnClick() : null }}
      >
        <Text>
          {
            isClickable ? text : time
          }
        </Text>
      </TouchableOpacity>
    );
  }
};

export default CountdownBtn;