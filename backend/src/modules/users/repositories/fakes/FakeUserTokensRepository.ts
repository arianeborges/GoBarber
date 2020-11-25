import { v4 } from 'uuid';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.id = v4();
    userToken.token = v4();
    userToken.user_id = user_id;

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
