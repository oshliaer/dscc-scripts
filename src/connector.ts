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
import * as bluebird from 'bluebird';
import chalk from 'chalk';
import open = require('open');
import * as shelljs from 'shelljs';
import terminalLink from 'terminal-link';
import {ConnectorArgs, ConnectorScripts} from './args';
import {assertNever} from './util';

const asyncExec = bluebird.promisify(shelljs.exec);

const openDeployment = async (
  deploymentId: string,
  deploymentName: string
): Promise<void> => {
  const green = chalk.rgb(15, 157, 88);
  const deploymentUrl = `https://datastudio.google.com/datasources/create?connectorId=${deploymentId}`;
  const formattedUrl = green(
    terminalLink(`${deploymentName} deployment`, deploymentUrl)
  );
  console.log(`Opening: ${formattedUrl}`);
  return open(deploymentUrl).then(() => {
    return;
  });
};

const updateDeployment = async (deploymentId: string): Promise<void> => {
  return asyncExec(
    `npx @google/clasp deploy --deploymentId ${deploymentId}`
  ).then(() => {
    return;
  });
};

const missingDeploymentsKey = () => {
  return new Error(
    `Your package.json must have a deployments entry:\n${JSON.stringify(
      {
        deployments: {
          production: 'prodDeploymentId',
          latest: 'latestDeploymentId',
        },
      },
      undefined,
      '  '
    )}`
  );
};

const tryProduction = async (): Promise<void> => {
  const prodDeploymentId = process.env.npm_package_deployments_production;
  if (prodDeploymentId === undefined) {
    throw missingDeploymentsKey();
  }
  return openDeployment(prodDeploymentId, 'production');
};

const tryLatest = async (): Promise<void> => {
  const latestDeploymentId = process.env.npm_package_deployments_latest;
  if (latestDeploymentId === undefined) {
    throw missingDeploymentsKey();
  }
  return openDeployment(latestDeploymentId, 'latest');
};

const updateProduction = async () => {
  const prodDeploymentId = process.env.npm_package_deployments_production;
  if (prodDeploymentId === undefined) {
    throw missingDeploymentsKey();
  }
  return updateDeployment(prodDeploymentId);
};

const pushChanges = async (): Promise<void> => {
  return asyncExec(`npx @google/clasp push`).then(() => {
    return;
  });
};

const watchChanges = async (): Promise<void> => {
  return asyncExec(`npx @google/clasp push --watch`).then(() => {
    return;
  });
};

const openScript = async (): Promise<void> => {
  return asyncExec(`npx @google/clasp open`).then(() => {
    return;
  });
};

export const main = async (args: ConnectorArgs): Promise<void> => {
  switch (args.script) {
    case ConnectorScripts.TRY_PRODUCTION:
      return tryProduction();
    case ConnectorScripts.TRY_LATEST:
      return tryLatest();
    case ConnectorScripts.UPADTE_PRODUCTION:
      return updateProduction();
    case ConnectorScripts.PUSH_CHANGES:
      return pushChanges();
    case ConnectorScripts.WATCH_CHANGES:
      return watchChanges();
    case ConnectorScripts.OPEN_SCRIPT:
      return openScript();
    default:
      return assertNever(args.script);
  }
};
