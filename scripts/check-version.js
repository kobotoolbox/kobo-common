const sgf = require('staged-git-files');
const gtr = require('git-tags-remote');
const packageJsonData = require('../package.json'); 

function checkVersion () {
  console.info('Checking version…');

  sgf((err, results) => {    
    // We want to check things:
    // - if at least one file in `src` was modified, we expect the minor version bumped
    // - if at least one file in `src` was added, but none modified, we expect the patch version bumped
    // - if no file in `src` was changed in any way, we expect version to be untouched

    const hasAddedSrcFiles = results.filter((result) => {
      return result.filename.startsWith('src/') && result.status === 'Added';
    }).length >= 1;

    const hasModifiedSrcFiles = results.filter((result) => {
      return result.filename.startsWith('src/') && result.status === 'Modified';
    }).length >= 1;

    const proposedVersion = packageJsonData.version;

    gtr.latest('git@github.com:kobotoolbox/kobo-common.git').then((response) => {
      const latestVersion = response[0];
      const latestVersionArray = latestVersion.split('.');

      const expectedVersionArray = Array.from(latestVersionArray);
      if (hasModifiedSrcFiles) {
        expectedVersionArray[1] = String(parseInt(expectedVersionArray[1]) + 1);
      } else if (hasAddedSrcFiles) {
        expectedVersionArray[2] = String(parseInt(expectedVersionArray[2]) + 1);
      }
      const expectedVersion = expectedVersionArray.join('.');

      if (proposedVersion !== expectedVersion) {
        console.error(`Proposed version ${proposedVersion} doesn't match expected version ${expectedVersion}!`);
        process.exit(1);
      } else {
        console.info('OK');
      }

      process.exit(0);
    });
  });
}

checkVersion();