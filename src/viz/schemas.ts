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
      maxItems: 1,
      items: {
        $ref: '#/definitions/interactionElement',
      },
    },
  },
  definitions: {
    dataSection: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'label', 'elements'],
      properties: {
        id: {type: 'string'},
        label: {type: 'string'},
        elements: {
          type: 'array',
          items: {
            anyof: [
              {$ref: '#/definitions/dimensionElement'},
              {$ref: '#/definitions/metricElement'},
              {$ref: '#/definitions/maxResultsElement'},
            ],
          },
        },
      },
    },
    configElement: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'label'],
      properties: {
        id: {type: 'string'},
        label: {type: 'string'},
      },
    },
    metricElement: {
      type: 'object',
      additionalProperties: false,
      allOf: [
        {$ref: '#/definitions/configElement'},
        {
          required: ['type'],
          properties: {
            type: {
              'enum': ['METRIC']
            },
            options: {
              $ref: '#/definitions/dataOptions',
            },
          },
        },
      ],
    },
    dimensionElement: {
      type: 'object',
      additionalProperties: false,
      allOf: [
        {$ref: '#/definitions/configElement'},
        {
          required: ['type'],
          properties: {
            type: {
              type: 'string',
              enum: ['DIMENSION'],
            },
            options: {
              $ref: '#/definitions/dimensionOptions',
            },
          },
        },
      ],
    },
    maxResultsElement: {
      type: 'object',
      additionalProperties: false,
      allOf: [
        {$ref: '#/definitions/configElement'},
        {
          required: ['type'],
          properties: {
            type: {
              type: 'string',
              enum: ['MAX_RESULTS'],
            },
            options: {
              $ref: '#/definitions/maxResultsOptions',
            },
          },
        },
      ],
    },
    dataOptions: {
      type: 'object',
      additionalProperties: false,
      properties: {
        min: {type: 'number'},
        max: {type: 'number'},
      },
    },
    dimensionOptions: {
      type: 'object',
      additionalProperties: false,
      properties: {
        supportedTypes: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['TIME', 'GEO', 'DEFAULT'],
          },
        },
      },
    },
    maxResultsOptions: {
      type: 'object',
      required: ['max'],
      additionalProperties: false,
      properties: {
        max: {type: 'number'},
      },
    },
    styleSection: {
      type: 'object',
      required: ['id', 'label', 'elements'],
      additionalProperties: false,
      properties: {
        id: {type: 'string'},
        label: {type: 'string'},
        elements: {
          type: 'array',
          items: {
            anyof: [
              {$ref: '#/definitions/genericStyleElement'},
              {$ref: '#/definitions/colorStyleElement'},
              {$ref: '#/definitions/selectStyleElement'},
            ],
          },
        },
      },
    },
    genericStyleElement: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'label', 'type'],
      properties: {
        id: {type: 'string'},
        label: {type: 'string'},
        type: {
          type: 'string',
          enum: [
            'FONT_SIZE',
            'FONT_FAMILY',
            'CHECKBOX',
            'TEXTINPUT',
            'OPACITY',
            'LINE_WEIGHT',
            'LINE_STYLE',
            'BORDER_RADIUS',
            'INTERVAL',
          ],
        },
        defaultValue: {type: 'string'},
      }
    },
    // Eventual TODO: validate defaultValue to be hex string
    colorStyleElement: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'label', 'type'],
      properties: {
        id: {type: 'string'},
        label: {type: 'string'},
        type: {
          type: 'string',
          enum: [
            'FONT_COLOR',
            'FILL_COLOR',
            'BORDER_COLOR',
            'AXIS_COLOR',
            'GRID_COLOR',
          ],
        },
      },
    },
    selectStyleElement: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'label', 'type', 'options'],
      properties: {
        id: {type: 'string'},
        label: {type: 'string'},
        type: {
          type: 'string',
          enum: ['SELECT_SINGLE', 'SELECT_RADIO'],
        },
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
