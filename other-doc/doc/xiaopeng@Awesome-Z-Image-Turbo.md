
# Bash API documentation for xiaopeng/Awesome-Z-Image-Turbo
API Endpoints: 5

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /generate_image
Description: Generate N images using a deterministic seed cascade (x1..xN).

```bash
curl -X POST https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/generate_image -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							4,
							
						
							9,
							
						
							0,
							
						
							42,
							
						
							true
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/generate_image/$EVENT_ID
```

Accepts 9 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the Negative Prompt Textbox component. 

[2]:
- Type: number
- Required
- The input value that is provided in the Height Slider component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Width Slider component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Images Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Inference Steps Slider component. 

[6]:
- Type: number
- Required
- The input value that is provided in the CFG Guidance Scale Slider component. 

[7]:
- Type: any
- Required
- The input value that is provided in the Base Seed Number component. 

[8]:
- Type: boolean
- Required
- The input value that is provided in the Randomize Checkbox component. 

Returns list of 3 elements:

[0]: - Type: 
- The output value that appears in the "Generated Grid" Gallery component.

[1]: - Type: string
- The output value that appears in the "Seed Cascade (x1 · x2 · ... · xN)" Textbox component.

[2]: - Type: 
- The output value that appears in the "Base Seed" Number component.



### API Name: /append_history
Description: Append new images to the history state.

```bash
curl -X POST https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/append_history -s -H "Content-Type: application/json" -d '{
	"data": [
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/append_history/$EVENT_ID
```

Accepts 0 parameters:



Returns 1 element:

- Type: 
- The output value that appears in the "History" Gallery component.



### API Name: /generate_image_1
Description: Generate N images using a deterministic seed cascade (x1..xN).

```bash
curl -X POST https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/generate_image_1 -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							4,
							
						
							9,
							
						
							0,
							
						
							42,
							
						
							true
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/generate_image_1/$EVENT_ID
```

Accepts 9 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the Negative Prompt Textbox component. 

[2]:
- Type: number
- Required
- The input value that is provided in the Height Slider component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Width Slider component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Images Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Inference Steps Slider component. 

[6]:
- Type: number
- Required
- The input value that is provided in the CFG Guidance Scale Slider component. 

[7]:
- Type: any
- Required
- The input value that is provided in the Base Seed Number component. 

[8]:
- Type: boolean
- Required
- The input value that is provided in the Randomize Checkbox component. 

Returns list of 3 elements:

[0]: - Type: 
- The output value that appears in the "Generated Grid" Gallery component.

[1]: - Type: string
- The output value that appears in the "Seed Cascade (x1 · x2 · ... · xN)" Textbox component.

[2]: - Type: 
- The output value that appears in the "Base Seed" Number component.



### API Name: /append_history_1
Description: Append new images to the history state.

```bash
curl -X POST https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/append_history_1 -s -H "Content-Type: application/json" -d '{
	"data": [
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/append_history_1/$EVENT_ID
```

Accepts 0 parameters:



Returns 1 element:

- Type: 
- The output value that appears in the "History" Gallery component.



### API Name: /package_zip
Description: Pack the current image list into a ZIP file for download.

```bash
curl -X POST https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/package_zip -s -H "Content-Type: application/json" -d '{
	"data": [
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://xiaopeng-awesome-z-image-turbo.hf.space/gradio_api/call/package_zip/$EVENT_ID
```

Accepts 0 parameters:



Returns 1 element:

- Type: 
- The output value that appears in the "📦 Download All History (ZIP)" Downloadbutton component.

