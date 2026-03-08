
# Bash API documentation for bobber/Z-Image-to-LoRA
API Endpoints: 2

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /generate_lora


```bash
curl -X POST https://bobber-z-image-to-lora.hf.space/gradio_api/call/generate_lora -s -H "Content-Type: application/json" -d '{
	"data": [
							[]
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://bobber-z-image-to-lora.hf.space/gradio_api/call/generate_lora/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: any
- Required
- The input value that is provided in the Input images Gallery component. null

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "Generated LoRA path" Textbox component.

[1]: - Type: 
- The output value that appears in the "Download LoRA" Downloadbutton component.



### API Name: /generate_image


```bash
curl -X POST https://bobber-z-image-to-lora.hf.space/gradio_api/call/generate_image -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"a man in a fishing boat.",
							
						
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							42,
							
						
							true,
							
						
							0,
							
						
							2,
							
						
							9
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://bobber-z-image-to-lora.hf.space/gradio_api/call/generate_image/$EVENT_ID
```

Accepts 10 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Generated LoRA path Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[2]:
- Type: string
- Required
- The input value that is provided in the Negative prompt Textbox component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Width Slider component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Height Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Seed Slider component. 

[6]:
- Type: boolean
- Required
- The input value that is provided in the Randomize seed Checkbox component. 

[7]:
- Type: number
- Required
- The input value that is provided in the Guidance scale Slider component. 

[8]:
- Type: number
- Required
- The input value that is provided in the Lora Strength Slider component. 

[9]:
- Type: number
- Required
- The input value that is provided in the Steps Slider component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "Generated image" Image component.

[1]: - Type: number
- The output value that appears in the "Seed" Slider component.

