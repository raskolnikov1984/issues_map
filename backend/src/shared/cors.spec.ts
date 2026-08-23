import { parseCorsOrigins } from './cors';

describe('parseCorsOrigins', () => {
  it('devuelve los orígenes por defecto cuando la variable no está definida', () => {
    expect(parseCorsOrigins(undefined)).toEqual([
      'http://localhost:5173',
      'http://localhost:3000',
    ]);
  });

  it('devuelve los orígenes por defecto cuando la variable está vacía', () => {
    expect(parseCorsOrigins('')).toEqual([
      'http://localhost:5173',
      'http://localhost:3000',
    ]);
  });

  it('separa y recorta los orígenes configurados', () => {
    expect(
      parseCorsOrigins(' https://app.example.com , http://localhost:4200 '),
    ).toEqual(['https://app.example.com', 'http://localhost:4200']);
  });

  it('descarta entradas vacías', () => {
    expect(parseCorsOrigins('http://a.com,,http://b.com')).toEqual([
      'http://a.com',
      'http://b.com',
    ]);
  });

  it('permite todos los orígenes con el comodín *', () => {
    expect(parseCorsOrigins('*')).toBe(true);
  });
});
