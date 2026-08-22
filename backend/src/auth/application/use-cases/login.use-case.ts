import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY } from '../../domain/ports/user.repository.port';
import type { IUserRepository } from '../../domain/ports/user.repository.port';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    if (user.passwordHash !== password) return null;
    return user;
  }
}
