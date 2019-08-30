import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
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
    loading: true,
    page: 1,
    noMoreItems: false,
    refreshing: false,
  };

  async componentDidMount() {
    const { user } = this;

    const response = await api.get(`users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false });
  }

  loadMore = async () => {
    const { stars } = this.state;

    const { page } = this.state;
    this.setState({ loading: true });
    const response = await api.get(
      `users/${this.user.login}/starred?page=${page + 1}`
    );

    const newStars = response.data;

    this.setState({
      loading: false,
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

    const { stars, loading, noMoreItems, refreshing } = this.state;

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
          onEndReachedThreshold={noMoreItems ? null : 0.2}
          onEndReached={noMoreItems ? () => {} : this.loadMore}
          onRefresh={this.refresh}
          refreshing={refreshing}
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
        {loading && <ActivityIndicator size={50} color="#ff8b0d" />}
      </Container>
    );
  }
}
