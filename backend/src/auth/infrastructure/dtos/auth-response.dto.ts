import { User } from '../../domain/entities/user.entity';

export class AuthResponseDto {
  id!: string;
  email!: string;

  static from(user: User): AuthResponseDto {
    const dto = new AuthResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    return dto;
  }
}
