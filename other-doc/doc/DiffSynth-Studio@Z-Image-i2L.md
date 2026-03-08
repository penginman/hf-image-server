
# Bash API documentation for DiffSynth-Studio/Z-Image-i2L
API Endpoints: 5

1. Confirm that you have cURL installed on your system.

```bash
curl --version
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data.

Making a prediction and getting a result requires 2 requests: a POST and a GET request. The POST request returns an EVENT_ID, which is used in the second GET request to fetch the results. In these snippets, we've used awk and read to parse the results, combining these two requests into one command for ease of use. See [curl docs](https://www.gradio.app/guides/querying-gradio-apps-with-curl).

### API Name: /image_to_lora
Description: Convert input images to a LoRA model.

```bash
curl -X POST https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/image_to_lora -s -H "Content-Type: application/json" -d '{
	"data": [
							[]
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/image_to_lora/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: any
- Required
- The input value that is provided in the Upload Style Images (1-6 images) Gallery component. null

Returns list of 2 elements:

[0]: - Type: 
- The output value that appears in the "Generated LoRA File" File component.

[1]: - Type: string
- The output value that appears in the "Status" Textbox component.



### API Name: /lambda


```bash
curl -X POST https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/lambda -s -H "Content-Type: application/json" -d '{
	"data": [
							{"path":"https://github.com/gradio-app/gradio/raw/main/test/test_files/sample_file.pdf","meta":{"_type":"gradio.FileData"}}
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/lambda/$EVENT_ID
```

Accepts 1 parameter:

[0]:
- Type: any
- Required
- The input value that is provided in the Generated LoRA File File component. The FileData class is a subclass of the GradioModel class that represents a file object within a Gradio interface. It is used to store file data and metadata when a file is uploaded.

Attributes:
    path: The server file path where the file is stored.
    url: The normalized server URL pointing to the file.
    size: The size of the file in bytes.
    orig_name: The original filename before upload.
    mime_type: The MIME type of the file.
    is_stream: Indicates whether the file is a stream.
    meta: Additional metadata used internally (should not be changed).

Returns 1 element:

- Type: 
- The output value that appears in the "LoRA File (from Step 1 or upload)" File component.



### API Name: /generate_image
Description: Generate an image using the created LoRA.

```bash
curl -X POST https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/generate_image -s -H "Content-Type: application/json" -d '{
	"data": [
							{"path":"https://github.com/gradio-app/gradio/raw/main/test/test_files/sample_file.pdf","meta":{"_type":"gradio.FileData"}},
							
						
							"a cat",
							
						
							"泛黄，发绿，模糊，低分辨率，低质量图像，扭曲的肢体，诡异的外观，丑陋，AI感，噪点，网格感，JPEG压缩条纹，异常的肢体，水印，乱码，意义不明的字符",
							
						
							0,
							
						
							4,
							
						
							8,
							
						
							50
						
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/generate_image/$EVENT_ID
```

Accepts 7 parameters:

[0]:
- Type: any
- Required
- The input value that is provided in the LoRA File (from Step 1 or upload) File component. The FileData class is a subclass of the GradioModel class that represents a file object within a Gradio interface. It is used to store file data and metadata when a file is uploaded.

Attributes:
    path: The server file path where the file is stored.
    url: The normalized server URL pointing to the file.
    size: The size of the file in bytes.
    orig_name: The original filename before upload.
    mime_type: The MIME type of the file.
    is_stream: Indicates whether the file is a stream.
    meta: Additional metadata used internally (should not be changed).

[1]:
- Type: string
- Required
- The input value that is provided in the Prompt Textbox component. 

[2]:
- Type: string
- Required
- The input value that is provided in the Negative Prompt Textbox component. 

[3]:
- Type: any
- Required
- The input value that is provided in the Seed Number component. 

[4]:
- Type: number
- Required
- The input value that is provided in the CFG Scale Slider component. 

[5]:
- Type: number
- Required
- The input value that is provided in the Sigma Shift Slider component. 

[6]:
- Type: number
- Required
- The input value that is provided in the Steps Slider component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "Generated Image" Image component.

[1]: - Type: string
- The output value that appears in the "Status" Textbox component.



### API Name: /lambda_1


```bash
curl -X POST https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/lambda_1 -s -H "Content-Type: application/json" -d '{
	"data": [
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/lambda_1/$EVENT_ID
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "Negative Prompt" Textbox component.



### API Name: /lambda_2


```bash
curl -X POST https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/lambda_2 -s -H "Content-Type: application/json" -d '{
	"data": [
	]}' \
	| awk -F'"' '{ print $4}'  \
	| read EVENT_ID; curl -N https://diffsynth-studio-z-image-i2l.hf.space/gradio_api/call/lambda_2/$EVENT_ID
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "Negative Prompt" Textbox component.

