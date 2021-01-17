## What we provide

- Google Auth (Skeleton.js & auth.js)
- Socket Infrastructure (client-socket.js & server-socket.js)
  - Disclaimer: Socket isn't being taught until the second week.
- User Model (auth.js & user.js)

make the button indicate what option you selected

handle edits and deletes

oof

## What you need to change

- Change the font in utilities.css
- Change the Frontend CLIENT_ID for Google Auth (Skeleton.js) (we'll talk about it at the end of week 2)
- Change the Server CLIENT_ID for Google Auth (auth.js) (we'll talk about it at the end of week 2)
- Add a favicon to your website at the path client/dist/favicon.ico
- Update website title in client/dist/index.html
- Update this README file ;)

## Socket stuff

Note: we'll be getting to this in lecture in week 2, so don't worry if you don't know it yet

- If you're not using realtime updating or don't need server->client communication, you can remove socket entirely! (server-socket.js, client-socket.js, and anything that imports them)
- If you are using socket, consider what you want to do with the FIXME in server-socket.js

## don't touch

the following files students do not need to edit. feel free to read them if you would like.

```
client/src/index.js
client/src/utilities.js
client/src/client-socket.js
server/validator.js
server/server-socket.js
.babelrc
.npmrc
.prettierrc
package-lock.json
webpack.config.js
```

## Good luck :)
