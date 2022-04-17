import { CpfFormatPipe } from './cpfFormat.pipe';

describe('CpfFormatPipe', () =>
{
  it('create an instance', () =>
  {
    const pipe = new CpfFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
