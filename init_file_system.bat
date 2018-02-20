@echo off
cls

echo SCRIPT FOR CREATE FILESYSTEM FOR WEB PROJECT
echo ============================================
echo.
echo This scenario will create the following structure in the current directory:
echo.
echo /src/
echo     ^| icons/
echo     ^| img/
echo     ^| js/
echo         ^| lib/
echo         ^| app.js
echo     ^| sass/
echo           ^| generated/
echo                      ^| _sprite-svg.scss
echo           ^| helpers/
echo                    ^| _all.scss
echo                    ^| _helpers.scss
echo                    ^| _mixins.scss
echo                    ^| _reset.scss
echo                    ^| _variables.scss
echo           ^| lib/
echo           ^| style.scss
echo     ^| templates/
echo                ^| index.html
echo     ^| index.html
echo /docs/
echo.

:ask
set ch=
set /p ch=Do you want to continue? (y/n)
if '%ch%'=='y' goto start
if '%ch%'=='n' goto end
goto ask

:start
echo.
echo Create -dev and -dist folders...
timeout /t 1
mkdir src docs
cd src

echo.
echo Create all -dev project structure...
timeout /t 3

mkdir icons img js sass templates
cd js
mkdir lib
touch app.js
cd ..

cd sass
mkdir generated helpers lib
touch style.scss generated/_sprite-svg.scss

cd helpers
touch _all.scss _helpers.scss _mixins.scss _reset.scss _variables.scss
cd ../..

touch index.html templates/index.html
cd ..

:end
echo.
echo All tasks done! Press anykey to exit.
echo (c) Created by WitFlash
pause
