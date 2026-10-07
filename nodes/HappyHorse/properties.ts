import type { INodeProperties } from 'n8n-workflow';
export const properties: INodeProperties[] = [
  {
    "displayName": "Resource",
    "name": "resource",
    "type": "options",
    "default": "video",
    "options": [
      {
        "name": "Task",
        "value": "task"
      },
      {
        "name": "Video",
        "value": "video"
      }
    ],
    "noDataExpression": true
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "generate",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ]
      }
    },
    "options": [
      {
        "name": "Edit",
        "value": "edit",
        "description": "Edit an existing video",
        "action": "Edit a video"
      },
      {
        "name": "Generate",
        "value": "generate",
        "description": "Generate a video from text",
        "action": "Generate a video"
      },
      {
        "name": "Image to Video",
        "value": "imageToVideo",
        "description": "Animate a first-frame image",
        "action": "Animate an image"
      },
      {
        "name": "Reference to Video",
        "value": "referenceToVideo",
        "description": "Generate a video using reference images",
        "action": "Generate a reference video"
      }
    ],
    "noDataExpression": true
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "get",
    "displayOptions": {
      "show": {
        "resource": [
          "task"
        ]
      }
    },
    "options": [
      {
        "name": "Get",
        "value": "get",
        "description": "Retrieve one existing task",
        "action": "Get a task"
      },
      {
        "name": "Get Many",
        "value": "getMany",
        "description": "Retrieve up to 50 specific task IDs",
        "action": "Get many tasks"
      }
    ],
    "noDataExpression": true
  },
  {
    "displayName": "Task ID",
    "name": "taskId",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "task"
        ],
        "operation": [
          "get"
        ]
      }
    },
    "required": true,
    "description": "The task ID returned by a generation operation"
  },
  {
    "displayName": "Task IDs",
    "name": "taskIds",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "task"
        ],
        "operation": [
          "getMany"
        ]
      }
    },
    "required": true,
    "description": "Up to 50 comma-separated task IDs"
  },
  {
    "displayName": "Prompt",
    "name": "prompt",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ]
      }
    },
    "required": true,
    "typeOptions": {
      "rows": 4
    },
    "description": "Describe the result you want to create"
  },
  {
    "displayName": "Model",
    "name": "model",
    "type": "options",
    "default": "happyhorse-1.1-t2v",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "generate"
        ]
      }
    },
    "options": [
      {
        "name": "happyhorse-1.0-t2v",
        "value": "happyhorse-1.0-t2v"
      },
      {
        "name": "happyhorse-1.1-t2v",
        "value": "happyhorse-1.1-t2v"
      }
    ]
  },
  {
    "displayName": "Model",
    "name": "model",
    "type": "options",
    "default": "happyhorse-1.1-i2v",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "imageToVideo"
        ]
      }
    },
    "options": [
      {
        "name": "happyhorse-1.0-i2v",
        "value": "happyhorse-1.0-i2v"
      },
      {
        "name": "happyhorse-1.1-i2v",
        "value": "happyhorse-1.1-i2v"
      }
    ]
  },
  {
    "displayName": "Model",
    "name": "model",
    "type": "options",
    "default": "happyhorse-1.1-r2v",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "referenceToVideo"
        ]
      }
    },
    "options": [
      {
        "name": "happyhorse-1.0-r2v",
        "value": "happyhorse-1.0-r2v"
      },
      {
        "name": "happyhorse-1.1-r2v",
        "value": "happyhorse-1.1-r2v"
      }
    ]
  },
  {
    "displayName": "Model",
    "name": "model",
    "type": "options",
    "default": "happyhorse-1.0-video-edit",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "edit"
        ]
      }
    },
    "options": [
      {
        "name": "happyhorse-1.0-video-edit",
        "value": "happyhorse-1.0-video-edit"
      }
    ]
  },
  {
    "displayName": "First Frame URL",
    "name": "imageUrl",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "imageToVideo"
        ]
      }
    },
    "required": true,
    "description": "Publicly accessible image URL used as the first frame"
  },
  {
    "displayName": "Reference Image URLs",
    "name": "imageUrls",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "referenceToVideo"
        ]
      }
    },
    "required": true,
    "typeOptions": {
      "rows": 3
    },
    "description": "One image URL per line, from 1 to 9 images"
  },
  {
    "displayName": "Reference Image URLs",
    "name": "imageUrls",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "edit"
        ]
      }
    },
    "typeOptions": {
      "rows": 3
    },
    "description": "Optional image URLs, one per line, up to 5"
  },
  {
    "displayName": "Video URL",
    "name": "videoUrl",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "edit"
        ]
      }
    },
    "required": true,
    "description": "Publicly accessible video to edit"
  },
  {
    "displayName": "Duration",
    "name": "duration",
    "type": "number",
    "default": 5,
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "generate",
          "imageToVideo",
          "referenceToVideo"
        ]
      }
    },
    "typeOptions": {
      "minValue": 3,
      "maxValue": 15,
      "numberPrecision": 0
    },
    "description": "Video duration in seconds"
  },
  {
    "displayName": "Resolution",
    "name": "resolution",
    "type": "options",
    "default": "720P",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ]
      }
    },
    "options": [
      {
        "name": "1080P",
        "value": "1080P"
      },
      {
        "name": "720P",
        "value": "720P"
      }
    ]
  },
  {
    "displayName": "Aspect Ratio",
    "name": "aspectRatio",
    "type": "options",
    "default": "16:9",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "generate",
          "referenceToVideo"
        ]
      }
    },
    "options": [
      {
        "name": "1:1",
        "value": "1:1"
      },
      {
        "name": "16:9",
        "value": "16:9"
      },
      {
        "name": "3:4",
        "value": "3:4"
      },
      {
        "name": "4:3",
        "value": "4:3"
      },
      {
        "name": "9:16",
        "value": "9:16"
      }
    ]
  },
  {
    "displayName": "Audio",
    "name": "audioSetting",
    "type": "options",
    "default": "auto",
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ],
        "operation": [
          "edit"
        ]
      }
    },
    "options": [
      {
        "name": "Automatic",
        "value": "auto"
      },
      {
        "name": "Keep Original Audio",
        "value": "origin"
      }
    ]
  },
  {
    "displayName": "Options",
    "name": "options",
    "type": "collection",
    "default": {},
    "displayOptions": {
      "show": {
        "resource": [
          "video"
        ]
      }
    },
    "placeholder": "Add Option",
    "options": [
      {
        "displayName": "Callback URL",
        "name": "callbackUrl",
        "type": "string",
        "default": "",
        "description": "Optional HTTPS webhook to receive the final result"
      },
      {
        "displayName": "Seed",
        "name": "seed",
        "type": "number",
        "default": 0,
        "typeOptions": {
          "minValue": 0,
          "maxValue": 2147483647,
          "numberPrecision": 0
        }
      },
      {
        "displayName": "Watermark",
        "name": "watermark",
        "type": "boolean",
        "default": false,
        "description": "Whether to include a watermark"
      }
    ]
  },
  {
    "displayName": "Simplify",
    "name": "simplify",
    "type": "boolean",
    "default": true,
    "description": "Whether to return essential fields instead of the raw API response"
  }
];
