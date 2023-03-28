const path = require('path');
const routes = require('./controllers');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const cors = require('cors');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// io.on('connection', (socket) => {
//   // welcome message
//   socket.emit('message', 'Welcome to the Retro Great chat room! Click which room you would like to chat in or send a message to everyone here! :)')

//   // broadcast when user connects 
//   socket.broadcast.emit('message', 'A user has joined the chat!');

//   // listen for chat message
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });

//   // join room and message
//   socket.on("join-room", (room, cb) => {
//     socket.join(room)
//     cb(`Joined ${room}`)
//   });
 
// });

app.use(cors());
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening http://127.0.0.1:3000/'));
});
