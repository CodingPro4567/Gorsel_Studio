from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from PIL import (
    Image,
    ImageOps,
    ImageFilter,
    ImageEnhance
)

import io
import base64
import socket
import uvicorn

# -------------------------
# APP
# -------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# FREE PORT (AUTO FIX)
# -------------------------
def get_free_port():
    s = socket.socket()
    s.bind(("", 0))
    port = s.getsockname()[1]
    s.close()
    return port

# -------------------------
# HEALTH CHECK
# -------------------------
@app.get("/")
def home():
    return {"status": "running"}

# -------------------------
# IMAGE PROCESS
# -------------------------
@app.post("/process")
async def process_image(
    file: UploadFile = File(...),
    effect: str = "none",
    value: float = 0.5
):
    try:
        contents = await file.read()

        original = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        image = original.copy()

        # clamp
        value = max(0.0, min(1.0, value))

        # ---------------- BRIGHTNESS ----------------
        if effect == "brightness":
            effected = ImageEnhance.Brightness(image).enhance(1 + value * 2)
            image = Image.blend(original, effected, value)

        # ---------------- CONTRAST ----------------
        elif effect == "contrast":
            effected = ImageEnhance.Contrast(image).enhance(1 + value * 2)
            image = Image.blend(original, effected, value)

        # ---------------- SHARPNESS ----------------
        elif effect == "sharpness":
            effected = ImageEnhance.Sharpness(image).enhance(1 + value * 4)
            image = Image.blend(original, effected, value)

        # ---------------- GRAYSCALE ----------------
        elif effect == "grayscale":
            gray = ImageOps.grayscale(image).convert("RGB")
            image = Image.blend(original, gray, value)

        # ---------------- SEPIA ----------------
        elif effect == "sepia":
            gray = ImageOps.grayscale(image)
            sepia = ImageOps.colorize(gray, "#3d2b1f", "#e0c9a6")
            image = Image.blend(original, sepia, value)

        # ---------------- BLUR ----------------
        elif effect == "blur":
            radius = value * 12
            blur = image.filter(ImageFilter.GaussianBlur(radius))
            image = Image.blend(original, blur, value)

        # ---------------- EMBOSS ----------------
        elif effect == "emboss":
            embossed = image.filter(ImageFilter.EMBOSS)
            image = Image.blend(original, embossed, value)

        # ---------------- CONTOUR ----------------
        elif effect == "contour":
            contour = image.filter(ImageFilter.CONTOUR)
            image = Image.blend(original, contour, value)

        # ---------------- DETAIL ----------------
        elif effect == "detail":
            detailed = image.filter(ImageFilter.DETAIL)
            image = Image.blend(original, detailed, value)

        # ---------------- EDGE ENHANCE ----------------
        elif effect == "edge_enhance":
            edge = image.filter(ImageFilter.EDGE_ENHANCE_MORE)
            image = Image.blend(original, edge, value)

        # ---------------- NONE ----------------
        else:
            image = original

        # ---------------- OUTPUT ----------------
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")

        img_str = base64.b64encode(buffer.getvalue()).decode()

        return {
            "image": f"data:image/png;base64,{img_str}"
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

# -------------------------
# MAIN (IMPORTANT FIX)
# -------------------------
if __name__ == "__main__":

    port = get_free_port()  # 🔥 çakışma yok

    print(f"Server starting on port: {port}")

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=port,
        reload=False
    )