import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserSchema {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('character varying', { unique: true })
  email!: string;

  @Column('character varying', { name: 'password_hash' })
  passwordHash!: string;
}
