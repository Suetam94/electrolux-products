import { CeilPipe } from './ceil.pipe';

describe('CeilPipe', () => {
  let pipe: CeilPipe;

  beforeEach(() => {
    pipe = new CeilPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should round positive numbers with decimals up', () => {
    expect(pipe.transform(1.1)).toBe(2);
    expect(pipe.transform(1.9)).toBe(2);
  });

  it('should round negative numbers with decimals up', () => {
    expect(pipe.transform(-1.1)).toBe(-1);
    expect(pipe.transform(-1.9)).toBe(-1);
  });

  it('should return the same value for integers', () => {
    expect(pipe.transform(2)).toBe(2);
    expect(pipe.transform(-2)).toBe(-2);
  });

  it('should return 0 for input 0', () => {
    expect(pipe.transform(0)).toBe(0);
  });
});
