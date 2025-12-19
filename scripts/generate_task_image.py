import os
import sys
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    # Try VITE prefix just in case
    api_key = os.getenv("VITE_OPENAI_API_KEY")

if not api_key:
    print("Error: OPENAI_API_KEY not found in .env")
    sys.exit(1)

client = OpenAI(api_key=api_key)

prompt = """
A premium, high-fidelity promotional showcase for a "Task Management System" web application. 
The composition features a dynamic multi-screen layout with a main Macbook Pro screen showing a sophisticated Kanban board interface with dark mode, glowing accents, and user avatars. 
Surrounding it are floating mobile devices (iPhone 15 Pro) showing the responsive mobile view of the task list and chat. 
The aesthetic is modern, tech-focused, and luxurious, with a deep blue and purple abstract background, glassmorphism elements, and dramatic lighting. 
High resolution, 8k, photorealistic 3D render style, similar to Apple product showcases.
"""

print(f"Generating image with prompt: {prompt}")

try:
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="hd",
        n=1,
    )

    image_url = response.data[0].url
    print(f"Image generated: {image_url}")
    
    # Download the image
    import requests
    img_data = requests.get(image_url).content
    
    output_path = "public/images/task-manager-showcase.png"
    with open(output_path, 'wb') as handler:
        handler.write(img_data)
        
    print(f"Image saved to {output_path}")

except Exception as e:
    print(f"Error generating image: {e}")
    sys.exit(1)
