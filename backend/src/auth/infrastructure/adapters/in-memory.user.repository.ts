import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/ports/user.repository.port';

export class InMemoryUserRepository implements IUserRepository {
  private readonly users: User[] = [];

  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.email === email) ?? null,
    );
  }
}
