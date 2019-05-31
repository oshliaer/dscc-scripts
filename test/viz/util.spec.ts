import {VizScripts} from '../../src/args';
import * as sut from '../../src/viz/util';
import * as fs from 'mz/fs';
import {manifestSchema, configSchema} from '../../src/viz/schemas'

const readFile = async (fn: string) => {
  const encoding = 'utf-8';
  return fs.readFile(fn, encoding);
}

beforeEach(() => {
  process.env.npm_package_dsccViz_cssFile = 'cssFile';
  process.env.npm_package_dsccViz_jsonFile = 'jsonFile';
  process.env.npm_package_dsccViz_jsFile = 'jsFile';
  process.env.npm_package_dsccViz_gcsDevBucket = 'gcsDevBucket';
  process.env.npm_package_dsccViz_gcsProdBucket = 'gcsProdBucket';
});

test('validateBuildValues happyPath', () => {
  const actual = sut.validateBuildValues({script: VizScripts.BUILD});
  // Don't care about pwd in tests.
  delete actual.pwd;

  expect(actual).toEqual({
    cssFile: 'cssFile',
    devBucket: 'gcsDevBucket',
    devMode: true,
    gcsBucket: 'gcsDevBucket',
    jsFile: 'jsFile',
    jsonFile: 'jsonFile',
    manifestFile: 'manifest.json',
    prodBucket: 'gcsProdBucket',
  });
});

test('validateBuildValues missing cssFile', () => {
  delete process.env.npm_package_dsccViz_cssFile;

  expect(() => sut.validateBuildValues({script: VizScripts.BUILD})).toThrow(
    'dsccViz.cssFile'
  );
});

test('validateBuildValues missing jsonFile', () => {
  delete process.env.npm_package_dsccViz_jsonFile;

  expect(() => sut.validateBuildValues({script: VizScripts.BUILD})).toThrow(
    'dsccViz.jsonFile'
  );
});

test('validateBuildValues missing jsFile', () => {
  delete process.env.npm_package_dsccViz_jsFile;

  expect(() => sut.validateBuildValues({script: VizScripts.BUILD})).toThrow(
    'dsccViz.jsFile'
  );
});

test('validateBuildValues missing gcsDevBucket', () => {
  delete process.env.npm_package_dsccViz_gcsDevBucket;

  expect(() => sut.validateBuildValues({script: VizScripts.BUILD})).toThrow(
    'dsccViz.gcsDevBucket'
  );
});

test('validateBuildValues missing gcsProdBucket', () => {
  delete process.env.npm_package_dsccViz_gcsProdBucket;

  expect(() => sut.validateBuildValues({script: VizScripts.BUILD})).toThrow(
    'dsccViz.gcsProdBucket'
  );
});

test('valid manifest', () => {
  const validManifestFn = './test/viz/files/manifest.json';
  const file = 'manifest';
  return readFile(validManifestFn).then(manifestJSON => {
    expect(sut.validateJSON(manifestJSON, manifestSchema, file)).toBe(true);
  });
});

test('invalid manifest', () => {
  const manifestFn = './test/viz/files/invalid_manifest.json';
  const file = 'manifest';
  return readFile(manifestFn).then(manifestJSON => {
    expect(() => sut.validateJSON(manifestJSON, manifestSchema, file)).toThrow();
  });
});

test('valid config', () => {
  const validConfigFn = './test/viz/files/config.json';
  const file = 'config';
  return readFile(validConfigFn).then(configJSON => {
    expect(sut.validateJSON(configJSON, configSchema, file)).toBe(true);
  });
});
