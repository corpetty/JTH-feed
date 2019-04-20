const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
const passport = require('passport');
const localStrategy = require('./auth/local');
const jwtStrategy = require('./auth/jwt');
const RSSToMongo = require('rss-node-mongo');
const config = require('./config');
const mongoose = require('mongoose')
const User = require('./models/user');


const app = express();

app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use(morgan('common'));
app.use(passport.initialize());

const properties = {
  rss: 'https://cointelegraph.com/editors_pick_rss',
  db: config.db.prod,
  collection: 'posts'
}
const rss = new RSSToMongo(properties, function(item) {
  const rss_id = '5ca8d5b2bb6b0f17126a32f5'
  item.url = item.link
  item.category = 'rss'
  item.og_author = item.author
  item.author = mongoose.Types.ObjectId(rss_id)
  item.user = mongoose.Types.ObjectId(rss_id)
  item.type = 'link'

})
rss.work((err, success) => {
  if (!err) {
    console.log(success.saved + " items were save")
    console.log(success.ignored + " items were ignored")
  } else {
    console.log(err)
  }
})

passport.use(localStrategy);
passport.use(jwtStrategy);

require('./routes')(app);

module.exports = app;
