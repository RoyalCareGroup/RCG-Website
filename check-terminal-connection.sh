#!/bin/bash

# Terminal Connection Diagnostic Script
# For RoyalCareGroup/RCG-Website
# This script tests various aspects of terminal and GitHub connectivity

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     TERMINAL CONNECTION DIAGNOSTIC TOOL                        ║"
echo "║     Repository: RoyalCareGroup/RCG-Website                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Function to check command status
check_status() {
    if [ $? -eq 0 ]; then
        echo "✅ PASS"
    else
        echo "❌ FAIL"
    fi
}

# 1. Git Configuration Check
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. GIT CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git config user.name > /dev/null 2>&1
printf "   Git User Configured: "
check_status
echo "   User: $(git config user.name)"
echo "   Email: $(git config user.email)"
echo "   Remote: $(git remote get-url origin)"
echo ""

# 2. Repository Status
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. REPOSITORY STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "   Repository Clean: "
git status --porcelain | grep -q . && echo "❌ UNCOMMITTED CHANGES" || echo "✅ CLEAN"
echo "   Current Branch: $(git branch --show-current)"
echo "   Latest Commit: $(git log -1 --oneline)"
echo ""

# 3. DNS Resolution
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. DNS RESOLUTION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "   Resolve github.com: "
nslookup github.com > /dev/null 2>&1
check_status
GITHUB_IP=$(nslookup github.com 2>/dev/null | grep "Address:" | tail -1 | awk '{print $2}')
echo "   GitHub IP: $GITHUB_IP"
echo ""

# 4. Network Connectivity
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. NETWORK CONNECTIVITY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "   GitHub Web (HTTP): "
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://github.com)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ PASS (Status: $HTTP_STATUS)"
else
    echo "❌ FAIL (Status: $HTTP_STATUS)"
fi

printf "   GitHub API: "
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://api.github.com)
if [ "$API_STATUS" = "200" ]; then
    echo "✅ PASS (Status: $API_STATUS)"
elif [ "$API_STATUS" = "403" ]; then
    echo "⚠️  LIMITED (Status: $API_STATUS - Authentication required)"
else
    echo "❌ FAIL (Status: $API_STATUS)"
fi
echo ""

# 5. Network Interface
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. NETWORK INTERFACE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "   Primary Interface: "
ip addr show eth0 > /dev/null 2>&1
check_status
ETH0_IP=$(ip addr show eth0 2>/dev/null | grep "inet " | awk '{print $2}' | cut -d'/' -f1)
echo "   IP Address: $ETH0_IP"
ETH0_STATE=$(ip addr show eth0 2>/dev/null | grep -o "state [A-Z]*" | awk '{print $2}')
echo "   State: $ETH0_STATE"
echo ""

# 6. GitHub Environment
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. GITHUB ACTIONS ENVIRONMENT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -n "$GITHUB_ACTIONS" ]; then
    echo "   Running in GitHub Actions: ✅ YES"
    echo "   Repository: $GITHUB_REPOSITORY"
    echo "   Workflow: $GITHUB_WORKFLOW"
    echo "   Actor: $GITHUB_ACTOR"
    echo "   Ref: $GITHUB_REF_NAME"
else
    echo "   Running in GitHub Actions: ❌ NO"
fi
echo ""

# 7. Summary
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                         SUMMARY                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

ISSUES=0

if [ "$HTTP_STATUS" != "200" ]; then
    echo "⚠️  GitHub web connectivity issue detected"
    ((ISSUES++))
fi

if ! git config user.name > /dev/null 2>&1; then
    echo "❌ Git not configured properly"
    ((ISSUES++))
fi

if [ -z "$ETH0_IP" ]; then
    echo "❌ No network interface IP detected"
    ((ISSUES++))
fi

if [ $ISSUES -eq 0 ]; then
    echo "✅ ALL CRITICAL SYSTEMS OPERATIONAL"
    echo ""
    echo "   Terminal connection is CURRENT and LIVE."
    echo "   No issues detected with repository connectivity."
    echo ""
    echo "   If experiencing GitHub panel issues in Google AI Studio,"
    echo "   the problem is likely on the AI Studio side, not here."
else
    echo "⚠️  $ISSUES ISSUE(S) DETECTED"
    echo ""
    echo "   Review the diagnostics above for details."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Diagnostic completed at: $(date)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
