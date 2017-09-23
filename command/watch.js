require('any-promise/register/q');

const program = require('commander');
const request = require('request-promise-any');

module.exports = function(stdout) {
  let args = [].concat(process.argv.slice(0,1), process.argv.slice(2));

  let watchPath = null;

  program
    .version('0.1.0')
    .option('-H, --host [value]', 'Unix Socket', 'unix:/var/run/bifrostd/bifrostd.sock')
    .option('-N, --namespace <value>', 'Set a remote namespace', 'tmp')
    .option('-n, --notify', 'Enable notification', false)
    .arguments('<path>')
    .action((path) => {
      watchPath = path;
    })
    .parse(args);

  if (watchPath === undefined) {
    stdout.write("Missing watch path\n");
    process.exit(1);
  }

  request({
    method: "POST",
    uri: `http://${program.host}:/watch`,
    body: Object.assign({}, {
      path: watchPath,
      namespace: program.namespace,
      notify: program.notify,
    }),
    json: true
  }).then((res) => {
    stdout.write(JSON.stringify(res, null, 4));
    stdout.write("\n");
  }).fail((err) => {
    stdout.write(`${err}\n`);
    process.exit(1);
  });
};


