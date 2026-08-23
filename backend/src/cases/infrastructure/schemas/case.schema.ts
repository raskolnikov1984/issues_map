import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cases')
export class CaseSchema {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('character varying', { name: 'title' })
  title!: string;

  @Column('text', { name: 'description' })
  description!: string;

  @Column('double precision', { name: 'latitude' })
  latitude!: number;

  @Column('double precision', { name: 'longitude' })
  longitude!: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt!: Date;
}
