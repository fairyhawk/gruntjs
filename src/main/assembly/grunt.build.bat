@echo off
echo [INFO] ===========npm install and  grunt build.===========
cd %~dp0
cd ../../../
call npm install
echo [INFO] ===========npm install OK.===========
call grunt build
echo [INFO] ===========grunt build OK.===========
pause