const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

async function run() {
  try {
    const clArgs = require('./cl-manager.js');
    const {
      readableStream,
      transformStream,
      writeableStream
    } = require('./streams-manager');

    await pipeline(
      await readableStream(clArgs.input),
      transformStream(clArgs.shift, clArgs.action),
      await writeableStream(clArgs.output)
    );
    process.stdout.write(`Operation '${clArgs.action}' is done.\n`);
  } catch (error) {
    process.stderr.write(`${error.name}.\n${error.message}\n`);
    // eslint-disable-next-line no-process-exit
    process.exit(error.exitCode);
  }
}

run();
