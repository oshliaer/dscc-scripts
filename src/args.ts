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
import * as argparse from 'argparse';

export enum ScriptChoice {
  CONNECTOR = 'connector',
  VIZ = 'viz',
}

export enum ConnectorScripts {
  PUSH_CHANGES = 'push_changes',
  WATCH_CHANGES = 'watch_changes',
  OPEN_SCRIPT = 'open_script',
  TRY_PRODUCTION = 'try_production',
  TRY_LATEST = 'try_latest',
  UPADTE_PRODUCTION = 'update_production',
}

export interface ConnectorArgs {
  script: ConnectorScripts;
}

const addConnectorParserDetails = (subparsers: argparse.SubParser) => {
  const connectorParser = subparsers.addParser(ScriptChoice.CONNECTOR, {
    addHelp: true,
    description: 'Scripts for managing Data Studio community connectors.',
  });

  const connectorSubparsers = connectorParser.addSubparsers({
    title: 'script',
    dest: 'script',
  });

  connectorSubparsers.addParser(ConnectorScripts.PUSH_CHANGES, {
    addHelp: true,
    description: 'Push your local changes to Apps Script.',
  });

  connectorSubparsers.addParser(ConnectorScripts.WATCH_CHANGES, {
    addHelp: true,
    description: 'Watch for local changes, and push them to Apps Script.',
  });

  connectorSubparsers.addParser(ConnectorScripts.OPEN_SCRIPT, {
    addHelp: true,
    description: 'Open your Apps Script project in your browser.',
  });

  connectorSubparsers.addParser(ConnectorScripts.TRY_PRODUCTION, {
    addHelp: true,
    description: 'Try the production deployment of your connector.',
  });

  connectorSubparsers.addParser(ConnectorScripts.TRY_LATEST, {
    addHelp: true,
    description: 'Try the latest version of your connector.',
  });

  connectorSubparsers.addParser(ConnectorScripts.UPADTE_PRODUCTION, {
    addHelp: true,
    description: 'Update the production deployment of your connector.',
  });
};

export enum VizScripts {
  START = 'start',
  BUILD = 'build',
  PUSH = 'push',
  UPDATE_MESSAGE = 'update_message',
}

export enum MessageFormat {
  OBJECT = 'object',
  TABLE = 'table',
}

export enum DeploymentChoices {
  PROD = 'prod',
  DEV = 'dev',
}

export interface VizArgs {
  script: VizScripts;
  deployment?: DeploymentChoices;
  format?: MessageFormat;
}
const addVizParserDetails = (subparsers: argparse.SubParser) => {
  const vizParser = subparsers.addParser(ScriptChoice.VIZ, {
    addHelp: true,
    description: 'Scripts for managing Viz.',
  });

  const vizSubparsers = vizParser.addSubparsers({
    title: 'script',
    dest: 'script',
  });

  vizSubparsers.addParser(VizScripts.START, {
    addHelp: true,
    description: 'Run your viz locally with live-code reloading.',
  });

  const build = vizSubparsers.addParser(VizScripts.BUILD, {
    addHelp: true,
    description: 'Build your viz',
  });

  const push = vizSubparsers.addParser(VizScripts.PUSH, {
    addHelp: true,
    description: 'Deploy your viz.',
  });

  const updateMessage = vizSubparsers.addParser(VizScripts.UPDATE_MESSAGE, {
    addHelp: true,
    description:
      'Temporarily update your viz so you can copy example data from Data Studio.',
  });

  // Add common arguments to build & push.
  [build, push].forEach((parser) => {
    parser.addArgument(['-d', '--deployment'], {
      choices: [DeploymentChoices.PROD, DeploymentChoices.DEV],
      dest: 'deployment',
      help: 'Which deployment to deploy to.',
      required: false,
    });
  });

  updateMessage.addArgument(['-f', '--format'], {
    choices: [MessageFormat.OBJECT, MessageFormat.TABLE],
    dest: 'format',
    help: 'The format for the data.',
    required: true,
  });
};

export const getParser = (): argparse.ArgumentParser => {
  const parser = new argparse.ArgumentParser({
    version: '1.0',
    addHelp: true,
    description:
      'Scripts for mananging Data Studio Developer feature projects.',
  });

  const subParsers = parser.addSubparsers({
    title: 'Script Choice',
    dest: 'scriptChoice',
  });

  addVizParserDetails(subParsers);
  addConnectorParserDetails(subParsers);

  return parser;
};
