ClTags
======

A Lightweight Node.JS module for parsing process.argv

### Code Example

```js
var tags = require("cltags");
var options = tags.parse(process.argv);
```

Thats really all their is to it, so for example if you ran your script with: 

```
node script_name search --recursive --filetype="js" demo search query
```

You would get back from the `tags.parse` command an object that looks like:

```js
{
  command: "search",
  filetype: "js",
  recursive: true,
  query: "demo search query"
}
```

### Other features

- **Defaults** - the second parameter is an optional list of defaults which will get returned in the object unless overridden
- **Short Formed Tags** - the third parameter is a list of replacements for short tags

All together it would look something like the following:

```js
var tags = require("cltags");

var defaults = {
  depth: 2,
  recursive: false
}

var replacements = {
  d: "depth",
  r: "recursive"
}

var options = tags.parse(process.argv, defaults, replacements);
```

You can then run something like: 

```
script_name -r
```

and get back an object like:

```js
{
  command: "",
  query: "",
  depth: 2,
  recursive: true
}
```
