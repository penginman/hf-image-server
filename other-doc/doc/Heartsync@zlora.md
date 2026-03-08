{
  "named_endpoints": {
    "/update_size": {
      "parameters": [
        {
          "label": "📱 Aspect Ratio (SNS Presets)",
          "parameter_name": "aspect_ratio",
          "parameter_has_default": true,
          "parameter_default": "1:1 (Instagram Square)",
          "type": {
            "type": "string",
            "enum": [
              "1:1 (Instagram Square)",
              "9:16 (Instagram Reels/TikTok/Shorts)",
              "16:9 (YouTube/Twitter/X)",
              "4:5 (Instagram Portrait)",
              "5:4 (Instagram Landscape)",
              "3:4 (Portrait Photo)",
              "4:3 (Landscape Photo)",
              "2:3 (Pinterest)",
              "3:2 (Classic Photo)",
              "21:9 (Cinematic Ultra-wide)",
              "9:21 (Tall Banner)"
            ]
          },
          "python_type": {
            "type": "Literal['1:1 (Instagram Square)', '9:16 (Instagram Reels/TikTok/Shorts)', '16:9 (YouTube/Twitter/X)', '4:5 (Instagram Portrait)', '5:4 (Instagram Landscape)', '3:4 (Portrait Photo)', '4:3 (Landscape Photo)', '2:3 (Pinterest)', '3:2 (Classic Photo)', '21:9 (Cinematic Ultra-wide)', '9:21 (Tall Banner)']",
            "description": ""
          },
          "component": "Dropdown",
          "example_input": "1:1 (Instagram Square)"
        }
      ],
      "returns": [
        {
          "label": "Width",
          "type": {
            "type": "number",
            "description": "numeric value between 256 and 1536"
          },
          "python_type": {
            "type": "float",
            "description": "numeric value between 256 and 1536"
          },
          "component": "Slider"
        },
        {
          "label": "Height",
          "type": {
            "type": "number",
            "description": "numeric value between 256 and 1536"
          },
          "python_type": {
            "type": "float",
            "description": "numeric value between 256 and 1536"
          },
          "component": "Slider"
        }
      ],
      "api_visibility": "public",
      "description": ""
    },
    "/update_selection": {
      "parameters": [
        {
          "label": "Width",
          "parameter_name": "width",
          "parameter_has_default": true,
          "parameter_default": 1536,
          "type": {
            "type": "number",
            "description": "numeric value between 256 and 1536"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 256
        },
        {
          "label": "Height",
          "parameter_name": "height",
          "parameter_has_default": true,
          "parameter_default": 1536,
          "type": {
            "type": "number",
            "description": "numeric value between 256 and 1536"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 256
        }
      ],
      "returns": [
        {
          "label": "Enter Prompt",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Textbox"
        },
        {
          "label": "value_13",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Markdown"
        },
        {
          "label": "📱 Aspect Ratio (SNS Presets)",
          "type": {
            "type": "string",
            "enum": [
              "1:1 (Instagram Square)",
              "9:16 (Instagram Reels/TikTok/Shorts)",
              "16:9 (YouTube/Twitter/X)",
              "4:5 (Instagram Portrait)",
              "5:4 (Instagram Landscape)",
              "3:4 (Portrait Photo)",
              "4:3 (Landscape Photo)",
              "2:3 (Pinterest)",
              "3:2 (Classic Photo)",
              "21:9 (Cinematic Ultra-wide)",
              "9:21 (Tall Banner)"
            ]
          },
          "python_type": {
            "type": "Literal['1:1 (Instagram Square)', '9:16 (Instagram Reels/TikTok/Shorts)', '16:9 (YouTube/Twitter/X)', '4:5 (Instagram Portrait)', '5:4 (Instagram Landscape)', '3:4 (Portrait Photo)', '4:3 (Landscape Photo)', '2:3 (Pinterest)', '3:2 (Classic Photo)', '21:9 (Cinematic Ultra-wide)', '9:21 (Tall Banner)']",
            "description": ""
          },
          "component": "Dropdown"
        },
        {
          "label": "Width",
          "type": {
            "type": "number",
            "description": "numeric value between 256 and 1536"
          },
          "python_type": {
            "type": "float",
            "description": "numeric value between 256 and 1536"
          },
          "component": "Slider"
        },
        {
          "label": "Height",
          "type": {
            "type": "number",
            "description": "numeric value between 256 and 1536"
          },
          "python_type": {
            "type": "float",
            "description": "numeric value between 256 and 1536"
          },
          "component": "Slider"
        }
      ],
      "api_visibility": "public",
      "description": ""
    },
    "/add_custom_lora": {
      "parameters": [
        {
          "label": "Enter Custom LoRA",
          "parameter_name": "custom_lora",
          "parameter_has_default": false,
          "parameter_default": null,
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Textbox",
          "example_input": "Hello!!"
        }
      ],
      "returns": [
        {
          "label": "value_19",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Html"
        },
        {
          "label": "Z-Image LoRAs",
          "type": {
            "$defs": {
              "FileData": {
                "description": "The FileData class is a subclass of the GradioModel class that represents a file object within a Gradio interface. It is used to store file data and metadata when a file is uploaded.\n\nAttributes:\n    path: The server file path where the file is stored.\n    url: The normalized server URL pointing to the file.\n    size: The size of the file in bytes.\n    orig_name: The original filename before upload.\n    mime_type: The MIME type of the file.\n    is_stream: Indicates whether the file is a stream.\n    meta: Additional metadata used internally (should not be changed).",
                "properties": {
                  "path": {
                    "title": "Path",
                    "type": "string"
                  },
                  "url": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Url"
                  },
                  "size": {
                    "anyOf": [
                      {
                        "type": "integer"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Size"
                  },
                  "orig_name": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Orig Name"
                  },
                  "mime_type": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Mime Type"
                  },
                  "is_stream": {
                    "default": false,
                    "title": "Is Stream",
                    "type": "boolean"
                  },
                  "meta": {
                    "$ref": "#/$defs/FileDataMeta"
                  }
                },
                "required": [
                  "path"
                ],
                "title": "FileData",
                "type": "object"
              },
              "FileDataMeta": {
                "properties": {
                  "_type": {
                    "const": "gradio.FileData",
                    "title": "Type",
                    "type": "string"
                  }
                },
                "required": [
                  "_type"
                ],
                "title": "FileDataMeta",
                "type": "object"
              },
              "GalleryImage": {
                "properties": {
                  "image": {
                    "$ref": "#/$defs/ImageData"
                  },
                  "caption": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Caption"
                  }
                },
                "required": [
                  "image"
                ],
                "title": "GalleryImage",
                "type": "object"
              },
              "GalleryVideo": {
                "properties": {
                  "video": {
                    "$ref": "#/$defs/FileData"
                  },
                  "caption": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Caption"
                  }
                },
                "required": [
                  "video"
                ],
                "title": "GalleryVideo",
                "type": "object"
              },
              "ImageData": {
                "description": "For input, either path or url must be provided. For output, path is always provided.",
                "properties": {
                  "path": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Path to a local file",
                    "title": "Path"
                  },
                  "url": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Publicly available url or base64 encoded image",
                    "title": "Url"
                  },
                  "size": {
                    "anyOf": [
                      {
                        "type": "integer"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Size of image in bytes",
                    "title": "Size"
                  },
                  "orig_name": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Original filename",
                    "title": "Orig Name"
                  },
                  "mime_type": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "mime type of image",
                    "title": "Mime Type"
                  },
                  "is_stream": {
                    "default": false,
                    "description": "Can always be set to False",
                    "title": "Is Stream",
                    "type": "boolean"
                  },
                  "meta": {
                    "additionalProperties": true,
                    "default": {
                      "_type": "gradio.FileData"
                    },
                    "title": "Meta",
                    "type": "object"
                  }
                },
                "title": "ImageData",
                "type": "object"
              }
            },
            "items": {
              "anyOf": [
                {
                  "$ref": "#/$defs/GalleryImage"
                },
                {
                  "$ref": "#/$defs/GalleryVideo"
                }
              ]
            },
            "title": "GalleryData",
            "type": "array",
            "additional_description": null
          },
          "python_type": {
            "type": "list[dict(image: dict(path: str | None (Path to a local file), url: str | None (Publicly available url or base64 encoded image), size: int | None (Size of image in bytes), orig_name: str | None (Original filename), mime_type: str | None (mime type of image), is_stream: bool (Can always be set to False), meta: dict(str, Any)), caption: str | None) | dict(video: filepath, caption: str | None)]",
            "description": ""
          },
          "component": "Gallery"
        },
        {
          "label": "value_13",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Markdown"
        },
        {
          "label": "Enter Prompt",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Textbox"
        }
      ],
      "api_visibility": "public",
      "description": ""
    },
    "/remove_custom_lora": {
      "parameters": [],
      "returns": [
        {
          "label": "value_19",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Html"
        },
        {
          "label": "Z-Image LoRAs",
          "type": {
            "$defs": {
              "FileData": {
                "description": "The FileData class is a subclass of the GradioModel class that represents a file object within a Gradio interface. It is used to store file data and metadata when a file is uploaded.\n\nAttributes:\n    path: The server file path where the file is stored.\n    url: The normalized server URL pointing to the file.\n    size: The size of the file in bytes.\n    orig_name: The original filename before upload.\n    mime_type: The MIME type of the file.\n    is_stream: Indicates whether the file is a stream.\n    meta: Additional metadata used internally (should not be changed).",
                "properties": {
                  "path": {
                    "title": "Path",
                    "type": "string"
                  },
                  "url": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Url"
                  },
                  "size": {
                    "anyOf": [
                      {
                        "type": "integer"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Size"
                  },
                  "orig_name": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Orig Name"
                  },
                  "mime_type": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Mime Type"
                  },
                  "is_stream": {
                    "default": false,
                    "title": "Is Stream",
                    "type": "boolean"
                  },
                  "meta": {
                    "$ref": "#/$defs/FileDataMeta"
                  }
                },
                "required": [
                  "path"
                ],
                "title": "FileData",
                "type": "object"
              },
              "FileDataMeta": {
                "properties": {
                  "_type": {
                    "const": "gradio.FileData",
                    "title": "Type",
                    "type": "string"
                  }
                },
                "required": [
                  "_type"
                ],
                "title": "FileDataMeta",
                "type": "object"
              },
              "GalleryImage": {
                "properties": {
                  "image": {
                    "$ref": "#/$defs/ImageData"
                  },
                  "caption": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Caption"
                  }
                },
                "required": [
                  "image"
                ],
                "title": "GalleryImage",
                "type": "object"
              },
              "GalleryVideo": {
                "properties": {
                  "video": {
                    "$ref": "#/$defs/FileData"
                  },
                  "caption": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "title": "Caption"
                  }
                },
                "required": [
                  "video"
                ],
                "title": "GalleryVideo",
                "type": "object"
              },
              "ImageData": {
                "description": "For input, either path or url must be provided. For output, path is always provided.",
                "properties": {
                  "path": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Path to a local file",
                    "title": "Path"
                  },
                  "url": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Publicly available url or base64 encoded image",
                    "title": "Url"
                  },
                  "size": {
                    "anyOf": [
                      {
                        "type": "integer"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Size of image in bytes",
                    "title": "Size"
                  },
                  "orig_name": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "Original filename",
                    "title": "Orig Name"
                  },
                  "mime_type": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "default": null,
                    "description": "mime type of image",
                    "title": "Mime Type"
                  },
                  "is_stream": {
                    "default": false,
                    "description": "Can always be set to False",
                    "title": "Is Stream",
                    "type": "boolean"
                  },
                  "meta": {
                    "additionalProperties": true,
                    "default": {
                      "_type": "gradio.FileData"
                    },
                    "title": "Meta",
                    "type": "object"
                  }
                },
                "title": "ImageData",
                "type": "object"
              }
            },
            "items": {
              "anyOf": [
                {
                  "$ref": "#/$defs/GalleryImage"
                },
                {
                  "$ref": "#/$defs/GalleryVideo"
                }
              ]
            },
            "title": "GalleryData",
            "type": "array",
            "additional_description": null
          },
          "python_type": {
            "type": "list[dict(image: dict(path: str | None (Path to a local file), url: str | None (Publicly available url or base64 encoded image), size: int | None (Size of image in bytes), orig_name: str | None (Original filename), mime_type: str | None (mime type of image), is_stream: bool (Can always be set to False), meta: dict(str, Any)), caption: str | None) | dict(video: filepath, caption: str | None)]",
            "description": ""
          },
          "component": "Gallery"
        },
        {
          "label": "value_13",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Markdown"
        },
        {
          "label": "Enter Custom LoRA",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Textbox"
        }
      ],
      "api_visibility": "public",
      "description": ""
    },
    "/run_lora": {
      "parameters": [
        {
          "label": "Enter Prompt",
          "parameter_name": "prompt",
          "parameter_has_default": false,
          "parameter_default": null,
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Textbox",
          "example_input": "Hello!!"
        },
        {
          "label": "Input image (Ignored for Z-Image-Turbo)",
          "parameter_name": "image_input",
          "parameter_has_default": false,
          "parameter_default": null,
          "type": {
            "properties": {
              "path": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Path to a local file",
                "title": "Path"
              },
              "url": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Publicly available url or base64 encoded image",
                "title": "Url"
              },
              "size": {
                "anyOf": [
                  {
                    "type": "integer"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Size of image in bytes",
                "title": "Size"
              },
              "orig_name": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Original filename",
                "title": "Orig Name"
              },
              "mime_type": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "mime type of image",
                "title": "Mime Type"
              },
              "is_stream": {
                "default": false,
                "description": "Can always be set to False",
                "title": "Is Stream",
                "type": "boolean"
              },
              "meta": {
                "additionalProperties": true,
                "default": {
                  "_type": "gradio.FileData"
                },
                "title": "Meta",
                "type": "object"
              }
            },
            "title": "ImageData",
            "type": "object",
            "additional_description": "For input, either path or url must be provided. For output, path is always provided."
          },
          "python_type": {
            "type": "dict(path: str | None (Path to a local file), url: str | None (Publicly available url or base64 encoded image), size: int | None (Size of image in bytes), orig_name: str | None (Original filename), mime_type: str | None (mime type of image), is_stream: bool (Can always be set to False), meta: dict(str, Any))",
            "description": "For input, either path or url must be provided. For output, path is always provided."
          },
          "component": "Image",
          "example_input": {
            "path": "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png",
            "meta": {
              "_type": "gradio.FileData"
            },
            "orig_name": "bus.png",
            "url": "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png"
          }
        },
        {
          "label": "Denoise Strength",
          "parameter_name": "image_strength",
          "parameter_has_default": true,
          "parameter_default": 0.75,
          "type": {
            "type": "number",
            "description": "numeric value between 0.1 and 1.0"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0.1
        },
        {
          "label": "CFG Scale",
          "parameter_name": "cfg_scale",
          "parameter_has_default": true,
          "parameter_default": 0,
          "type": {
            "type": "number",
            "description": "numeric value between 0 and 20"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0
        },
        {
          "label": "Steps",
          "parameter_name": "steps",
          "parameter_has_default": true,
          "parameter_default": 25,
          "type": {
            "type": "number",
            "description": "numeric value between 1 and 50"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 1
        },
        {
          "label": "Randomize seed",
          "parameter_name": "randomize_seed",
          "parameter_has_default": true,
          "parameter_default": true,
          "type": {
            "type": "boolean"
          },
          "python_type": {
            "type": "bool",
            "description": ""
          },
          "component": "Checkbox",
          "example_input": true
        },
        {
          "label": "Seed",
          "parameter_name": "seed",
          "parameter_has_default": true,
          "parameter_default": 572577626,
          "type": {
            "type": "number",
            "description": "numeric value between 0 and 2147483647"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0
        },
        {
          "label": "Width",
          "parameter_name": "width",
          "parameter_has_default": true,
          "parameter_default": 1536,
          "type": {
            "type": "number",
            "description": "numeric value between 256 and 1536"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 256
        },
        {
          "label": "Height",
          "parameter_name": "height",
          "parameter_has_default": true,
          "parameter_default": 1536,
          "type": {
            "type": "number",
            "description": "numeric value between 256 and 1536"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 256
        },
        {
          "label": "LoRA Scale",
          "parameter_name": "lora_scale",
          "parameter_has_default": true,
          "parameter_default": 0.95,
          "type": {
            "type": "number",
            "description": "numeric value between 0 and 3"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0
        }
      ],
      "returns": [
        {
          "label": "Generated Image",
          "type": {
            "properties": {
              "path": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Path to a local file",
                "title": "Path"
              },
              "url": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Publicly available url or base64 encoded image",
                "title": "Url"
              },
              "size": {
                "anyOf": [
                  {
                    "type": "integer"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Size of image in bytes",
                "title": "Size"
              },
              "orig_name": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "Original filename",
                "title": "Orig Name"
              },
              "mime_type": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ],
                "default": null,
                "description": "mime type of image",
                "title": "Mime Type"
              },
              "is_stream": {
                "default": false,
                "description": "Can always be set to False",
                "title": "Is Stream",
                "type": "boolean"
              },
              "meta": {
                "additionalProperties": true,
                "default": {
                  "_type": "gradio.FileData"
                },
                "title": "Meta",
                "type": "object"
              }
            },
            "title": "ImageData",
            "type": "object",
            "additional_description": "For input, either path or url must be provided. For output, path is always provided."
          },
          "python_type": {
            "type": "dict(path: str | None (Path to a local file), url: str | None (Publicly available url or base64 encoded image), size: int | None (Size of image in bytes), orig_name: str | None (Original filename), mime_type: str | None (mime type of image), is_stream: bool (Can always be set to False), meta: dict(str, Any))",
            "description": ""
          },
          "component": "Image"
        },
        {
          "label": "Seed",
          "type": {
            "type": "number",
            "description": "numeric value between 0 and 2147483647"
          },
          "python_type": {
            "type": "float",
            "description": "numeric value between 0 and 2147483647"
          },
          "component": "Slider"
        },
        {
          "label": "value_22",
          "type": {
            "type": "string"
          },
          "python_type": {
            "type": "str",
            "description": ""
          },
          "component": "Markdown"
        }
      ],
      "api_visibility": "public",
      "description": ""
    },
    "/_check_login_status": {
      "parameters": [],
      "returns": [],
      "api_visibility": "public",
      "description": ""
    },
    "/get_random_value": {
      "parameters": [],
      "returns": [
        {
          "label": "Seed",
          "type": {
            "type": "number",
            "description": "numeric value between 0 and 2147483647"
          },
          "python_type": {
            "type": "float",
            "description": "numeric value between 0 and 2147483647"
          },
          "component": "Slider"
        }
      ],
      "api_visibility": "public",
      "description": ""
    }
  },
  "unnamed_endpoints": {

  }
}