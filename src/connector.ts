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
import * as execa from 'execa';
import open = require('open');
import terminalLink from 'terminal-link';
import {ConnectorArgs, ConnectorScripts} from './args';
import {assertNever, format, invalidConnectorConfig, pipeStdIO} from './util';

const openDeployment = async (
  deploymentId: string,
  deploymentName: string
): Promise<void> => {
  const deploymentUrl = `https://datastudio.google.com/datasources/create?connectorId=${deploymentId}`;
  const formattedUrl = format.green(
    terminalLink(`${deploymentName} deployment`, deploymentUrl)
  );
  console.log(`Opening: ${formattedUrl}`);
  await open(deploymentUrl);
};

const tryProduction = async (): Promise<void> => {
  const prodDeploymentId = process.env.npm_package_dsccConnector_production;
  if (prodDeploymentId === undefined) {
    throw invalidConnectorConfig('production');
  }
  return openDeployment(prodDeploymentId, 'Production');
};

const tryLatest = async (): Promise<void> => {
  const latestDeploymentId = process.env.npm_package_dsccConnector_latest;
  if (latestDeploymentId === undefined) {
    throw invalidConnectorConfig('latest');
  }
  return openDeployment(latestDeploymentId, 'latest');
};

const updateProduction = async () => {
  const prodDeploymentId = process.env.npm_package_dsccConnector_production;
  if (prodDeploymentId === undefined) {
    throw invalidConnectorConfig('production');
  }
  await execa(
    'npx',
    [
      '@google/clasp',
      'deploy',
      '--deploymentId',
      prodDeploymentId,
      '--description',
      'Production',
    ],
    pipeStdIO
  );
};

const pushChanges = async (): Promise<void> => {
  await execa('npx', ['@google/clasp', 'push'], pipeStdIO);
};

const watchChanges = async (): Promise<void> => {
  await execa('npx', ['@google/clasp', 'push', '--watch'], pipeStdIO);
};

const openScript = async (): Promise<void> => {
  await execa('npx', ['@google/clasp', 'open'], pipeStdIO);
};

const openTemplate = async (): Promise<void> => {
  const templateId = process.env.npm_package_dsccConnector_template;
  if (templateId === undefined) {
    throw invalidConnectorConfig('template');
  }
  const templateUrl = `https://datastudio.google.com/c/reporting/${templateId}`;
  const formattedUrl = format.green(terminalLink(`open template`, templateUrl));
  console.log(`Opening: ${formattedUrl}`);
  await open(templateUrl);
};

export const main = async (args: ConnectorArgs): Promise<void> => {
  switch (args.script) {
    case ConnectorScripts.TRY_PRODUCTION:
      return tryProduction();
    case ConnectorScripts.TRY_LATEST:
      return tryLatest();
    case ConnectorScripts.UPDATE_PRODUCTION:
      return updateProduction();
    case ConnectorScripts.PUSH_CHANGES:
      return pushChanges();
    case ConnectorScripts.WATCH_CHANGES:
      return watchChanges();
    case ConnectorScripts.OPEN_SCRIPT:
      return openScript();
    case ConnectorScripts.OPEN_TEMPLATE:
      return openTemplate();
    default:
      return assertNever(args.script);
  }
};
