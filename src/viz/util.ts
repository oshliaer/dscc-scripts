/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {DeploymentChoices, VizArgs} from '../args';

export interface BuildValues {
  devBucket: string;
  prodBucket: string;
  manifestFile: 'manifest.json';
  cssFile: string;
  jsonFile: string;
  jsFile: string;
  devMode: boolean;
  pwd: string;
  gcsBucket: string;
}

const invalidConfig = () => {
  const config = {
    config: {
      gcsDevBucket: 'gs://validBucketPath',
      gcsProdBucket: 'gs://validBucketPath',
      jsFile: 'index.js',
      jsonFile: 'index.json',
      cssFile: 'index.css',
      print: 'printMessage.js',
    },
  };
  return new Error(
    `Your package.json must have a config entry:\n${JSON.stringify(
      config,
      undefined,
      '  '
    )}`
  );
};

export const validateBuildValues = (args: VizArgs): BuildValues => {
  const cssFile = process.env.npm_package_config_cssFile;
  if (cssFile === undefined) {
    throw invalidConfig();
  }
  const jsonFile = process.env.npm_package_config_jsonFile!;
  if (jsonFile === undefined) {
    throw invalidConfig();
  }
  const jsFile = process.env.npm_package_config_jsFile!;
  if (jsFile === undefined) {
    throw invalidConfig();
  }
  const devBucket = process.env.npm_package_config_gcsDevBucket!;
  if (jsonFile === undefined) {
    throw invalidConfig();
  }
  const prodBucket = process.env.npm_package_config_gcsProdBucket!;
  if (jsonFile === undefined) {
    throw invalidConfig();
  }
  const devMode = args.deployment === DeploymentChoices.PROD ? false : true;
  const gcsBucket = devMode ? devBucket : prodBucket;
  const manifestFile = 'manifest.json';
  const pwd = process.env.PWD!;
  return {
    devBucket,
    prodBucket,
    manifestFile,
    cssFile,
    jsonFile,
    jsFile,
    devMode,
    pwd,
    gcsBucket,
  };
};
