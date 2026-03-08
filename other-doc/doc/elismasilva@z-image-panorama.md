{
  "named_endpoints": {
    "/calculate_tile_size": {
      "parameters": [
        {
          "label": "Target Height",
          "parameter_name": "target_height",
          "parameter_has_default": true,
          "parameter_default": 1024,
          "type": {
            "type": "number",
            "description": "numeric value between 512 and 2048"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 512
        },
        {
          "label": "Target Width",
          "parameter_name": "target_width",
          "parameter_has_default": true,
          "parameter_default": 3072,
          "type": {
            "type": "number",
            "description": "numeric value between 512 and 4096"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 512
        },
        {
          "label": "Tile Overlap",
          "parameter_name": "overlap_pixels",
          "parameter_has_default": true,
          "parameter_default": 256,
          "type": {
            "type": "number",
            "description": "numeric value between 0 and 512"
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
          "label": "Actual Height",
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
          "label": "Actual Width",
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
      "show_api": true,
      "description": "Calculate tile dimensions for panoramic image generation."
    },
    "/generate_z_image_panorama": {
      "parameters": [
        {
          "label": "Prompt (Left)",
          "parameter_name": "left_prompt",
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
          "label": "Prompt (Center)",
          "parameter_name": "center_prompt",
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
          "label": "Prompt (Right)",
          "parameter_name": "right_prompt",
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
          "label": "Left Guidance",
          "parameter_name": "left_gs",
          "parameter_has_default": true,
          "parameter_default": 0,
          "type": {
            "type": "number",
            "description": "numeric value between 0.0 and 10.0"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0
        },
        {
          "label": "Center Guidance",
          "parameter_name": "center_gs",
          "parameter_has_default": true,
          "parameter_default": 0,
          "type": {
            "type": "number",
            "description": "numeric value between 0.0 and 10.0"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0
        },
        {
          "label": "Right Guidance",
          "parameter_name": "right_gs",
          "parameter_has_default": true,
          "parameter_default": 0,
          "type": {
            "type": "number",
            "description": "numeric value between 0.0 and 10.0"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0
        },
        {
          "label": "Tile Overlap",
          "parameter_name": "overlap_pixels",
          "parameter_has_default": true,
          "parameter_default": 256,
          "type": {
            "type": "number",
            "description": "numeric value between 0 and 512"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0
        },
        {
          "label": "Inference Steps",
          "parameter_name": "steps",
          "parameter_has_default": true,
          "parameter_default": 9,
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
          "label": "Time Shift",
          "parameter_name": "shift",
          "parameter_has_default": true,
          "parameter_default": 3,
          "type": {
            "type": "number",
            "description": "numeric value between 1.0 and 10.0"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 1
        },
        {
          "label": "Seed",
          "parameter_name": "generation_seed",
          "parameter_has_default": true,
          "parameter_default": 0,
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
          "label": "Blending Method",
          "parameter_name": "tile_weighting_method",
          "parameter_has_default": true,
          "parameter_default": "Cosine",
          "type": {
            "type": "string",
            "enum": [
              "Cosine",
              "Gaussian"
            ]
          },
          "python_type": {
            "type": "Literal['Cosine', 'Gaussian']",
            "description": ""
          },
          "component": "Dropdown",
          "example_input": "Cosine"
        },
        {
          "label": "Prompt Language",
          "parameter_name": "prompt_language",
          "parameter_has_default": true,
          "parameter_default": "English",
          "type": {
            "enum": [
              "English",
              "Korean",
              "Chinese"
            ],
            "title": "Radio",
            "type": "string"
          },
          "python_type": {
            "type": "Literal['English', 'Korean', 'Chinese']",
            "description": ""
          },
          "component": "Radio",
          "example_input": "English"
        },
        {
          "label": "Actual Height",
          "parameter_name": "target_height",
          "parameter_has_default": true,
          "parameter_default": "1024",
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
          "label": "Actual Width",
          "parameter_name": "target_width",
          "parameter_has_default": true,
          "parameter_default": "3072",
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
          "label": "HDR Effect",
          "parameter_name": "hdr",
          "parameter_has_default": true,
          "parameter_default": 0.1,
          "type": {
            "type": "number",
            "description": "numeric value between 0.0 and 1.0"
          },
          "python_type": {
            "type": "float",
            "description": ""
          },
          "component": "Slider",
          "example_input": 0
        },
        {
          "label": "Randomize Seed",
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
        }
      ],
      "show_api": true,
      "description": "Generate a panoramic image using the Z-Image Turbo model with tiling and composition."
    }
  },
  "unnamed_endpoints": {

  }
}