/* eslint-disable max-len */
const fs = require('fs').promises;
const util = require('util');
const { exec: callbackExec } = require('child_process');
const path = require('path');

const exec = util.promisify(callbackExec);

const NPX_NYC_COMMAND = (unit) => `npx nyc --all --include ${unit} --reporter json-summary mocha src/test/unit/${unit}.js --exit`;

function readCoverageFile() {
  const COVERAGE_FILE_PATH = path.join(__dirname, '..', 'coverage', 'coverage-summary.json');
  return fs.readFile(COVERAGE_FILE_PATH).then(JSON.parse);
}

describe('11 - Escreva testes para seus models', () => {
  beforeAll(async () => {
    await exec(NPX_NYC_COMMAND('models'));
  });

  afterAll(async () => {
    await exec('rm -rf coverage .nyc_output');
  });

  it('Será validado a cobertura total do arquivo de models', async () => {
    const coverageResults = await readCoverageFile();
    expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(60);
    expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(45);
  });
});