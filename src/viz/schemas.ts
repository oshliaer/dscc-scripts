export const manifestSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'organization',
    'description',
    'logoUrl',
    'organizationUrl',
    'supportUrl',
    'privacyPolicyUrl',
    'termsOfServiceUrl',
    'packageUrl',
    'components',
  ],
  properties: {
    name: {type: 'string'},
    organization: {type: 'string'},
    description: {type: 'string'},
    logoUrl: {type: 'string'},
    organizationUrl: {type: 'string'},
    supportUrl: {type: 'string'},
    privacyPolicyUrl: {type: 'string'},
    termsOfServiceUrl: {type: 'string'},
    packageUrl: {type: 'string'},
    devMode: {type: 'string'},
    components: {
      type: 'array',
      items: {
        $ref: '#/definitions/component',
      },
    },
  },
  definitions: {
    component: {
      type: 'object',
      required: ['name', 'description', 'iconUrl', 'resource'],
      properties: {
        name: {type: 'string'},
        organization: {type: 'string'},
        description: {type: 'string'},
        iconUrl: {type: 'string'},
        resource: {$ref: '#/definitions/resources'},
      },
    },
    resources: {
      type: 'object',
      required: ['js', 'config'],
      properties: {
        js: {type: 'string'},
        config: {type: 'string'},
      },
    },
  },
};

export const configSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    data: {
      type: 'array',
      items: {
        $ref: '#/definitions/dataSection',
      },
    },
    style: {
      type: 'array',
      items: {
        $ref: '#/definitions/styleSection',
      },
    },
    interactions: {
      type: 'array',
      items: {
        $ref: '#/definitions/interactionElement',
      },
    },
  },
  definitions: {
    dataSection: {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: {type: 'string'},
        label: {type: 'string'},
        elements: {
          type: 'array',
          items: {
            $ref: '#/definitions/dataElement',
          },
        },
      },
    },
    dataElement: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'type', 'label'],
      properties: {
        id: {type: 'string'},
        type: {
          type: 'string',
          enum: ['METRIC', 'DIMENSION'],
        },
        label: {type: 'string'},
        options: {type: 'object'},
      },
    },
    styleSection: {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: {type: 'string'},
        label: {type: 'string'},
        elements: {
          type: 'array',
          items: {
            $ref: '#/definitions/styleElement',
          },
        },
      },
    },
    styleElement: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'type', 'label'],
      properties: {
        id: {type: 'string'},
        type: {type: 'string'},
        label: {type: 'string'},
        defaultValue: {type: 'string'},
        options: {
          type: 'array',
          items: {
            $ref: '#/definitions/styleElementOptions',
          },
        },
      },
    },
    styleElementOptions: {
      type: 'object',
      required: ['label', 'value'],
      properties: {
        label: {type: 'string'},
        value: {type: 'string'},
      },
    },
    interactionElement: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'supportedActions'],
      properties: {
        id: {type: 'string'},
        supportedActions: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['FILTER'],
          },
        },
      },
    },
  },
};
