
import * as util from 'util';



// ......................................
////  eLog
// ......................................



// ......................................
////  helpers
// ......................................


const colours = {
  reset: '0', // "\x1b[0m",
  bright: '1', // "\x1b[1m",
  dim: '2', // "\x1b[2m",
  underscore: '4', // "\x1b[4m",
  blink: '5', // "\x1b[5m",
  reverse: '7', // "\x1b[7m",
  hidden: '8', // "\x1b[8m",
  black: '30', // "\x1b[30m",
  red: '31', // "\x1b[31m",
  green: '32', // "\x1b[32m",
  yellow: '33', // "\x1b[33m",
  blue: '34', // "\x1b[34m",
  magenta: '35', // "\x1b[35m",
  cyan: '36', // "\x1b[36m",
  white: '37', // "\x1b[37m",
};

const def = x => typeof x !== 'undefined' && x !== null
const propKeys = obj => def(obj) ? Object.keys(obj) : []
const isEmptyObject = (obj) => def(obj) ? propKeys(obj).length === 0 ? true : false : true
const isEmptyString = (str) => def(str) ? (str.trim().length <= 0) ? true : false : true
const withoutUndef = (x) => x.filter(f => typeof f !== 'undefined')
const isEmpty = x => typeof x === 'string' && isEmptyString(x) ? '_&.string.empty' : x
const first = x => x[0]
const last = x => {
  const _x = [...x] // immutability guaranteed
  return first(_x.reverse())
}
const defaultOpt = { depth: false, color: '35' }


// ......................................
////  colorName
// ......................................

const colorName = x => {
  const color = colours[x]
  return def(color)
    ? color
    : defaultOpt.color
}


// ......................................
////  colorize
// ......................................

const colorize = x => {
  const depth = 'depth' in x && typeof x.depth === 'boolean' ? x.depth : false
  const color = 'color' in x && typeof x.color === 'string' && !isEmptyString(x.color) ? colorName(x.color) : defaultOpt.color
  return { depth: depth, color: color }
}



// ......................................
////  parseOpt
// ......................................


const parseOpt = x => {
  return typeof x === 'object' && !isEmptyObject(x)
    ? colorize(x)
    : defaultOpt
}




// ......................................
////  parseLog
// ......................................


const parseLog = (...x) => {

  const defs = withoutUndef(x)
  const length = defs.length

  // two things can happen...
  const data = length >= 3
    ? { str: x[0], values: x[1], opt: typeof (x[2]) === 'boolean' ? { depth: x[2], color: 35 } : parseOpt(x[2]) }
    : length === 1 || length === 2
      ? { str: x[0], values: x[1], opt: defaultOpt }
      : { str: '...', values: '    [warning]: no value provided!', opt: defaultOpt }
  return data
}



// ......................................
////  log
// ......................................


/**
 * custom log the console
 * @param label  String : text to name the console.
 * @param value any : value to display on console
 * @param options ? Boolean | Object : { depth: Boolean, color: String }
 * @comment 'depth' -> if 'true' 'console.log()' otherwise node 'util.inspect',
 *          'color' -> color name ( default:  { depth: false, color: 'magenta' })
 * @returns void
 */

export const eLog = (label, value, options) => {

  try {

    // stacks
    const depth = 0
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = (ignore, stack) => stack;

    const capture = {};
    Error.captureStackTrace(capture, this);
    const line = capture.stack[depth + 1]   // you should replace it with your async function that may reject

    Error.prepareStackTrace = orig;

    const filepath = line.getFileName()
    const splitFilepath = filepath.split('/')
    const dirname = splitFilepath.length - 2
    const filename = `${splitFilepath[dirname]}/${last(splitFilepath)}`

    const lineNum = line.getLineNumber()
    const methodName = line.getMethodName()
    const func = line.getFunctionName()

    // display
    const { str, values, opt } = parseLog(label, value, options)
    const colorize = `\x1b[${opt.color}m%s\x1b[0m` // <- '0m reset'

    console.log();

    console.log(` ${colorize}`, `line: ${lineNum}   file: ${filename}   function: ${func}   label: ${str}   `);

    opt.depth // default = false
      ? console.log(values)
      : console.log(util.inspect(values, { showHidden: false, depth: null, colors: true }))

    console.log();

  } catch (error) {

    console.log();
    console.warn(`\x1b[31m%s\x1b[0m`, `Error: [eLog]  ${error.message}`)
    console.log();
  }
};

