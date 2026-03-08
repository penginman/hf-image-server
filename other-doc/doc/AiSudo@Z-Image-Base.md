
# Bash API documentation for AiSudo/Z-Image-Base
API Endpoints: 1

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /generate


```bash
curl -X POST https://aisudo-z-image-base.hf.space/gradio_api/call/generate -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							42,
							
						
							28,
							
						
							4,
							
						
							false,
							
						
							true,
							
						
							[]
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://aisudo-z-image-base.hf.space/gradio_api/call/generate/$EVENT_ID
```

Accepts 10 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the Negative Prompt (optional) Textbox component. 

[2]:
- Type: number
- Required
- The input value that is provided in the Width Slider component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Height Slider component. 

[4]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Inference Steps Slider component. 

[6]:
- Type: number
- Required
- The input value that is provided in the Guidance Scale (CFG) Slider component. 

[7]:
- Type: boolean
- Required
- The input value that is provided in the CFG Normalization Checkbox component. 

[8]:
- Type: boolean
- Required
- The input value that is provided in the Random Seed Checkbox component. 

[9]:
- Type: any
- Required
- The input value that is provided in the Generated Images Gallery component. null

Returns list of 2 elements:

[0]: - Type: 
- The output value that appears in the "Generated Images" Gallery component.

[1]: - Type: 
- The output value that appears in the "Seed" Number component.

