# MLA Node Gen
The MLA formatted PDF generator.

## Installation
This is an NPM package, so it can simply be installed like this:
```shell
$ npm install mla-node-gen
```

## Usage
In NodeJS:
```js
const { Doc, Paragraph } = require("mla-node-gen");

const doc = new Doc({
	title: "Example PDF",
	user: "Rick Astley",
	instructor: "Dwayne Johnson",
	course: "Dying 101",
	duedate: "22 February 2022"
});

const paragraph1 = new Paragraph(`According to all known laws of aviation...`);
const paragraph2 = new Paragraph(`We've known eachother for so long...`);
const paragraph3 = new Paragraph(`Somebody once told me the world is gonna roll me...`);

doc.addParagraph(paragraph1);
doc.addParagraph(paragraph2);
doc.addParagraph(paragraph3);

doc.export("example.pdf");
```

## Why use MLA Node Gen?
For those who are just a little too good for Google Docs or Microsoft Word, but won't stoop down to handwriting PDF code, this package is a quick and easy way to create PDF documents formatted in the most popular format.
