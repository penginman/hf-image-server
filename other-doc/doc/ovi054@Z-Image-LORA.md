1. Confirm that you have cURL installed on your system.

copy
$ curl --version
2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data. If this is a private Space, you may need to pass your Hugging Face token as well (read more). Or use the 
API Recorder

 to automatically generate your API requests.
 
Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See curl docs.

API name: /infer
copy
curl -X POST https://ovi054-z-image-lora.hf.space/gradio_api/call/infer -s -H "Content-Type: application/json" -d '{
  "data": [
							"Hello!!",
							-1,
							true,
							64,
							64,
							0,
							1,
							"Hello!!",
							0
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://ovi054-z-image-lora.hf.space/gradio_api/call/infer/$EVENT_ID
Accepts 9 parameters:
[0] string Required

The input value that is provided in the "Prompt" Textbox component.

[1] number Required

The input value that is provided in the "Seed" Slider component.

[2] boolean Required

The input value that is provided in the "Randomize seed" Checkbox component.

[3] number Required

The input value that is provided in the "Width" Slider component.

[4] number Required

The input value that is provided in the "Height" Slider component.

[5] number Required

The input value that is provided in the "Guidance Scale" Slider component.

[6] number Required

The input value that is provided in the "Inference steps steps" Slider component.

[7] string Required

The input value that is provided in the "Custom LoRA (optional)" Textbox component.

[8] number Required

The input value that is provided in the "LoRA Scale" Slider component.

Returns list of 2 elements
[0] string

The output value that appears in the "Image Output" Image component.

[1] number

The output value that appears in the "Seed" Slider component.