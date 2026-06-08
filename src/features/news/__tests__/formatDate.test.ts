import { formatDate } from '../helpers/formatDate';

describe('formatDate', () => {
  it('formatea una fecha ISO en formato es-AR', () => {
    const result = formatDate('2026-06-15T12:00:00Z');
    expect(result).toContain('2026');
    expect(result).toContain('15');
  });

  it('incluye un nombre de dia de la semana en español', () => {
    // T12:00:00Z asegura que no haya ambiguedad de dia por zona horaria
    const result = formatDate('2026-06-15T12:00:00Z');
    const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const tieneDia = dias.some(d => result.toLowerCase().includes(d));
    expect(tieneDia).toBe(true);
  });

  it('incluye el nombre del mes en español', () => {
    const result = formatDate('2026-06-15T12:00:00Z');
    expect(result.toLowerCase()).toContain('junio');
  });

  it('no lanza excepcion con una fecha valida', () => {
    expect(() => formatDate('2026-01-01T12:00:00Z')).not.toThrow();
  });

  it('retorna un string no vacio', () => {
    const result = formatDate('2026-06-15T12:00:00Z');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
