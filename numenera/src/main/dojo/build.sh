cp -r ~/git/numenera/numenera/src/main/dojo/* .
chmod u+x build.sh
util/buildScripts/build.sh --profile numenera.profile.js
cp index.html ../release/
cp cache.manifest ../release/