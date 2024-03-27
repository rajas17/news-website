import { SliceSafeHtmlPipe } from './slice-safe-html.pipe';

describe('SliceSafeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SliceSafeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
