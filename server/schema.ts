import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { resizeImage } from './utils/resizeImage';

import {
  text,
  relationship,
  password,
  timestamp,
  integer, float, image
} from '@keystone-6/core/fields';

import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      createdAt: timestamp({
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
            ? Math.floor((Number(image.height)*420)/Number(image.width))
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
      afterOperation: async ({ operation, item }) => {
        if (operation === "create" && item?.image_id) {
          await resizeImage(item);
        }
      },
    }
  }),
  Path: list({
    access: allowAll,
    fields: {
      route: relationship({ref: "Route.paths"}),
      distance: float(),
      desc: text(),
      nodes: relationship({ref: "Node.path", many: true}),
    }
  }),
  Node: list({
    access: allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      path: relationship({ref: "Path.nodes"}),
      index: integer({isIndexed: true}),
      x: float(),
      y: float(),
    }
  }),
  Category: list({
    access: allowAll,
    fields: {
      name: text({isIndexed: "unique", validation:{isRequired:true}}),
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
      paths: relationship({
        ref: 'Path.route',
        many: true
      }),
      image: image({
        storage: 'local_route_images',
      }),
    }
  })
}
