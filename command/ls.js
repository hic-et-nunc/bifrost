require('any-promise/register/q');

const program = require('commander');
const request = require('request-promise-any');

module.exports = function(stdout) {
  let args = [].concat(process.argv.slice(0,1), process.argv.slice(2));

  program
    .version('0.1.0')
    .option('-H, --host [value]', 'Unix Socket', 'unix:/var/run/bifrostd/bifrostd.sock')
    .parse(args);

  request({
    method: "GET",
    uri: `http://${program.host}:/path`,
    json: true
  }).then((res) => {
    res.map((path) => {
      stdout.write(path + "\n");
    });
  })
  .fail((err) => {
    stdout.write(`${err}\n`);
  });
};
