import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserSchema } from '../schemas/user.schema';
import { PostgresUserRepository } from './postgres.user.repository';

describe('PostgresUserRepository', () => {
  const makeSchema = (): UserSchema => {
    const schema = new UserSchema();
    schema.id = 'user-id';
    schema.email = 'admin@issuesmap.com';
    schema.passwordHash = 'a-hash';
    return schema;
  };

  const buildRepository = () => {
    const orm = {
      findOneBy: jest.fn(),
    };
    const repository = new PostgresUserRepository(
      orm as unknown as Repository<UserSchema>,
    );
    return { repository, orm };
  };

  it('returns the user found by email mapped to the domain', async () => {
    const { repository, orm } = buildRepository();
    orm.findOneBy.mockResolvedValue(makeSchema());

    const result = await repository.findByEmail('admin@issuesmap.com');

    expect(orm.findOneBy).toHaveBeenCalledWith({
      email: 'admin@issuesmap.com',
    });
    expect(result).toBeInstanceOf(User);
    expect(result).toMatchObject({
      id: 'user-id',
      email: 'admin@issuesmap.com',
      passwordHash: 'a-hash',
    });
  });

  it('returns null when the email is unknown', async () => {
    const { repository, orm } = buildRepository();
    orm.findOneBy.mockResolvedValue(null);

    const result = await repository.findByEmail('unknown@issuesmap.com');

    expect(result).toBeNull();
  });
});
