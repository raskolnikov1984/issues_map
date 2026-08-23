import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/ports/user.repository.port';
import { sha256 } from '../../../shared/crypto';
import {
  DEMO_USER_EMAIL,
  DEMO_USER_ID,
  DEMO_USER_PASSWORD,
} from '../../../shared/demo-user';

export class InMemoryUserRepository implements IUserRepository {
  private readonly users: User[] = [];

  constructor() {
    this.users.push(
      new User(DEMO_USER_ID, DEMO_USER_EMAIL, sha256(DEMO_USER_PASSWORD)),
    );
  }

  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.email === email) ?? null,
    );
  }
}
