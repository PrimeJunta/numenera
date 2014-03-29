ABOUT THE CHARACTER GENERATION UTILITY

The Character Generation Utility is a fan project for the Numenera pen and paper role-playing game. See the project's
on-line help file for more details on it.

DEPENDENCIES

    The Dojo toolkit, used under Academic Free License, Version 2.1
    Font Awesome, used under MIT License and SIL Open Font License, Version 1.1
    The Lato font, used under SIL Open Font License, Version 1.1
    The Droid Sans font, used under SIL Open Font License, Version 1.1
    The Prata font, used under Apache License, Version 2.0

BUILD INSTRUCTIONS

1. Create a direcotry named "devbox" somewhere.
2. Unpack the Dojo 1.9.3 Source package into devbox and rename the directory to dojo-src.
3. Unpack the Font-Awesome 4.0.3 package into devbox/dojo-src/ and rename the directory to font-awesome.
4. Unpack the contents of src/main/dojo/ into devbox/dojo-src/, so primejunta/ appears next to dojo/, dijit/, dojox/,
   util/, and font-awesome/.
5. Copy src/main/assembly/dojo/numenera.profile.js into devbox/dojo-src.
6. Command-line into devbox/dojo-src/, and run:

$ util/buildScripts/build.sh --profile numenera.profile.js

(or the equivalent .bat command if on Windows).

If everything went as expected, your build will appear in devbox/release/.

INSTALLATION INSTRUCTIONS

Put the contents of buildbox/release/ on your web server at any suitable point, and
surf to {webhome}/index.html. 

UTILITY BUILD SCRIPT

A utility shell script is provided in src/main/assembly/sh/build.sh which will automate much of the above. To run it:

1. Create a directory named "buildbox" next to "devbox" above, and copy src/main/assembly/sh/build.sh into it, and
   make it executable with chmod u+x build.sh.
2. Edit it so that the NUMENERA_HOME variable points wherever you originally unpacked/cloned the Numenera repository.

Tip: Instead of copying the the directories into dojo-src/ as above, symlink them from the Numenera repository clone.
Then simply update from GitHub and run build.sh to get a brand new build.

OTHER NOTES

An alternative index page, /index-firefox.html, is provided. This does not reference
/cypher-chargen.manifest, which means you don't have to change /cypher-chargen.manifest every
time you change something. This makes developing easier.