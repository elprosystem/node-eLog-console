<h1 align = "center">
 <img src= "https://media.glassdoor.com/sqll/2483372/elog-log%C3%ADstica-squarelogo-1551912293426.png" width="100">
</h1>

## Index
- [Project](#-Project)
- [About](#-About)
- [Technology](#-Technology-used)
- [Usage](#-Usage)

### Project
- [elprosystem]("https://elprosystem.com.br")

### 📂 About
---
A **simple** console with information about the calling function line and file name.

### 📂 Technology used
---
- Javascript

### 📂 Install
---
```
npm i elog-console --save--dev
```
### 📂 Usage
```javascript
import {eLog} from "elog-console"

eLog(label, value, options)

```
#### The function accepts 3 parameters: label, value, options.

- label  String : text to name the console.
- value any : value to display on console
- options ? Boolean | Object : { depth: Boolean, color: String }

     'depth' -> if 'true' 'console.log()' otherwise node     'util.inspect',\
     'color' -> color name ( default:  { depth: false,  color: 'magenta' })

### 👉 Examples
```javascript
// use without the options parameter
const user = {
  uuid:'gwfer12dert',
  name:'elprosystem'
}

eLog('user' ,user);

// output
line: 100  file: elog-console/index.js function: eLog  label: user
{ user: { uuid:'gwfer12dert', name:'elprosystem' } }
```
