## What you need to change

- Change the font in utilities.css
- Change the Frontend CLIENT_ID for Google Auth (Skeleton.js) (we'll talk about it at the end of week 2)
- Change the Server CLIENT_ID for Google Auth (auth.js) (we'll talk about it at the end of week 2)
- Add a favicon to your website at the path client/dist/favicon.ico
- Update website title in client/dist/index.html
- Update this README file ;)

make the button indicate what option you selected

handle edits and deletes (for songs and attributes)

don't let song submit multiple of same attribute

hide everything in logged out state

sanitize form inputs eg. yt url and display alerts to user for fail conditions

convert watch, mobile, etc. to embed

oof

## Socket stuff

Note: we'll be getting to this in lecture in week 2, so don't worry if you don't know it yet

- If you're not using realtime updating or don't need server->client communication, you can remove socket entirely! (server-socket.js, client-socket.js, and anything that imports them)
- If you are using socket, consider what you want to do with the FIXME in server-socket.js

## Good luck :)
