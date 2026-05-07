# Backend Flask + OCR Service
FROM python:3.11-slim

# Install Tesseract OCR (system dependency)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements
COPY ai_service/requirements.txt ./requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY ai_service/ .

# Expose port
EXPOSE 8083

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8083/')"

# Run Flask
CMD ["python", "app.py"]
