import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

import { match } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import dummyData from './dummyData';
import serverConfig from './config';

// Import required models
import posts from './routes/post.router';
import authRoute from './routes/auth.router';
import noteRoute from './routes/note.router';
import csRoute from './routes/cheatsheet.router';
import userRoute from './routes/user.router';

const session = require('express-session');

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// Middleware
app.use(session({ secret: 'sd34124S4@4D5#FD6A6&7Sgkdlf!',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: false },
}));

// Routes
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use(Express.static(path.resolve(__dirname, '../client/assets')));
app.use('/static/js/', Express.static(path.join(__dirname, '..', 'client', 'assets')));
app.use('/api/posts', posts);
app.use('/api/auth', authRoute);
app.use('/api/note', noteRoute);
app.use('/api/cs', csRoute);
app.use('/api/user', userRoute);

// Render Initial HTML
const renderFullPage = () => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="images/favicon.ico" type="image/png" />
        <meta charset="utf-8" />
      </head>
      <body>
        <div id="root"></div>
        <script>
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/d3pie@0.2.1/d3pie/d3pie.min.js"></script> 
        <script src='static/js/visualize.js'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation) => {
    console.log(req.url)
    if (err) {
      return res.status(500).end(renderError(err));
    }
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    return res.set('Content-Type', 'text/html').status(200).end(renderFullPage());
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build your amazing StudyGenie!`); // eslint-disable-line
  }
});

export default app;
