import json
import os
from pathlib import Path

from dotenv import load_dotenv
import requests

try:
    import google.generativeai as genai
except Exception:
    genai = None

# ─────────────────────────────────────────────
# ENV CONFIG
# ─────────────────────────────────────────────

_dotenv_path = Path(__file__).resolve().parents[1] / ".env"

load_dotenv(dotenv_path=_dotenv_path)

DEFAULT_GEMINI_MODEL = (
    os.getenv("GEMINI_MODEL")
    or "models/gemini-2.0-flash"
)

DEFAULT_OLLAMA_HOST = (
    os.getenv("OLLAMA_HOST")
    or "http://localhost:11434"
)

DEFAULT_OLLAMA_MODEL = (
    os.getenv("OLLAMA_MODEL")
    or "gemma3:4b"
)

_model = None
_configured_api_key = None

# ─────────────────────────────────────────────
# PROMPT
# ─────────────────────────────────────────────

ACTION_PLAN_PROMPT = """
You are an expert Indian government constitutional compliance AI.

You analyze:
- court judgments
- constitutional directives
- tribunal orders
- scanned OCR legal documents
- ministry compliance notices

Your task:
Generate a highly practical government action plan.

IMPORTANT RULES:
- Return ONLY valid JSON
- No markdown
- No explanation
- Be specific
- Infer intelligently from OCR/noisy text
- Use standard government compliance timelines if unclear
- Keep action_summary concise
- Prioritize legal compliance

Extracted judgment data:
{extracted_data}

Return EXACT JSON structure:

{
  "primary_action": "COMPLY or APPEAL or COMPLY_AND_APPEAL or NO_ACTION",

  "action_summary": "short summary",

  "compliance_actions": [
    {
      "action": "specific action",
      "responsible_authority": "department or authority",
      "deadline": "deadline",
      "priority": "HIGH or MEDIUM or LOW"
    }
  ],

  "appeal_recommendation": {
    "should_appeal": true,
    "reason": "reason",
    "limitation_period": "days",
    "appeal_deadline": "date"
  },

  "risk_assessment": {
    "risk_level": "HIGH or MEDIUM or LOW",
    "consequence_of_inaction": "risk details",
    "immediate_attention_required": true
  },

  "key_deadlines": [
    {
      "event": "event",
      "date": "date",
      "is_critical": true
    }
  ],

  "departments_to_notify": [
    "department name"
  ],

  "action_plan_confidence": 0.85
}

Rules:
- If timeline missing → assume 4 weeks
- If deadline within 30 days → immediate_attention_required true
- Infer departments intelligently
- Use concise but useful legal language
"""

# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────

def clean_json_response(text: str):

    text = text.strip()

    if "```json" in text:
        text = text.split("```json")[1].split("```")[0].strip()

    elif "```" in text:
        text = text.split("```")[1].split("```")[0].strip()

    return text


def parse_json_response(text: str):

    text = clean_json_response(text)

    try:
        return json.loads(text)

    except json.JSONDecodeError:

        start = text.find("{")
        end = text.rfind("}")

        if start != -1 and end != -1:

            extracted = text[start:end + 1]

            return json.loads(extracted)

        raise


# ─────────────────────────────────────────────
# GEMINI
# ─────────────────────────────────────────────

def generate_with_gemini(prompt: str):

    global _model
    global _configured_api_key

    if genai is None:
        raise RuntimeError(
            "google-generativeai not installed"
        )

    api_key = (
        os.getenv("GEMINI_API_KEY")
        or os.getenv("GOOGLE_API_KEY")
    )

    if not api_key:
        raise RuntimeError(
            "Missing GEMINI_API_KEY"
        )

    gemini_model = (
        os.getenv("GEMINI_MODEL")
        or DEFAULT_GEMINI_MODEL
    )

    if (
        _model is None
        or _configured_api_key != api_key
    ):

        genai.configure(api_key=api_key)

        _model = genai.GenerativeModel(
            gemini_model
        )

        _configured_api_key = api_key

    print(
        f"Generating action plan with Gemini..."
        f" model={gemini_model}"
    )

    response = _model.generate_content(prompt)

    return response.text.strip()


# ─────────────────────────────────────────────
# OLLAMA
# ─────────────────────────────────────────────

def generate_with_ollama(prompt: str):

    ollama_host = (
        os.getenv("OLLAMA_HOST")
        or DEFAULT_OLLAMA_HOST
    )

    ollama_model = (
        os.getenv("OLLAMA_MODEL")
        or DEFAULT_OLLAMA_MODEL
    )

    print(
        f"Generating action plan with Ollama..."
        f" model={ollama_model}"
    )

    url = f"{ollama_host.rstrip('/')}/api/generate"

    response = requests.post(
        url,
        json={
            "model": ollama_model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.2
            }
        },
        timeout=300
    )

    response.raise_for_status()

    return (
        response.json()
        .get("response", "")
        .strip()
    )

# ─────────────────────────────────────────────
# MAIN ACTION PLAN GENERATOR
# ─────────────────────────────────────────────

def generate_action_plan(extracted_data: dict):

    load_dotenv(
        dotenv_path=_dotenv_path,
        override=True
    )

    prompt = ACTION_PLAN_PROMPT.replace(
        "{extracted_data}",
        json.dumps(
            extracted_data,
            indent=2
        )
    )

    provider = (
        os.getenv("LLM_PROVIDER")
        or "gemini"
    ).strip().lower()

    print(
        f"Using provider: {provider}"
    )

    if provider == "ollama":

        response_text = generate_with_ollama(
            prompt
        )

    else:

        response_text = generate_with_gemini(
            prompt
        )

    print(
        "Action plan generated successfully"
    )

    result = parse_json_response(
        response_text
    )

    # ─────────────────────────────────────────
    # SAFETY NORMALIZATION
    # ─────────────────────────────────────────

    if not result.get("compliance_actions"):
        result["compliance_actions"] = []

    if not result.get("departments_to_notify"):
        result["departments_to_notify"] = []

    if not result.get("key_deadlines"):
        result["key_deadlines"] = []

    if "action_plan_confidence" not in result:
        result["action_plan_confidence"] = 0.75

    return result