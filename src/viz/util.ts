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
import {invalidVizConfig} from '../util';

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

export const validateBuildValues = (args: VizArgs): BuildValues => {
  const cssFile = process.env.npm_packagedsccViz_cssFile;
  if (cssFile === undefined) {
    throw invalidVizConfig('cssFile');
  }
  const jsonFile = process.env.npm_packagedsccViz_jsonFile!;
  if (jsonFile === undefined) {
    throw invalidVizConfig('jsonFile');
  }
  const jsFile = process.env.npm_packagedsccViz_jsFile!;
  if (jsFile === undefined) {
    throw invalidVizConfig('jsFile');
  }
  const devBucket = process.env.npm_packagedsccViz_gcsDevBucket!;
  if (jsonFile === undefined) {
    throw invalidVizConfig('gcsDevBucket');
  }
  const prodBucket = process.env.npm_packagedsccViz_gcsProdBucket!;
  if (jsonFile === undefined) {
    throw invalidVizConfig('gcsProdBucket');
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
