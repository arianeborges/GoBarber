import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Header = styled.View`
  padding: 24px;
  margin-bottom: 140px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 54px;
  background: #28262e;
  z-index: 1;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
