
# Bash API documentation for akhaliq/Z-Image-Turbo-controlnet
API Endpoints: 1

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /generate_image


```bash
curl -X POST https://akhaliq-z-image-turbo-controlnet.hf.space/gradio_api/call/generate_image -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"blurry, ugly, bad quality",
							
						
							None,
							
						
							"Canny",
							
						
							0.75,
							
						
							1,
							
						
							9,
							
						
							1,
							
						
							42,
							
						
							true
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://akhaliq-z-image-turbo-controlnet.hf.space/gradio_api/call/generate_image/$EVENT_ID
```

Accepts 10 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the Negative Prompt Textbox component. 

[2]:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the Control Image (Required) Image component. For input, either path or url must be provided. For output, path is always provided.

[3]:
- Type: string
- Required
- The input value that is provided in the Control Mode Radio component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Control Strength Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Image Scale Slider component. 

[6]:
- Type: number
- Required
- The input value that is provided in the Steps Slider component. 

[7]:
- Type: number
- Required
- The input value that is provided in the Guidance Slider component. 

[8]:
- Type: number
- Required
- The input value that is provided in the Seed Slider component. 

[9]:
- Type: boolean
- Required
- The input value that is provided in the Randomize Seed Checkbox component. 

Returns list of 3 elements:

[0]: - Type: string
- The output value that appears in the "Generated Image" Image component.

[1]: - Type: 
- The output value that appears in the "Seed Used" Number component.

[2]: - Type: string
- The output value that appears in the "Preprocessor Output" Image component.

