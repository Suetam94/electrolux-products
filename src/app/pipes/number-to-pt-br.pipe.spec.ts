
import { NumberToPtBrPipe } from './number-to-pt-br.pipe';

describe('NumberToPtBrPipe', () => {
  let pipe: NumberToPtBrPipe;

  beforeEach(() => {
    pipe = new NumberToPtBrPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format positive numbers correctly', () => {
    expect(pipe.transform(1234.56)).toBe('1.234,56');
    expect(pipe.transform(0.1)).toBe('0,10');
  });

  it('should format negative numbers correctly', () => {
    expect(pipe.transform(-1234.56)).toBe('-1.234,56');
    expect(pipe.transform(-0.1)).toBe('-0,10');
  });

  it('should handle numbers with excessive decimal places', () => {
    expect(pipe.transform(1234.56789)).toBe('1.234,57');
    expect(pipe.transform(-1234.56789)).toBe('-1.234,57');
  });

  it('should handle integers correctly', () => {
    expect(pipe.transform(1234)).toBe('1.234,00');
    expect(pipe.transform(-1234)).toBe('-1.234,00');
  });

  it('should return an empty string for null or undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should format zero correctly', () => {
    expect(pipe.transform(0)).toBe('0,00');
  });
});
