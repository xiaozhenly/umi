function hexToRgba(hex: string): string {
  // 去掉 # 号
  hex = hex.replace('#', '');

  // 如果是缩写形式，扩展为完整形式
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  // 解析 R、G、B 三个分量
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // 返回 rgba 表示
  return `rgba(${r},${g},${b},1)`;
}
export default hexToRgba;
