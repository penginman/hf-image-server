
# Bash API documentation for luca115/z-image-turbo
API Endpoints: 2

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /generate_image
Description: Generate an image from the given prompt.

```bash
curl -X POST https://luca115-z-image-turbo.hf.space/gradio_api/call/generate_image -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							9,
							
						
							42,
							
						
							false
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://luca115-z-image-turbo.hf.space/gradio_api/call/generate_image/$EVENT_ID
```

Accepts 6 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[1]:
- Type: number
- Required
- The input value that is provided in the Height Slider component. 

[2]:
- Type: number
- Required
- The input value that is provided in the Width Slider component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Inference Steps Slider component. 

[4]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[5]:
- Type: boolean
- Required
- The input value that is provided in the Randomize Seed Checkbox component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "Generated Image" Image component.

[1]: - Type: number
- The output value that appears in the "Seed Used" Number component.



### API Name: /generate_image_1
Description: Generate an image from the given prompt.

```bash
curl -X POST https://luca115-z-image-turbo.hf.space/gradio_api/call/generate_image_1 -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							9,
							
						
							42,
							
						
							false
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://luca115-z-image-turbo.hf.space/gradio_api/call/generate_image_1/$EVENT_ID
```

Accepts 6 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[1]:
- Type: number
- Required
- The input value that is provided in the Height Slider component. 

[2]:
- Type: number
- Required
- The input value that is provided in the Width Slider component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Inference Steps Slider component. 

[4]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[5]:
- Type: boolean
- Required
- The input value that is provided in the Randomize Seed Checkbox component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "Generated Image" Image component.

[1]: - Type: number
- The output value that appears in the "Seed Used" Number component.

