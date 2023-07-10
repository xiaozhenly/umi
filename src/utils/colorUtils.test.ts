import hexToRgba from './colorUtils';
// 单元测试
test('converts hex color to rgba', () => {
  expect(hexToRgba('#bdd2fd')).toBe('rgba(189,210,253,1)');
  expect(hexToRgba('#ffffff')).toBe('rgba(255,255,255,1)');
  expect(hexToRgba('#00b96b')).toBe('rgba(0,185,107,1)');
  expect(hexToRgba('#303841')).toBe('rgba(48,56,65,1)');
  expect(hexToRgba('#febc2e')).toBe('rgba(254,188,46,1)');
  expect(hexToRgba('#ff5f57')).toBe('rgba(255,95,87,1)');
});
