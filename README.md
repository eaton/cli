# Eaton's CLI Tools

A slowly evolving bundle of CLI helper tools that I use in various projects.

Half of it is my own stuff, half of it is just bundled and encapsulated versions
of other tools I've standardized on.

## Original

- `Progress`, a quick and dirty progress tracker that can estimate remaining time and render an attractive ASCII progress bar. It's designed to be used with other console tools, so it literally only renders a string at a specific width: displaying it is someone else's problem. In addition, it's entirely passive — no events or promises, just the calculating and rendering stuff.

## Bundled

- [ansi-escapes](https://github.com/sindresorhus/ansi-escapes) for cursor manipulation, clickable links, beeps, and so on.
- [clipboardy](https://github.com/sindresorhus/clipboardy) for copying and pasting action.
- [conf](https://github.com/sindresorhus/conf) for minimum viable config.
- [exit-hook](https://github.com/sindresorhus/exit-hook) to exit cleanly if a CLI process is killed.
- [log-update](https://github.com/sindresorhus/log-update) to manipulate one area of the console.
- [open](https://github.com/sindresorhus/open) to open a file or URL in the default application.
- [restore-cursor](https://github.com/sindresorhus/restore-cursor) to ensure the cursor comes back after the program closes.
- [terminal-size](https://github.com/sindresorhus/terminal-size) to get the size of the screen.
- [yoctocolors](https://github.com/sindresorhus/yoctocolors) to manipulate ANSI console colors and styles
- [tasuku](https://github.com/privatenumber/tasuku) to display progress for complex tasks and processes.
