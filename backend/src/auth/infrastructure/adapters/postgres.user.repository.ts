import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/ports/user.repository.port';
import { UserSchema } from '../schemas/user.schema';

export class PostgresUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<UserSchema>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const schema = await this.repository.findOneBy({ email });
    if (!schema) return null;
    return new User(schema.id, schema.email, schema.passwordHash);
  }
}
