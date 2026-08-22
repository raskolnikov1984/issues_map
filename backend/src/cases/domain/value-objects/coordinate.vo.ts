export class Coordinate {
  private constructor(
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}

  static create(latitude: number, longitude: number): Coordinate {
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      throw new RangeError(`Invalid latitude: ${latitude}`);
    }
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      throw new RangeError(`Invalid longitude: ${longitude}`);
    }
    return new Coordinate(latitude, longitude);
  }

  equals(other: Coordinate): boolean {
    return (
      this.latitude === other.latitude && this.longitude === other.longitude
    );
  }
}
