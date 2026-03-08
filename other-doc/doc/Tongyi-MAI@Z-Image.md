
# Bash API documentation for Tongyi-MAI/Z-Image
API Endpoints: 2

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /update_res_choices


```bash
curl -X POST https://tongyi-mai-z-image.hf.space/gradio_api/call/update_res_choices -s -H "Content-Type: application/json" -d '{
	"data": [
							"1024"
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://tongyi-mai-z-image.hf.space/gradio_api/call/update_res_choices/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: string
- Required
- The input value that is provided in the Resolution Category Dropdown component. 

Returns 1 element:

- Type: string
- The output value that appears in the "Width x Height (Ratio)" Dropdown component.



### API Name: /generate
Description: Generate an image using the Z-Image diffusion model. Creates high-quality images from text prompts using the Z-Image single-stream diffusion transformer. Supports English and Chinese prompts.

```bash
curl -X POST https://tongyi-mai-z-image.hf.space/gradio_api/call/generate -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							"1024x1024 ( 1:1 )",
							
						
							42,
							
						
							30,
							
						
							4,
							
						
							false,
							
						
							true,
							
						
							[]
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://tongyi-mai-z-image.hf.space/gradio_api/call/generate/$EVENT_ID
```

Accepts 9 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the Negative Prompt (optional) Textbox component. 

[2]:
- Type: string
- Required
- The input value that is provided in the Width x Height (Ratio) Dropdown component. 

[3]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Inference Steps Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Guidance Scale (CFG) Slider component. 

[6]:
- Type: boolean
- Required
- The input value that is provided in the CFG Normalization Checkbox component. 

[7]:
- Type: boolean
- Required
- The input value that is provided in the Random Seed Checkbox component. 

[8]:
- Type: any
- Required
- The input value that is provided in the Generated Images Gallery component. null

Returns list of 3 elements:

[0]: - Type: 
- The output value that appears in the "Generated Images" Gallery component.

[1]: - Type: string
- The output value that appears in the "Seed Used" Textbox component.

[2]: - Type: 
- The output value that appears in the "Seed" Number component.

