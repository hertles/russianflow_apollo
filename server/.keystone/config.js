"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");

// utils/resizeImage.ts
var import_sharp = __toESM(require("sharp"));
var import_path = __toESM(require("path"));
var resizeImage = async (item) => {
  const imageId = item.croppedImage_id;
  const imagePath = import_path.default.resolve("public/images/points") + "\\";
  await (0, import_sharp.default)(imagePath + item.image_id + "." + item.image_extension).resize(400, 400).toFile(imagePath + imageId + "." + item.image_extension);
};

// schema.ts
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" }
      })
    }
  }),
  Point: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      desc: (0, import_fields.text)({ validation: { isRequired: true } }),
      category: (0, import_fields.relationship)({
        ref: "Category.points",
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      }),
      croppedImage: (0, import_fields.image)({ storage: "local_point_images", access: import_access.allowAll }),
      image: (0, import_fields.image)({ storage: "local_point_images", access: import_access.allowAll }),
      network: (0, import_fields.text)(),
      route: (0, import_fields.relationship)({
        ref: "Route.points"
      }),
      x: (0, import_fields.float)({ validation: { isRequired: true } }),
      y: (0, import_fields.float)({ validation: { isRequired: true } })
    },
    hooks: {
      resolveInput: ({ resolvedData }) => {
        const { name, image: image2 } = resolvedData;
        const croppedImageHeight = image2.height && image2.width ? Number(image2.height) * 420 / Number(image2.width) : 300;
        if (name && image2) {
          const croppedImage = {
            id: image2.id + "-cropped",
            extension: image2.extension,
            width: 420,
            height: croppedImageHeight,
            filesize: image2.filesize
          };
          return {
            ...resolvedData,
            croppedImage,
            name
          };
        }
        return resolvedData;
      },
      afterOperation: ({ operation, item }) => {
        if (operation === "create" && item?.image_id) {
          resizeImage(item);
        }
      }
    }
  }),
  Category: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ isIndexed: true, validation: { isRequired: true } }),
      points: (0, import_fields.relationship)({
        ref: "Point.category",
        many: true
      }),
      image: (0, import_fields.image)({
        storage: "local_marker_images"
      }),
      activeImage: (0, import_fields.image)({
        storage: "local_marker_images"
      })
    }
  }),
  Route: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      desc: (0, import_fields.text)({ validation: { isRequired: true } }),
      rating: (0, import_fields.float)(),
      x: (0, import_fields.float)({ validation: { isRequired: true } }),
      y: (0, import_fields.float)({ validation: { isRequired: true } }),
      points: (0, import_fields.relationship)({
        ref: "Point.route",
        many: true
      }),
      image: (0, import_fields.image)({
        storage: "local_route_images"
      })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_path2 = __toESM(require("path"));
var baseUrl = "http://localhost:2020";
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    server: {
      cors: { origin: "http://localhost:3000", credentials: true },
      port: 2020,
      extendExpressApp: (app) => {
        app.get("/api/maps/:id/:z/:x/:y.png", (req, res) => {
          res.status(200).type("image/png").sendFile(import_path2.default.resolve(`./public/images/maps/${req.params.id}/${req.params.z}/${req.params.x}/${req.params.y}.png`));
        });
      }
    },
    storage: {
      local_point_images: {
        kind: "local",
        type: "image",
        generateUrl: (path3) => `${baseUrl}/images/points${path3}`,
        serverRoute: {
          path: "/images/points"
        },
        storagePath: "public/images/points/"
      },
      local_marker_images: {
        kind: "local",
        type: "image",
        generateUrl: (path3) => `${baseUrl}/images/markers${path3}`,
        serverRoute: {
          path: "/images/markers"
        },
        storagePath: "public/images/markers/"
      },
      local_route_images: {
        kind: "local",
        type: "image",
        generateUrl: (path3) => `${baseUrl}/images/routes${path3}`,
        serverRoute: {
          path: "/images/routes"
        },
        storagePath: "public/images/routes/"
      }
    },
    lists,
    session
  })
);
