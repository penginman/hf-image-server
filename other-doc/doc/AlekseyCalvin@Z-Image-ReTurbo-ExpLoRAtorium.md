1. Confirm that you have cURL installed on your system.

copy
$ curl --version
2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data. If this is a private Space, you may need to pass your Hugging Face token as well (read more). Or use the 
API Recorder

 to automatically generate your API requests.
 
Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See curl docs.

API name: /update_selection
copy
curl -X POST https://alekseycalvin-z-image-returbo-exploratorium.hf.space/gradio_api/call/update_selection -s -H "Content-Type: application/json" -d '{
  "data": [
							256,
							256
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://alekseycalvin-z-image-returbo-exploratorium.hf.space/gradio_api/call/update_selection/$EVENT_ID
Accepts 2 parameters:
[0] number Required

The input value that is provided in the "Width" Slider component.

[1] number Required

The input value that is provided in the "Height" Slider component.

Returns list of 4 elements
[0] string

The output value that appears in the "Prompt" Textbox component.

[1] string

The output value that appears in the "value_13" Markdown component.

[2] number

The output value that appears in the "Width" Slider component.

[3] number

The output value that appears in the "Height" Slider component.

API name: /run_lora
copy
curl -X POST https://alekseycalvin-z-image-returbo-exploratorium.hf.space/gradio_api/call/run_lora -s -H "Content-Type: application/json" -d '{
  "data": [
							"Hello!!",
							0,
							1,
							true,
							0,
							256,
							256,
							0
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://alekseycalvin-z-image-returbo-exploratorium.hf.space/gradio_api/call/run_lora/$EVENT_ID
Accepts 8 parameters:
[0] string Required

The input value that is provided in the "Prompt" Textbox component.

[1] number Required

The input value that is provided in the "CFG Scale" Slider component.

[2] number Required

The input value that is provided in the "Steps" Slider component.

[3] any Required

The input value that is provided in the "Randomize seed" Checkbox component.

[4] boolean Required

The input value that is provided in the "Seed" Slider component.

[5] number Required

The input value that is provided in the "Width" Slider component.

[6] number Required

The input value that is provided in the "Height" Slider component.

[7] number Required

The input value that is provided in the "LoRA Scale" Slider component.

Returns list of 2 elements
[0] string

The output value that appears in the "Generated Image" Image component.

[1] number

The output value that appears in the "Seed" Slider component.

API name: /get_random_value
copy
curl -X POST https://alekseycalvin-z-image-returbo-exploratorium.hf.space/gradio_api/call/get_random_value -s -H "Content-Type: application/json" -d '{
  "data": [
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://alekseycalvin-z-image-returbo-exploratorium.hf.space/gradio_api/call/get_random_value/$EVENT_ID
Accepts 0 parameters:
Returns 1 element
number

The output value that appears in the "Seed" Slider component.