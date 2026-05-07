#!/bin/bash
# Quick Deployment Checklist for Samvidhan

echo "🚀 Samvidhan Free Deployment Checklist"
echo "======================================="
echo ""

# Check for required files
echo "✓ Checking deployment files..."
files_required=("Dockerfile" "render.yaml" "vercel.json" "DEPLOYMENT.md" "ai_service/.env.example")
for file in "${files_required[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file found"
    else
        echo "  ✗ $file missing"
    fi
done

echo ""
echo "📋 Pre-Deployment Checklist:"
echo ""
echo "1. [ ] GitHub Account created"
echo "2. [ ] Repository pushed to GitHub"
echo "3. [ ] Groq API key obtained from https://console.groq.com/keys"
echo "4. [ ] Vercel account created (connect GitHub)"
echo "5. [ ] Render account created (connect GitHub)"
echo ""

echo "✅ Next Steps:"
echo ""
echo "1. Follow DEPLOYMENT.md for step-by-step instructions"
echo "2. Deploy frontend on Vercel first"
echo "3. Deploy backend on Render"
echo "4. Update frontend env vars with backend URL"
echo "5. Test at https://your-app.vercel.app"
echo ""

echo "📚 Documentation: see DEPLOYMENT.md"
echo "💰 Cost: $0/month (free tier)"
