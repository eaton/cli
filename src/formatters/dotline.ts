type Style = {
  width: number
  pad: string,
  floor: number,
  formatter?: (input: string) => string,
  debug: boolean,
};

const defaultStyle: Style = {
  width: 40,
  pad: '',
  floor: 1,
  debug: false,
}

const dots: Record<string, string> = {
  '0': ' ',  '1': '⡀', '2': '⡄',  '3': '⡆', '4': '⡇',
  '00': ' ', '01': '⢀', '02': '⢠', '03': '⢰', '04': '⢸',
  '10': '⡀', '11': '⣀', '12': '⣠', '13': '⣰', '14': '⣸',
  '20': '⡄', '21': '⣄','22': '⣤', '23': '⣴', '24': '⣼',
  '30': '⡆', '31': '⣆', '32': '⣦', '33': '⣶', '34': '⣾',
  '40': '⡇', '41': '⣇', '42': '⣧', '43': '⣷', '44': '⣿',
};

export function dotline(input: number[], options: Partial<Style> = {}) {
  const opt = { ...defaultStyle, ...options };

  const output = [...chunks(normalize(input, opt.floor, 4), 2)]
    .map(c => dots[c.join('')] ?? ' ')
    .slice(-1 * opt.width)
    .join('')
    .padEnd(opt.width, opt.pad);

  const debug = opt.debug ? `(${opt.width}, ${opt.floor}, ${input.length})` : '';
  return (opt.formatter ? opt.formatter(output) : output) + debug;
}

function normalize(values: number[], min: number, max: number) {
  const ratio = Math.max.apply(Math, values) / (max - min);
  return values.map(v => Math.round(v / ratio) + min);
};

function* chunks(input: number[], size: number) {
  for (let i = 0; i < input.length; i += size) {
    yield input.slice(i, i + size);
  }
}
