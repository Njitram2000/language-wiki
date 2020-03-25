# language-wiki
A small website to keep notes on learning a language (Korean specifically).
Uses nodejs server to read and write to json file. All the rest is pure html + CommonJS + React
## Installation
- Install nodejs
- `npm install`
- `npm start`
- Copy `wiki.json.sample` to `wiki.json` which is in .gitignore. To keep your own wiki.json versioned, create a fork/branch and remove it from .gitignore
- Browse to http://localhost:45123

## Usage
The top search bar will filter all the notes using these fields, in this order importance (high to low):
- title
- tags
- examples
- source
- details

The plus sign is to create a new entry.
The pencil is to edit the current entry
The bin is to delete the current entry (will ask for confirmation)
The floppy disk is to save the current changes.

The korean flag toggles the Hangul keyboard. The keyboard will only show when a field is focussed for the first time. Pressing esc switches between Hangul and Roman alphabet while the keyboard is active.

Note that each "tag" is on a new line and the hashtag does **not** need to be typed.

## Techical details
The goal was to make a quick and simple app with as little non-browser functionality as possible. The nodejs server was unavoidable as modern browsers cannot read/write json from local files.
These are the files:
- `app.js` is the expressjs server
- `wiki.html` simply creates the html skeleton and includes all the files
- `styles.css` is the css
- The `hangul-keyboard` folder contains the code for the virtual keyboard. It is borrowed and modified from the keyboard on https://www.branah.com/korean
- `wiki.js` contains the full site contents. It is written with ReactJS and JSX and while there are multiple components, all of them are contained in this one file because splitting them up requires `require` or `import` which a browser does not understand (but nodejs does).

### Babel
If you open the developer's console in the browser, you will see a warning about babel. This is used to convert JXS to normal js because a browser does not understand it natively. On a real production website, this conversion would happen server-side but this is a local project so it doesn't matter as much. The huge upside is that if you edit any of the website files, you don't have to restart nodejs or compile anything. It simply works instantly.
