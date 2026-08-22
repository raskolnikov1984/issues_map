import { Coordinate } from './coordinate.vo';

describe('Coordinate', () => {
  it('creates a valid coordinate', () => {
    const coordinate = Coordinate.create(6.2442, -75.5812);

    expect(coordinate.latitude).toBe(6.2442);
    expect(coordinate.longitude).toBe(-75.5812);
  });

  it('rejects out-of-range latitude', () => {
    expect(() => Coordinate.create(91, 0)).toThrow(RangeError);
    expect(() => Coordinate.create(-91, 0)).toThrow(RangeError);
  });

  it('rejects out-of-range longitude', () => {
    expect(() => Coordinate.create(0, 181)).toThrow(RangeError);
    expect(() => Coordinate.create(0, -181)).toThrow(RangeError);
  });

  it('compares coordinates by value', () => {
    const a = Coordinate.create(1, 2);
    const b = Coordinate.create(1, 2);

    expect(a.equals(b)).toBe(true);
  });
});
