import {VizScripts} from '../../src/args';
import * as sut from '../../src/viz/util';

beforeEach(() => {
  process.env.npm_package_dsccViz_cssFile = 'cssFile';
  process.env.npm_package_dsccViz_jsonFile = 'jsonFile';
  process.env.npm_package_dsccViz_jsFile = 'jsFile';
  process.env.npm_package_dsccViz_gcsDevBucket = 'gcsDevBucket';
  process.env.npm_package_dsccViz_gcsProdBucket = 'gcsProdBucket';
});

test('validateBuildValues happyPath', () => {
  expect(sut.validateBuildValues({script: VizScripts.BUILD})).toEqual({
    cssFile: 'cssFile',
    devBucket: 'gcsDevBucket',
    devMode: true,
    gcsBucket: 'gcsDevBucket',
    jsFile: 'jsFile',
    jsonFile: 'jsonFile',
    manifestFile: 'manifest.json',
    prodBucket: 'gcsProdBucket',
    pwd: '/usr/local/google/home/mjhamrick/programming/dscc-scripts',
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
