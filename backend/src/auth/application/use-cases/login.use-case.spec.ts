import { IUserRepository } from '../../domain/ports/user.repository.port';
import { User } from '../../domain/entities/user.entity';
import { LoginUseCase } from './login.use-case';
import { sha256 } from '../../../shared/crypto';
import { DEMO_USER_EMAIL, DEMO_USER_PASSWORD } from '../../../shared/demo-user';

describe('LoginUseCase', () => {
  const existingUser = new User(
    'user-id',
    DEMO_USER_EMAIL,
    sha256(DEMO_USER_PASSWORD),
  );

  const buildUseCase = () => {
    const findByEmail = jest.fn().mockResolvedValue(null);
    const repository: IUserRepository = { findByEmail };
    return { useCase: new LoginUseCase(repository), findByEmail };
  };

  it('returns the user when credentials are valid', async () => {
    const { useCase, findByEmail } = buildUseCase();
    findByEmail.mockResolvedValue(existingUser);

    const result = await useCase.execute(DEMO_USER_EMAIL, DEMO_USER_PASSWORD);

    expect(findByEmail).toHaveBeenCalledWith(DEMO_USER_EMAIL);
    expect(result).toBe(existingUser);
  });

  it('returns null when the password does not match', async () => {
    const { useCase, findByEmail } = buildUseCase();
    findByEmail.mockResolvedValue(existingUser);

    const result = await useCase.execute(DEMO_USER_EMAIL, 'wrong-password');

    expect(result).toBeNull();
  });

  it('returns null when the email is unknown', async () => {
    const { useCase } = buildUseCase();

    const result = await useCase.execute(
      'unknown@issuesmap.com',
      DEMO_USER_PASSWORD,
    );

    expect(result).toBeNull();
  });
});
