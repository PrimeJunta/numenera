ABOUT THE CHARACTER GENERATION UTILITY

The Character Generation Utility is a fan project for the Numenera pen and
paper role-playing game. See the project's on-line help file for more details
on it.

DEPENDENCIES

The project depends on Dojo 1.9.1.

BUILD INSTRUCTIONS

1. Unpack the Dojo 1.9.1 Source package into a directory.
2. Unpack the contents of src/main/dojo/ into the same directory, so 
   primejunta/ appears next to dojo/, dijit/, dojox/, util/ and the rest.
3. Command-line into the same directory, and run:

$ util/buildScripts/build.sh --profile numenera.profile.js

(or the equivalent .bat command if on Windows).

If everything went as expected, your build will appear one directory up, under
../release/.

INSTALLATION INSTRUCTIONS

Put the contents of ../release/ on your web server at any suitable point, and
surf to {webhome}/index.html. All paths in the webapp are relative to that
point so it should work from the get-go. Your browser's security features may
prevent running it directly from the filesystem, though.

OTHER NOTES

An alternative index page, /chargen.html, is provided. This does not reference
/cache.manifest, which means you don't have to change /cache.manifest every
time you change something. This makes developing easier.