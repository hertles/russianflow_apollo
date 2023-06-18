// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import {config} from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import {lists} from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import {withAuth, session} from './auth';
import path from "path";

const baseUrl = 'http://localhost:2020'
export default withAuth(
    config({
        db: {
            // we're using sqlite for the fastest startup experience
            //   for more information on what database might be appropriate for you
            //   see https://keystonejs.com/docs/guides/choosing-a-database#title
            provider: 'sqlite',
            url: 'file:./keystone.db',
        },
        server: {
            cors: {origin: 'http://localhost:3000', credentials: true},
            port: 2020,
            extendExpressApp: (app) => {
                app.get('/api/maps/:id/:z/:x/:y.png', (req, res) => {
                    res.status(200)
                        .type('image/png')
                        .sendFile(path.resolve(`./public/images/maps/${req.params.id}/${req.params.z}/${req.params.x}/${req.params.y}.png`))
                })
            },
        },
        storage: {
            local_point_images: {
                kind: 'local',
                type: 'image',
                generateUrl: path => `${baseUrl}/images/points${path}`,
                serverRoute: {
                    path: '/images/points',
                },
                storagePath: 'public/images/points/',
            },
            local_marker_images: {

                kind: 'local',
                type: 'image',
                generateUrl: path => `${baseUrl}/images/markers${path}`,
                serverRoute: {
                    path: '/images/markers',
                },
                storagePath: 'public/images/markers/',
            },
            local_route_images: {
                kind: 'local',
                type: 'image',
                generateUrl: path => `${baseUrl}/images/routes${path}`,
                serverRoute: {
                    path: '/images/routes',
                },
                storagePath: 'public/images/routes/',
            },

        },
        lists,
        session,
    })
);
