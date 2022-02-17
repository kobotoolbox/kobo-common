const sgf = require('staged-git-files');

sgf((err, results) => {
  console.log(results);
});

throw new Error('Testing!');