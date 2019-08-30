import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class Details extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('star').name}`,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { navigation } = this.props;
    const star = navigation.getParam('star');
    return <WebView source={{ uri: star.url }} />;
  }
}
