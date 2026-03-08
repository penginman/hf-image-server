
# Bash API documentation for Kentuss/Z-Image-Turbo-LoRA-DLC
API Endpoints: 5

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /update_selection


```bash
curl -X POST https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/update_selection -s -H "Content-Type: application/json" -d '{
	"data": [
							1024,
							
						
							1024
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/update_selection/$EVENT_ID
```

Accepts 2 parameters:

[0]:
- Type: number
- Required
- The input value that is provided in the Width Slider component. 

[1]:
- Type: number
- Required
- The input value that is provided in the Height Slider component. 

Returns list of 4 elements:

[0]: - Type: string
- The output value that appears in the "Enter Prompt" Textbox component.

[1]: - Type: string
- The output value that appears in the "value_11" Markdown component.

[2]: - Type: number
- The output value that appears in the "Width" Slider component.

[3]: - Type: number
- The output value that appears in the "Height" Slider component.



### API Name: /add_custom_lora


```bash
curl -X POST https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/add_custom_lora -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!"
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/add_custom_lora/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: string
- Required
- The input value that is provided in the Enter Custom LoRA Textbox component. 

Returns list of 4 elements:

[0]: - Type: string
- The output value that appears in the "value_17" Html component.

[1]: - Type: 
- The output value that appears in the "Z-Image LoRAs" Gallery component.

[2]: - Type: string
- The output value that appears in the "value_11" Markdown component.

[3]: - Type: string
- The output value that appears in the "Enter Prompt" Textbox component.



### API Name: /remove_custom_lora


```bash
curl -X POST https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/remove_custom_lora -s -H "Content-Type: application/json" -d '{
	"data": [
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/remove_custom_lora/$EVENT_ID
```

Accepts 0 parameters:



Returns list of 4 elements:

[0]: - Type: string
- The output value that appears in the "value_17" Html component.

[1]: - Type: 
- The output value that appears in the "Z-Image LoRAs" Gallery component.

[2]: - Type: string
- The output value that appears in the "value_11" Markdown component.

[3]: - Type: string
- The output value that appears in the "Enter Custom LoRA" Textbox component.



### API Name: /run_lora


```bash
curl -X POST https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/run_lora -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							{"path":"https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png","meta":{"_type":"gradio.FileData"}},
							
						
							0.75,
							
						
							0,
							
						
							9,
							
						
							true,
							
						
							462181218,
							
						
							1024,
							
						
							1024,
							
						
							0.95
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/run_lora/$EVENT_ID
```

Accepts 10 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the Enter Prompt Textbox component. 

[1]:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the Input image (Ignored for Z-Image-Turbo) Image component. For input, either path or url must be provided. For output, path is always provided.

[2]:
- Type: number
- Required
- The input value that is provided in the Denoise Strength Slider component. 

[3]:
- Type: number
- Required
- The input value that is provided in the CFG Scale Slider component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Steps Slider component. 

[6]:
- Type: boolean
- Required
- The input value that is provided in the Randomize seed Checkbox component. 

[7]:
- Type: number
- Required
- The input value that is provided in the Seed Slider component. 

[8]:
- Type: number
- Required
- The input value that is provided in the Width Slider component. 

[9]:
- Type: number
- Required
- The input value that is provided in the Height Slider component. 

[10]:
- Type: number
- Required
- The input value that is provided in the LoRA Scale Slider component. 

Returns list of 3 elements:

[0]: - Type: string
- The output value that appears in the "Generated Image" Image component.

[1]: - Type: number
- The output value that appears in the "Seed" Slider component.

[2]: - Type: string
- The output value that appears in the "value_20" Markdown component.



### API Name: /get_random_value


```bash
curl -X POST https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/get_random_value -s -H "Content-Type: application/json" -d '{
	"data": [
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://kentuss-z-image-turbo-lora-dlc.hf.space/gradio_api/call/get_random_value/$EVENT_ID
```

Accepts 0 parameters:



Returns 1 element:

- Type: number
- The output value that appears in the "Seed" Slider component.

