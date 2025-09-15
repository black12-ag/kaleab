#!/bin/bash

# 🚀 Quick Deploy to Netlify Script
# This script builds your portfolio for production and prepares it for deployment

echo "🚀 Building Portfolio for Netlify Deployment..."
echo "=============================================="

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Build for production with Telegram bot integration
echo "🔧 Building for production..."
npm run build:prod

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📁 Files ready in 'dist' folder:"
    ls -la dist/
    echo ""
    echo "🌐 Ready for Netlify deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://netlify.com"
    echo "2. Drag the 'dist' folder to deploy"
    echo "3. Or connect your GitHub repo for auto-deploys"
    echo ""
    echo "🤖 Telegram bot integration is included!"
    echo "📱 Contact form will send messages directly to your Telegram"
    echo ""
else
    echo ""
    echo "❌ Build failed!"
    echo "Check the error messages above and fix any issues."
    echo ""
fi