# URLs List Opener

This is a little application to open a list o URLs and extract data from its content.

## How to use it

- Write your URLs inside `list.txt` separated by a new line.
- Open `single.php` and edit "Data delimiters" variables to find what you are looking for.
- (optional) Open `index.html` and edit `opener` properties in JS (see below).

### JS options

| Property   | Type    | Default        | Description                                                  | Example                     |
| ---------- | ------- | -------------- | ------------------------------------------------------------ | --------------------------- |
| `listPath` | string  | `'list.txt'`   | Path to the file containing the list                         | `'my_folder/my_list.text'`  |
| `engine`   | string  | `'single.php'` | Path to the PHP file for reading and extract data            | `'my_folder/my_engine.php'` |
| `delay`    | integer | `2000`         | Delay time in milliseconds between every request. Useful to avoid being detected as spam |                             |

``````javascript
opener.listPath = 'my_list.txt';
``````
