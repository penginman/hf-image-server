
# Bash API documentation for saurabhkals/Z-Image-Turbo
API Endpoints: 2

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /toggle_seed


```bash
curl -X POST https://saurabhkals-z-image-turbo.hf.space/gradio_api/call/toggle_seed -s -H "Content-Type: application/json" -d '{
	"data": [
							true
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://saurabhkals-z-image-turbo.hf.space/gradio_api/call/toggle_seed/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: boolean
- Required
- The input value that is provided in the 🎲 Random Seed Checkbox component. 

Returns 1 element:

- Type: 
- The output value that appears in the "value_13" Number component.



### API Name: /generate_images


```bash
curl -X POST https://saurabhkals-z-image-turbo.hf.space/gradio_api/call/generate_images -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							1024,
							
						
							1024,
							
						
							8,
							
						
							42,
							
						
							true
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://saurabhkals-z-image-turbo.hf.space/gradio_api/call/generate_images/$EVENT_ID
```

Accepts 7 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the 🧠 Character Memory / Style Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the 📖 Story Scenes Input Textbox component. 

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
- The input value that is provided in the Inference Steps (Turbo Recommended: 8) Slider component. 

[5]:
- Type: any
- Required
- The input value that is provided in the parameter_13 Number component. 

[6]:
- Type: boolean
- Required
- The input value that is provided in the 🎲 Random Seed Checkbox component. 

Returns list of 3 elements:

[0]: - Type: 
- The output value that appears in the "Generated Story Frames" Gallery component.

[1]: - Type: 
- The output value that appears in the "⬇ Download ZIP (For Video Editing)" File component.

[2]: - Type: number
- The output value that appears in the "Seed Used" Number component.

