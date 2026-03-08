
# Bash API documentation for jkserge/Z_image_NSFW
API Endpoints: 2

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /generate_image
Description: Generate 4 images with seeds: seed, 2x, 3x, 4x (mod MAX_SEED).

```bash
curl -X POST https://jkserge-z-image-nsfw.hf.space/gradio_api/call/generate_image -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							9,
							
						
							0,
							
						
							42,
							
						
							false
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://jkserge-z-image-nsfw.hf.space/gradio_api/call/generate_image/$EVENT_ID
```

Accepts 8 parameters:

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
- The input value that is provided in the Inference Steps Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the CFG Guidance Scale Slider component. 

[6]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[7]:
- Type: boolean
- Required
- The input value that is provided in the Randomize Seed Checkbox component. 

Returns list of 2 elements:

[0]: - Type: 
- The output value that appears in the "Generated Images" Gallery component.

[1]: - Type: string
- The output value that appears in the "Seeds Used (base, 2x, 3x, 4x)" Textbox component.



### API Name: /generate_image_1
Description: Generate 4 images with seeds: seed, 2x, 3x, 4x (mod MAX_SEED).

```bash
curl -X POST https://jkserge-z-image-nsfw.hf.space/gradio_api/call/generate_image_1 -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							9,
							
						
							0,
							
						
							42,
							
						
							false
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://jkserge-z-image-nsfw.hf.space/gradio_api/call/generate_image_1/$EVENT_ID
```

Accepts 8 parameters:

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
- The input value that is provided in the Inference Steps Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the CFG Guidance Scale Slider component. 

[6]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[7]:
- Type: boolean
- Required
- The input value that is provided in the Randomize Seed Checkbox component. 

Returns list of 2 elements:

[0]: - Type: 
- The output value that appears in the "Generated Images" Gallery component.

[1]: - Type: string
- The output value that appears in the "Seeds Used (base, 2x, 3x, 4x)" Textbox component.

