# ARKK-AI Backend

## Setup

1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

2. Start the server:
   ```sh
   uvicorn main:app --reload
   ```

## API

- **POST /predict**
  - Request JSON: `{ "features": [Voltage, Frequency, PhaseAngle, BusSystem] }`
  - Response JSON: `{ "predicted_class": ..., "confidence": ..., "probabilities": {...} }`

## Model
- The backend loads the model from `../../my_model`.
- Update the path or model loading code if your model is elsewhere.
