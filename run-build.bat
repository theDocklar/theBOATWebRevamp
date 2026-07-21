@echo off
call npm run build > build-output.txt 2>&1
echo Build complete, check build-output.txt
