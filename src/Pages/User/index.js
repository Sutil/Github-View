import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

// import { Container } from './styles';

export default class User extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  constructor(props) {
    super(props);

    const { navigation } = props;

    this.user = navigation.getParam('user');
  }

  state = {
    stars: [],
    page: 1,
    noMoreItems: false,
    refreshing: false,
  };

  async componentDidMount() {
    const { user } = this;

    const response = await api.get(`users/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  loadMore = async () => {
    const { stars } = this.state;

    const { page } = this.state;
    const response = await api.get(
      `users/${this.user.login}/starred?page=${page + 1}`
    );

    const newStars = response.data;

    this.setState({
      stars: [...stars, ...newStars],
      page: page + 1,
      noMoreItems: newStars.length === 0,
    });
  };

  refresh = async () => {
    this.setState({ refreshing: true });

    const { user } = this;

    const response = await api.get(`users/${user.login}/starred`);

    this.setState({ stars: response.data, refreshing: false });
  };

  goToDetails = star => {
    const { navigation } = this.props;

    const { name, html_url: url } = star;

    navigation.push('Details', { star: { name, url } });
  };

  render() {
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    const { stars, noMoreItems, refreshing } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={noMoreItems ? null : 3}
          onEndReached={noMoreItems ? () => {} : this.loadMore}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.refresh}
              colors={['#fff', '#49265c', '#ff8b0d']}
              progressBackgroundColor="#765089"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.goToDetails(item);
              }}
            >
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            </TouchableOpacity>
          )}
        />
      </Container>
    );
  }
}
