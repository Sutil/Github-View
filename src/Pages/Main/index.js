import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  UserInfo,
  UserItemButton,
} from './styles';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = {
    title: 'Usuários',
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    try {
      const response = await api.get(`/users/${newUser}`);

      const exists = users.find(u => u.login === response.data.login);

      if (exists) {
        throw new Error('Usuário já inserido na lista');
      }

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
      });
    } catch (err) {
      this.setState({ loading: false });
    }

    Keyboard.dismiss();
  };

  handleDelete = user => {
    const { users } = this.state;

    const idx = users.findIndex(u => u.login === user.login);

    users.splice(idx, 1);

    this.setState({ users });
  };

  handleNavigation = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <UserItemButton
                onPress={() => {
                  this.handleNavigation(item);
                }}
              >
                <Avatar source={{ uri: item.avatar }} />
                <UserInfo>
                  <Name>{item.name}</Name>
                  <Bio>{item.login}</Bio>
                </UserInfo>
              </UserItemButton>
              <RectButton onPress={() => this.handleDelete(item)}>
                <Icon name="delete-forever" size={20} color="#ff8b0d" />
              </RectButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
