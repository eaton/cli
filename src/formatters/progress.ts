type Style = {
  width: number
  style: string[],
  floor: number,
  formatter?: (input: string) => string,
  debug: boolean,
};

export const ProgressStyles = {
  ascii: ['-', '#'],
  bullets: ['◌', '●'],
  debug: ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X'],
  dots: [' ', '⡀', '⡄', '⡆', '⡇', '⣇', '⣧', '⣷', '⣿'],
  dotline: ['⠒', '⠖', '⠗', '⠷', '⠿'],
  grow: ['', '█'],
  hfill: [' ', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'],
  line: ['┈', '━'],
  shaded: [' ', '░', '▒', '▓', '█'],
  simple: ['░', '█'],
  vfill: [' ', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'],
};

const defaultStyle: Style = {
  width: 40,
  style: ProgressStyles.hfill,
  floor: 1,
  debug: false,
}

export function progressBar(progress = 0, total = 100, options: Partial<Style> = {}) {
  const opt = { ...defaultStyle, ...options };

  if (opt.style.length === 0) {
    opt.style.push('#');
  }

  if (opt.style.length === 0) {
    opt.style.push('', '#');
  } else if (opt.style.length === 1) {
    opt.style.unshift('');
  }

  const empty = opt.style[0];
  const full = opt.style[opt.style.length - 1];

  const percentCompleted = progress/total;

  const totalFilledLength = opt.width * percentCompleted; // Full length, including partial segment

  // Determine the integer and fractional parts of the filled length
  const filledLength = Math.floor(totalFilledLength); // Complete segments
  const partialIndex = Math.floor(
    (totalFilledLength - filledLength) * opt.style.length,
  );

  // Create the filled, partial, and empty parts of the bar
  const filledBar = full.repeat(filledLength);
  const partialBar = partialIndex > 0 ? opt.style[partialIndex] : ''; // Select a partial character if needed
  const emptyLength = opt.width - filledLength - partialBar.length;
  const emptyBar = emptyLength > 0 ? empty.repeat(emptyLength) : '';

  const output = `${filledBar}${partialBar}${emptyBar}`;
  const debug = opt.debug ? ` (${opt.width}, ${output.length}, ${filledLength}, ${partialBar.length}, ${emptyLength})` : ''

  return output + debug;
}