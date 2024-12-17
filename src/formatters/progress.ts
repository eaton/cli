type Style = {
  width: number
  style: string[],
  floor: number,
  formatter?: (input: string) => string,
  debug: boolean,
};

export const ProgressStyles = {
  ascii: ['-', '#'],
  bullet: ['◌', '●'],
  debug: ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X'],
  fraction: ['0', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞', '1'],
  dot: [' ', '⡀', '⡄', '⡆', '⡇', '⣇', '⣧', '⣷', '⣿'],
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

export function progressBar(current = 0, max = 100, options: Partial<Style> = {}) {
  const opt = { ...defaultStyle, ...options };
  if (opt.debug && !options.style) {
    opt.style = ProgressStyles.debug;
  }

  if (opt.style.length === 0) {
    opt.style.push('', '#');
  } else if (opt.style.length === 1) {
    opt.style.unshift('');
  }

  const empty = opt.style[0];
  const full = opt.style[opt.style.length - 1];

  const percentCompleted = current/(Math.max(current, max));

  const totalFilledLength = opt.width * percentCompleted; // Full length, including partial segment

  // Determine the integer and fractional parts of the filled length
  const filledLength = Math.floor(totalFilledLength); // Complete segments
  const partialIndex = Math.floor(
    (totalFilledLength - filledLength) * opt.style.length,
  );

  // Create the filled, partial, and empty parts of the bar
  const filledBar = full.repeat(filledLength);
  const partialBar = partialIndex > 0 ? opt.style[partialIndex] : ''; // Select a partial character if needed
  const emptyLength = opt.width - filledLength - (partialBar ? 1 : 0);
  const emptyBar = emptyLength > 0 ? empty.repeat(emptyLength) : '';

  const output = `${filledBar}${partialBar}${emptyBar}`;

  // Debug stuff
  const debug = opt.debug ? ` (${opt.width}, ${current}/${max}, ${output.length}, ${filledBar.length}, ${partialBar.length}, ${emptyLength})` : ''

  return output + debug;
}