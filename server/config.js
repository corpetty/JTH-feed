module.exports = {
  port: 8080,
  db: {
    // prod: process.env.DATABASE_URL || 'mongodb://localhost/reddit',
    prod: process.env.DATABASE_URL || 'mongodb://petty:jthAdmin1@ds133556.mlab.com:33556/jth-feed',
    // test: 'mongodb://localhost/reddit_test',
    test: 'mongodb://petty:jthAdmin1@ds133556.mlab.com:33556/jth-feed',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  }
};
