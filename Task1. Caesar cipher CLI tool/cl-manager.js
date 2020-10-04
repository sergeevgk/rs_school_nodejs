const { program } = require('commander');

function checkShiftArgument(shift) {
  return !Number.isNaN(shift);
}

function checkActionArgument(action) {
  return action === 'encode' || action === 'decode';
}

program
  .storeOptionsAsProperties(true)
  .option('-s, --shift <>', 'a shift', shift => {
    return isNaN(shift) ? NaN : parseInt(shift, 10);
  })
  .option('-i, --input <>', 'an input file', 'stdin')
  .option('-o, --output <>', 'an output file', 'stdout')
  .option('-a, --action <>', 'an action encode/decode')
  .parse(process.argv);

console.log(program.opts());
console.log(process.argv);

if (!checkShiftArgument(program.shift)) {
  throw {
    name: 'CommandLineArgs Error',
    message: 'Required argument --shift is missing or wrong.',
    exitCode: 1
  };
}
if (!checkActionArgument(program.action)) {
  throw {
    name: 'CommandLineArgs Error',
    message: 'Required argument --action is missing or wrong.',
    exitCode: 1
  };
}

const parameters = {
  shift: program.shift,
  input: program.input,
  output: program.output,
  action: program.action
};

module.exports = parameters;
