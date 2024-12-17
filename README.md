# EatonFYI CLI Tools

A slowly evolving bundle of CLI helper tools that I use in various projects.

Half of it is my own stuff, half of it is just bundled and encapsulated versions
of other tools I've standardized on.

## Original Stuff

### Progress/Status formatters

The `sparkline()` and `dotline()` formatters take an array of numbers and spit out a rolling graph of the latest *n* values. This can be useful for tracking, say, throughput during a file transfer.

```ascii
sparkline: ▂▆▂█▆▇▄▂▃▄▆▆▅█▄▅█▇▅█▃▁█▄▄▅█▅▃▇▅▁▃▆▆▇▂▄▆▅
dotline:   ⣦⣷⣧⣠⣴⣶⣧⣾⣶⣧⣸⣤⣾⣦⣶⣠⣶⣇⣴⡆
```

The `progressBar()` formatter takes a 'current value' and a 'max value' and builds a simple progress bar using arbitrary characters. It supports a number of additional styles, but the 'default' style is smart enough to use UTF8 box characters to use partially-filled boxes to achieve higher-resolution updates with large target values. It's neat.

```ascii
default: █████████████▌
simple:  ███████████████░░░░░░░░░░░░░░░░░░░░░░░░░
ascii:   ###############-------------------------
line:    ━━━━━━━━┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
```

## Bundled

These libraries are ones I use frequently, and will probably be exposing or relying on. They're not explicitly exported yet, but I'll be getting there.

- [ansi-escapes](https://github.com/sindresorhus/ansi-escapes) for cursor manipulation, clickable links, beeps, and so on.
- [clipboardy](https://github.com/sindresorhus/clipboardy) for copying and pasting action.
- [exit-hook](https://github.com/sindresorhus/exit-hook) to exit cleanly if a CLI process is killed.
- [log-update](https://github.com/sindresorhus/log-update) to manipulate one area of the console.
- [open](https://github.com/sindresorhus/open) to open a file or URL in the default application.
- [restore-cursor](https://github.com/sindresorhus/restore-cursor) to ensure the cursor comes back after the program closes.
- [terminal-size](https://github.com/sindresorhus/terminal-size) to get the size of the screen.
- [yoctocolors](https://github.com/sindresorhus/yoctocolors) to manipulate ANSI console colors and styles
- [tasuku](https://github.com/privatenumber/tasuku) to display progress for complex tasks and processes.
