import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 15px 10px 5px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #49265c;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 30px;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
`;

export const UserItemButton = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const UserInfo = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
  margin-left: 10px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`;
export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
`;
export const Bio = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: left;
`;
