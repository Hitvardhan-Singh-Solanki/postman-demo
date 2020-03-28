import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import Routes from '../client/routes';

export default (req, store) => {
  const title = `Docs`;

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.path}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `
        <html>
            <head>
            <title>${title}</title>
            <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            <style>
            @import url('https://fonts.googleapis.com/css?family=Sen&display=swap');
            </style>
            <style>
                    *,
                    *::after,
                    *::before{ padding:0; margin: 0 }
                    #root{
                        height: 100%;
                        color: #fff;
                        font-family: 'Sen', sans-serif;
                    }
            </style>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="bundle.js" defer></script>
            </body>
        </html>
    `;
};
