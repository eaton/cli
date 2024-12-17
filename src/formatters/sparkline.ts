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

const bars = [' ', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

export function sparkline(input: number[], options: Partial<Style> = {}) {
  const opt = { ...defaultStyle, ...options };
  const ratio = Math.max.apply(Math, input) / (8 - opt.floor);

  const output = input
    .map(v => Math.round(v / ratio) + opt.floor)
    .map(v => bars[v])
    .slice(-1 * opt.width)
    .join('')
    .padEnd(opt.width, opt.pad);

    const debug = opt.debug ? `(${opt.width}, ${opt.floor}, ${input.length})` : '';
    return (opt.formatter ? opt.formatter(output) : output) + debug;
  }
