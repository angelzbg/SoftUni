const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Events = require('./utils/events');
const User = require('./models/User');
const Router = require('./router');
const { PORT, connectionStr } = require('./utils/constants');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

Router(app);

mongoose
  .connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const sockets = {};

    const removeSocket = (socketId, socket) => {
      if (sockets[socketId]) {
        sockets[socketId] = sockets[socketId].filter((s) => s.id !== socket.id);
        if (!sockets[socketId].length) {
          delete sockets[socketId];
        }
      }
    };

    io.on('connection', (socket) => {
      let socketId;
      let foundUser;
      let blacklisted = false;
      let attachedExtras = false;

      socket.on('subscribeSocket', async (id) => {
        if (blacklisted) {
          return;
        }

        foundUser = foundUser || (await User.findOne({ socketId: id }));
        if (!foundUser) {
          blacklisted = true;
          removeSocket(socketId, socket);
          return;
        }

        socketId = id;
        sockets[socketId] = (sockets[socketId] || []).concat(socket);

        if (!attachedExtras) {
          attachedExtras = true;
          socket.on('multiuser', (extra) => {
            if (blacklisted) {
              return;
            }

            try {
              if (sockets[socketId] && sockets[socketId].length > 1) {
                const { channel, data } = JSON.parse(extra);
                sockets[socketId]
                  .filter((s) => s.id !== socket.id)
                  .forEach((s) => s.emit(channel, JSON.stringify(data)));
              }
            } catch (ex) {
              blacklisted = true;
              removeSocket(socketId, socket);
            }
          });
        }
      });

      socket.on('disconnect', () => removeSocket(socketId, socket));
    });

    Events.listen('emit', 'sockets', ({ id, channel, data }) =>
      sockets[id]?.forEach((s) => s.emit(channel, JSON.stringify(data)))
    );

    http.listen(PORT, console.log(`Listening on port ${PORT} -> http://localhost:${PORT}`));
  });
