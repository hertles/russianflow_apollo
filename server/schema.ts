// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { resizeImage } from './utils/resizeImage';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select, integer, float, image
} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
    },
  }),
  Point: list({
    access: allowAll,
    fields: {
      name: text({validation:{isRequired:true}}),
      desc: text({validation:{isRequired:true}}),
      category: relationship({
        ref: 'Category.points',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
      }),
      croppedImage: image({storage: 'local_point_images',access: allowAll}),
      image: image({storage: 'local_point_images',access: allowAll}),
      network: text(),
      route: relationship({
        ref: 'Route.points',
      }),
      x: float({validation:{isRequired:true}}),
      y: float({validation:{isRequired:true}}),
    },
    hooks: {
      resolveInput: ({ resolvedData }) => {
        const { name, image } = resolvedData;
        const croppedImageHeight = (image.height && image.width)
            ? (Number(image.height)*420)/Number(image.width)
            : 300
        if (name && image) {
          const croppedImage = {
            id: image.id + "-cropped",
            extension: image.extension,
            width: 420,
            height: croppedImageHeight,
            filesize: image.filesize,
          };
          return {
            ...resolvedData,
            croppedImage,
            name,
          };
        }
        return resolvedData;
      },
      afterOperation: ({ operation, item }) => {
        if (operation === "create" && item?.image_id) {
          resizeImage(item);
        }
      },
    }
  }),
  Category: list({
    access: allowAll,
    fields: {
      name: text({isIndexed: true, validation:{isRequired:true}}),
      points: relationship({
        ref: 'Point.category',
        many: true
      }),
      image: image({
        storage: 'local_marker_images',
      }),
      activeImage: image({
        storage: 'local_marker_images',
      }),
    }
  }),
  Route: list({
    access: allowAll,
    fields: {
      name: text({validation:{isRequired:true}}),
      desc: text({validation:{isRequired:true}}),
      rating: float(),
      x: float({validation:{isRequired:true}}),
      y: float({validation:{isRequired:true}}),
      points: relationship({
        ref: 'Point.route',
        many: true
      }),
      image: image({
        storage: 'local_route_images',
      }),
    }
  })
}
