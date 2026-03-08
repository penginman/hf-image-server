1. Confirm that you have cURL installed on your system.

copy
$ curl --version
2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data. If this is a private Space, you may need to pass your Hugging Face token as well (read more). Or use the 
API Recorder

 to automatically generate your API requests.
 
Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See curl docs.

API name: /generate_image Generate N images using a deterministic seed cascade (x1..xN).
copy
curl -X POST https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/generate_image -s -H "Content-Type: application/json" -d '{
  "data": [
							"Hello!!",
							"Hello!!",
							512,
							512,
							1,
							1,
							0,
							3,
							true
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/generate_image/$EVENT_ID
Accepts 9 parameters:
[0] string Required

The input value that is provided in the "Prompt" Textbox component.

[1] string Required

The input value that is provided in the "Negative Prompt" Textbox component.

[2] number Required

The input value that is provided in the "Height" Slider component.

[3] number Required

The input value that is provided in the "Width" Slider component.

[4] number Required

The input value that is provided in the "Images" Slider component.

[5] number Required

The input value that is provided in the "Inference Steps" Slider component.

[6] number Required

The input value that is provided in the "CFG Guidance Scale" Slider component.

[7] any Required

The input value that is provided in the "Base Seed" Number component.

[8] boolean Required

The input value that is provided in the "Randomize" Checkbox component.

Returns list of 3 elements
[0]

The output value that appears in the "Generated Grid" Gallery component.

[1] string

The output value that appears in the "Seed Cascade (x1 · x2 · ... · xN)" Textbox component.

[2]

The output value that appears in the "Base Seed" Number component.

API name: /append_history Append new images to the history state.
copy
curl -X POST https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/append_history -s -H "Content-Type: application/json" -d '{
  "data": [
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/append_history/$EVENT_ID
Accepts 0 parameters:
Returns 1 element

The output value that appears in the "History" Gallery component.

API name: /generate_image_1 Generate N images using a deterministic seed cascade (x1..xN).
copy
curl -X POST https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/generate_image_1 -s -H "Content-Type: application/json" -d '{
  "data": [
							"Hello!!",
							"Hello!!",
							512,
							512,
							1,
							1,
							0,
							3,
							true
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/generate_image_1/$EVENT_ID
Accepts 9 parameters:
[0] string Required

The input value that is provided in the "Prompt" Textbox component.

[1] string Required

The input value that is provided in the "Negative Prompt" Textbox component.

[2] number Required

The input value that is provided in the "Height" Slider component.

[3] number Required

The input value that is provided in the "Width" Slider component.

[4] number Required

The input value that is provided in the "Images" Slider component.

[5] number Required

The input value that is provided in the "Inference Steps" Slider component.

[6] number Required

The input value that is provided in the "CFG Guidance Scale" Slider component.

[7] any Required

The input value that is provided in the "Base Seed" Number component.

[8] boolean Required

The input value that is provided in the "Randomize" Checkbox component.

Returns list of 3 elements
[0]

The output value that appears in the "Generated Grid" Gallery component.

[1] string

The output value that appears in the "Seed Cascade (x1 · x2 · ... · xN)" Textbox component.

[2]

The output value that appears in the "Base Seed" Number component.

API name: /append_history_1 Append new images to the history state.
copy
curl -X POST https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/append_history_1 -s -H "Content-Type: application/json" -d '{
  "data": [
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/append_history_1/$EVENT_ID
Accepts 0 parameters:
Returns 1 element

The output value that appears in the "History" Gallery component.

API name: /package_zip Pack the current image list into a ZIP file for download.
copy
curl -X POST https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/package_zip -s -H "Content-Type: application/json" -d '{
  "data": [
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://xiaopeng-z-image-turbo-free.hf.space/gradio_api/call/package_zip/$EVENT_ID
Accepts 0 parameters:
Returns 1 element
