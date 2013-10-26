# Convenience script that copies resources from the typical git repository to
# your current one, which should be the one containing dojo-src.
#
rm -rf ../release/*
rm -rf primejunta
cp -r ~/git/numenera/numenera/src/main/dojo/* .
chmod u+x build.sh
util/buildScripts/build.sh --profile numenera.profile.js
cp -r ~/git/numenera/numenera/src/main/assets ../release/
cp index.html ../release/
cp cyphergen.html ../release/
cp cypher-chargen.manifest ../release/
cp cyphergen.manifest ../release/