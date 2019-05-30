import * as Ajv from 'ajv';
import * as fs from 'mz/fs';


// const invalidManifest = (data: any) => {
//   const file = 'manifest';
//   const path = 'PATH';
//   const colorizedPath = format.green(path);
//   return new Error(
//     `Your ${file} must have a ${colorizedPath} entry:\n${JSON.stringify(
//       data,
//       undefined,
//       '  '
//     )}`
//   );
// };


const validateManifest = async (fn: string) => {
  const ajv = new Ajv({allErrors: true});

  const jsonContents = await fs.readFile(fn, 'utf-8');
  const jsonObject = JSON.parse(jsonContents);

  const schema = {
    type: 'object',
    additionalProperties: true,
    required: ['name', 'organization', 'description', 'logoUrl', 'organizationUrl', 'supportUrl', 'privacyPolicyUrl', 'termsOfServiceUrl', 'packageUrl', 'devMode'],
    properties: {
      'name': {type: 'string'},
      'organization': {type: 'string'},
      'description': {type: 'string'},
      'logoUrl': {type: 'string'},
      'organizationUrl': {type: 'string'},
      'supportUrl': {type: 'string'},
      'privacyPolicyUrl': {type: 'string'},
      'packageUrl': {type: 'string'},
      'devMode': {type: 'string'}

    }
  };

  const test = ajv.compile(schema);

  const isValid = test(jsonObject);
  console.log(isValid);

  return isValid ? jsonObject : {jsonObject, error: test.errors}

};

const fn = './src/manifest.json'
const output = validateManifest(fn);
console.log(output);
