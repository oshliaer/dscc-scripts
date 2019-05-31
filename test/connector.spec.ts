import * as execa from 'execa';
import open = require('open');
import {ConnectorScripts} from '../src/args';
import * as sut from '../src/connector';
jest.mock('open');
jest.mock('execa');

beforeEach(() => {
  (open as any).mockClear();
  (execa as any).mockClear();
  process.env.npm_package_dsccConnector_latest = 'latestId';
  process.env.npm_package_dsccConnector_production = 'productionId';
  process.env.npm_package_dsccConnector_template = 'templateId';
});

test('try_production happy path', () => {
  (open as any).mockResolvedValue(undefined);

  expect(sut.main({script: ConnectorScripts.TRY_PRODUCTION})).resolves.toEqual(
    undefined
  );
});

test('try_latest happy path', () => {
  (open as any).mockResolvedValue(undefined);

  expect(sut.main({script: ConnectorScripts.TRY_LATEST})).resolves.toEqual(
    undefined
  );
});

test('update_production happy path', () => {
  (execa as any).mockResolvedValue('');

  expect(
    sut.main({script: ConnectorScripts.UPDATE_PRODUCTION})
  ).resolves.toEqual(undefined);
});

test('try_production missing from package.json', () => {
  delete process.env.npm_package_dsccConnector_production;

  expect(sut.main({script: ConnectorScripts.TRY_PRODUCTION})).rejects.toThrow(
    'production'
  );
});

test('try_latest missing from package.json', () => {
  delete process.env.npm_package_dsccConnector_latest;

  expect(sut.main({script: ConnectorScripts.TRY_LATEST})).rejects.toThrow(
    'latest'
  );
});

test('update_production missing from package.json', () => {
  delete process.env.npm_package_dsccConnector_production;

  expect(
    sut.main({script: ConnectorScripts.UPDATE_PRODUCTION})
  ).rejects.toThrow('production');
});

describe('for open_template', () => {
  const validManifest = {dataStudio: {templates: {default: 'report-id'}}};

  beforeEach(() => {
    jest.spyOn(sut, 'getAppsScriptManifest').mockResolvedValue(validManifest);
  });

  test('happy path', () => {
    (open as any).mockResolvedValue(undefined);

    expect(sut.main({script: ConnectorScripts.OPEN_TEMPLATE})).resolves.toEqual(
      undefined
    );
  });

  test('template missing from package.json', () => {
    delete validManifest.dataStudio.templates;

    expect(sut.main({script: ConnectorScripts.OPEN_TEMPLATE})).rejects.toThrow(
      'template'
    );
  });
});
