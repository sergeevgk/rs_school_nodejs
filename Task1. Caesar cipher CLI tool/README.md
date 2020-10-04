# Rolling Scopes School. NodeJs Course 2020 Q3. 
## Task1. Caesar cipher CLI tool

**The repository contains CLI app which encode or decode a text with Caesar Cipher**

**Before Usage**
For installing necessary modules (util, fs, command, through2, stream) and their dependencies run the following command in the terminal (from the directory containing this README):
```bash
> npm install
```

**Start Usage**

For starting to work with CLI run the following command in the terminal (from the directory containing this README):
```bash 
> node caesar-cipher-cli -s 1 -a decode
```

**Possible Options:**
1.  **-s, --shift \<shift>**: required number, shift on how many characters will happen
2.  **-i, --input \<input>**: optional string, an input file path
3.  **-o, --output \<output>**: optional string, an output file path
4.  **-a, --action \<action>**: required string, type of an action - encode or decode

**Details:**
1. If action or shift options aren't provided, error message will be showed
2. If the 'input file' option is missed - text may be entered by terminal
3. If the 'output file' option is missed - encoded/decoded text will be provided into terminal
4. If the input and/or output file option is given but doesn't exist or isn't readable, error will be provided in the terminal
5. Only English alphabet is processed by encoder/decoder, all other characters are kept untouched

**Usage examples:**
- Encode by terminal
```bash
> node caesar-cipher-cli -a encode -s 1
```
(terminal input):
> `Hello World!`

(terminal output):
> `Gdkkn Vnqkc!`

- Decode by terminal
```bash
> node caesar-cipher-cli -a decode -s 1
```
(terminal input):
> `Gdkkn Vnqkc!`

(terminal output):
> `Hello World!`

- Encode using files
```bash
> node caesar-cipher-cli -a encode -s 1 -i "./input.txt" -o "./output.txt"
```
(./input.txt)
> `Hello World!`

(./output.txt)
> `Gdkkn Vnqkc!`