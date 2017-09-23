require('any-promise/register/q');

const program = require('commander');
const request = require('request-promise-any');

module.exports = function(stdout) {
  let args = [].concat(process.argv.slice(0,1), process.argv.slice(2));

  program
    .version('0.1.0')
    .option('-H, --host [value]', 'Unix Socket', 'unix:/var/run/bifrostd/bifrostd.sock')
    .parse(args);

  args.slice(2).map((arg) => {
    arg = encodeURI(arg);
    request({
      uri: `http://${program.host}:/path/${arg}`,
      method: "GET",
      json: true,
    }).then((res) => {
      stdout.write(JSON.stringify(res, null, 4));
      stdout.write("\n");
    })
    .fail((err) => {
      stdout.write(`${err}\n`);
    });
  });
};

