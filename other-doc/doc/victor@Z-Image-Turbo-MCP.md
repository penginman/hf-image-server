
# Bash API documentation for victor/Z-Image-Turbo-MCP
API Endpoints: 1

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /generate_image
Description: Generate a single image using the Z-Image model based on the provided prompt and settings. This function is exposed as a Gradio/MCP tool via the main 'Generate' button. It optionally enhances the prompt, configures generation parameters, and returns exactly one image plus the seed used.

```bash
curl -X POST https://victor-z-image-turbo-mcp.hf.space/gradio_api/call/generate_image -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"1024x1024 ( 1:1 )",
							
						
							42,
							
						
							8,
							
						
							3,
							
						
							true
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://victor-z-image-turbo-mcp.hf.space/gradio_api/call/generate_image/$EVENT_ID
```

Accepts 6 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the Resolution Dropdown component. 

[2]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Steps Slider component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Time Shift Slider component. 

[6]:
- Type: boolean
- Required
- The input value that is provided in the Random Seed Checkbox component. 

Returns list of 3 elements:

[0]: - Type: string
- The output value that appears in the "Generated Image" Image component.

[1]: - Type: string
- The output value that appears in the "Seed Used" Textbox component.

[2]: - Type: 
- The output value that appears in the "Seed" Number component.

