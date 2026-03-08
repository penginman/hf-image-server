
# Bash API documentation for lulavc/Z-Image-Turbo
API Endpoints: 7

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /lambda


```bash
curl -X POST https://lulavc-z-image-turbo.hf.space/gradio_api/call/lambda -s -H "Content-Type: application/json" -d '{
	"data": [
							true
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://lulavc-z-image-turbo.hf.space/gradio_api/call/lambda/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: boolean
- Required
- The input value that is provided in the 🎲 Random Seed Checkbox component. 

Returns 1 element:

- Type: 
- The output value that appears in the "Seed" Number component.



### API Name: /generate


```bash
curl -X POST https://lulavc-z-image-turbo.hf.space/gradio_api/call/generate -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							"◻ 1:1  · 1024×1024",
							
						
							8,
							
						
							1,
							
						
							3,
							
						
							42,
							
						
							true,
							
						
							"🇺🇸 English"
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://lulavc-z-image-turbo.hf.space/gradio_api/call/generate/$EVENT_ID
```

Accepts 9 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the ✨ Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the 🚫 Negative Prompt Textbox component. 

[2]:
- Type: string
- Required
- The input value that is provided in the 📐 Resolution Dropdown component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Steps Slider component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Guidance Scale Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Time Shift Slider component. 

[6]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[7]:
- Type: boolean
- Required
- The input value that is provided in the 🎲 Random Seed Checkbox component. 

[8]:
- Type: string
- Required
- The input value that is provided in the parameter_4 Radio component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "Generated Image" Image component.

[1]: - Type: number
- The output value that appears in the "🎲 Seed used — copy to reproduce this image" Number component.



### API Name: /generate_1


```bash
curl -X POST https://lulavc-z-image-turbo.hf.space/gradio_api/call/generate_1 -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"Hello!!",
							
						
							"◻ 1:1  · 1024×1024",
							
						
							8,
							
						
							1,
							
						
							3,
							
						
							42,
							
						
							true,
							
						
							"🇺🇸 English"
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://lulavc-z-image-turbo.hf.space/gradio_api/call/generate_1/$EVENT_ID
```

Accepts 9 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the ✨ Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the 🚫 Negative Prompt Textbox component. 

[2]:
- Type: string
- Required
- The input value that is provided in the 📐 Resolution Dropdown component. 

[3]:
- Type: number
- Required
- The input value that is provided in the Steps Slider component. 

[4]:
- Type: number
- Required
- The input value that is provided in the Guidance Scale Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Time Shift Slider component. 

[6]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[7]:
- Type: boolean
- Required
- The input value that is provided in the 🎲 Random Seed Checkbox component. 

[8]:
- Type: string
- Required
- The input value that is provided in the parameter_4 Radio component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "Generated Image" Image component.

[1]: - Type: number
- The output value that appears in the "🎲 Seed used — copy to reproduce this image" Number component.



### API Name: /surprise_me


```bash
curl -X POST https://lulavc-z-image-turbo.hf.space/gradio_api/call/surprise_me -s -H "Content-Type: application/json" -d '{
	"data": [
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://lulavc-z-image-turbo.hf.space/gradio_api/call/surprise_me/$EVENT_ID
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "✨ Prompt" Textbox component.



### API Name: /enhance_prompt
Description: Use a HF-hosted LLM to enrich the prompt for richer image generation.

```bash
curl -X POST https://lulavc-z-image-turbo.hf.space/gradio_api/call/enhance_prompt -s -H "Content-Type: application/json" -d '{
	"data": [
							"Hello!!",
							
						
							"🇺🇸 English"
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://lulavc-z-image-turbo.hf.space/gradio_api/call/enhance_prompt/$EVENT_ID
```

Accepts 2 parameters:

[0]:
- Type: string
- Required
- The input value that is provided in the ✨ Prompt Textbox component. 

[1]:
- Type: string
- Required
- The input value that is provided in the parameter_4 Radio component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "✨ Prompt" Textbox component.

[1]: - Type: string
- The output value that appears in the "value_9" Textbox component.



### API Name: /apply_quality_preset
Description: Apply quality preset to guidance_scale and steps sliders.

```bash
curl -X POST https://lulavc-z-image-turbo.hf.space/gradio_api/call/apply_quality_preset -s -H "Content-Type: application/json" -d '{
	"data": [
							"⚖️ Balanced"
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://lulavc-z-image-turbo.hf.space/gradio_api/call/apply_quality_preset/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: string
- Required
- The input value that is provided in the 🎯 Quality Preset Dropdown component. 

Returns list of 2 elements:

[0]: - Type: number
- The output value that appears in the "Guidance Scale" Slider component.

[1]: - Type: number
- The output value that appears in the "Steps" Slider component.



### API Name: /switch_language


```bash
curl -X POST https://lulavc-z-image-turbo.hf.space/gradio_api/call/switch_language -s -H "Content-Type: application/json" -d '{
	"data": [
							"🇺🇸 English"
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://lulavc-z-image-turbo.hf.space/gradio_api/call/switch_language/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: string
- Required
- The input value that is provided in the parameter_4 Radio component. 

Returns list of 11 elements:

[0]: - Type: string
- The output value that appears in the "✨ Prompt" Textbox component.

[1]: - Type: string
- The output value that appears in the "📐 Resolution" Dropdown component.

[2]: - Type: string
- The output value that appears in the "🎯 Quality Preset" Dropdown component.

[3]: - Type: string
- The output value that appears in the "🚫 Negative Prompt" Textbox component.

[4]: - Type: number
- The output value that appears in the "Steps" Slider component.

[5]: - Type: number
- The output value that appears in the "Guidance Scale" Slider component.

[6]: - Type: number
- The output value that appears in the "Time Shift" Slider component.

[7]: - Type: boolean
- The output value that appears in the "🎲 Random Seed" Checkbox component.

[8]: - Type: 
- The output value that appears in the "Seed" Number component.

[9]: - Type: string
- The output value that appears in the "value_27" Markdown component.

[10]: - Type: number
- The output value that appears in the "🎲 Seed used — copy to reproduce this image" Number component.

