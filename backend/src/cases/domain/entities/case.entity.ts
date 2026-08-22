import { Coordinate } from '../value-objects/coordinate.vo';

export class Case {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly location: Coordinate,
    public readonly createdAt: Date,
  ) {}
}
