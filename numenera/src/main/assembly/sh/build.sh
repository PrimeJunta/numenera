#!/bin/sh
# Convenience script for building the project using Dojo build utilities. Replace paths with whatever you're using.
#
echo Crafting Numenera
export NUMENERA_HOME=~psulonen/WebstormProjects/numenera
echo Clearing sandbox
rm -Rf release
rm -Rf dojo-src
echo Copying resources to source directory
cp -RL ../devbox/dojo-src .
echo Updating build script
cp $NUMENERA_HOME/numenera/src/main/assembly/sh/build.sh . # update this file for next time
chmod u+x build.sh
echo Updating profile
cp $NUMENERA_HOME/numenera/src/main/assembly/dojo/numenera.profile.js dojo-src
echo Running Dojo build script
cd dojo-src
chmod u+x util/buildScripts/build.sh
util/buildScripts/build.sh --profile numenera.profile.js
echo Copying assets and index pages into place
cd ..
cp -R $NUMENERA_HOME/numenera/src/main/assets release/
cp dojo-src/index.html release/
cp dojo-src/cypher-chargen.manifest release/
cp dojo-src/index-firefox.html release/
echo Done. Release is in directory release/.