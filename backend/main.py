from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
import os

app = FastAPI()

# Allow requests from any origin (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your model (update path if needed)
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../../my_model')
model = tf.keras.models.load_model(MODEL_PATH)

FAULT_CLASSES = ['No Fault', 'LL Fault', 'GO Fault', 'GG Fault']

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    features = data.get("features")  # Should be a list of floats
    if not features or len(features) != 4:
        return {"error": "Invalid input. Expected 4 features."}
    features_array = np.array([features], dtype=np.float32)
    probabilities = model.predict(features_array)[0]
    predicted_index = int(np.argmax(probabilities))
    predicted_class = FAULT_CLASSES[predicted_index]
    confidence = float(probabilities[predicted_index])
    return {
        "predicted_class": predicted_class,
        "confidence": confidence,
        "probabilities": {FAULT_CLASSES[i]: float(probabilities[i]) for i in range(len(FAULT_CLASSES))}
    }
