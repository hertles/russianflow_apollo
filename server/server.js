const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const {buildSchema} = require('graphql');
const {readFileSync} = require('fs');
const path = require('path')
const multer = require('multer')
const gm = require('gm')
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `maps/${req.params.routeId}/points/${req.params.pointId}`
        fs.mkdirSync(path)
        cb(null, path)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path.extname(file.originalname);
        cb(null, filename);
    }
})
const upload = multer({ storage: storage })
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

const schemaString = readFileSync('./schema.graphql', {encoding: 'utf8'});
const schema = buildSchema(schemaString);
const allRoutes = [
    {
        id: 0,
        x: 58.271508,
        y: 58.033283,
        type: 'Сплав',
        name: 'Сплав по рекам: Койва и Чусовая',
        desc: "Стремительная и маленькая Койва впадает в Чусовую. Недалеко от впадения Койвы можно забраться на гору Красный камень",
        photo_url: "https://static.tildacdn.com/tild6133-3030-4039-b165-653265366134/koiva-34.jpg",
        rating: 3
    },
    {
        id: 1,
        x: 55.211979,
        y: 58.884820,
        type: 'Сплав',
        name: 'Сплав по реке Ай от деревни Асылгужино до села Лаклы',
        desc: "Попадая в круг, в первую очередь включи Михаила Круга",
        photo_url: "https://photocentra.ru/images/main46/466947_main.jpg",
        rating: 5
    },
]
const allPoints = [
    {
        id: 0,
        routeId: 0,
        x: 58.238148,
        y: 58.195993,
        type: "Гора",
        name: "Красная гора",
        desc: "На вершине растёт поле иван-чая и открывается замечательный вид на бескрайние леса",
        photo_url: "https://sportishka.com/uploads/posts/2022-11/thumbs/1667556934_9-sportishka-com-p-reka-chusovaya-vkontakte-9.jpg",
        network: "Отсутствует"
    },
    {
        id: 1,
        routeId: 0,
        x: 58.278377,
        y: 58.211342,
        type: "Достопримечательность",
        name: "Почтовый ящик",
        desc: "Можете оставить здесь своё письмо или почитать почту от других туристов",
        photo_url: "https://i.ibb.co/cJ4WG4F/IMG-20220729-110036.jpg",
        network: "Отсутствует"
    },
    {
        id: 2,
        routeId: 0,
        x: 58.283324,
        y: 58.214076,
        type: "Препятствие",
        name: "Перекат - камни и водоросли",
        desc: "Обплывать с левой стороны, прямо у берега",
        photo_url: "https://static.tildacdn.com/tild6133-3030-4039-b165-653265366134/koiva-34.jpg",
        network: "Отсутствует"
    },
    {
        id: 3,
        routeId: 0,
        x: 58.279904,
        y: 58.379090,
        type: "Достопримечательность",
        name: "Водопад",
        desc: "Шумный водопад и камни",
        photo_url: "https://celes.club/uploads/posts/2022-04/thumbs/1651112301_38-celes-club-p-gilevskii-vodopad-sverdlovskoi-oblasti-pri-39.jpg",
        network: "Плохая. 2 Мбит/с"
    }
];

const createPointParams = (input) => {
    return {
        id: allPoints.length,
        routeId: Number(input.routeId),
        x: input.x,
        y: input.y,
        type: input.type,
        name: input.name,
        desc: input.desc,
        photo_url: input.photo_url,
        network: input.network
    }
}

const root = {
    getAllRoutes: () => {
        return allRoutes;
    },
    getAllPoints: (params) => {
        return (allPoints.filter(point => point.routeId === Number(params.routeId)))
    },
    getPoint: params => {
        return allPoints.find(point => point.id === Number(params.id));
    },
    getRoute: params => {
        return allRoutes.find(route => route.id === Number(params.id))
    },
    addPoint: params => {
        const point = createPointParams(params.point)
        allPoints.push(point)
        return point
    }


};

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);
app.get('/src/images/maps/:id/:z/:x/:y', (req, res) => {
    res.status(200)
        .type('image/png')
        .sendFile(path.resolve(`./maps/${req.params.id}/tiles/${req.params.z}/${req.params.x}/${req.params.y}.png`))
})
const fs = require('fs');
app.get('/maps/:id/tiles/:z/:x/:y.png', (req, res) => {
    res.status(200)
        .type('image/png')
        .sendFile(path.resolve(`./maps/${req.params.id}/tiles/${req.params.z}/${req.params.x}/${req.params.y}.png`))
})
app.get('/maps/:id', (req, res) => {
    const imagesDir = path.join(__dirname, 'maps', req.params.id);
    const images = [];
    const walkSync = dir => {
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const fileStat = fs.statSync(filePath);
            if (fileStat.isDirectory()) {
                walkSync(filePath);
            } else if (fileStat.isFile() && /\.(png|jpe?g)$/i.test(file)) {
                images.push(path.join(`/maps/${req.params.id}`, path.relative(imagesDir, filePath)));
            }
        });
    };
    walkSync(imagesDir);
    res.json(images);
});

const compressionOptions = {
    quality: 80 // Качество сжатия в процентах (от 0 до 100)
};

app.post('/route/:routeId/point/:pointId/image',
    upload.single('image'),
    (req, res, next) => {
        if (!req) {
            res.status(500).send("Ошибка! Загрузите изображение")
        } else {
            res.download('./outputs/output.jpg')
            sharp(req.buffer)
                .jpeg(compressionOptions)
                .toFile('./outputs/output.jpg')
                .then(() => {
                    console.log('Изображение успешно сжато и сохранено.');
                })
                .catch((err) => {
                    console.error('Ошибка при сжатии изображения:', err);
                });
        }
    })
app.get('/marker/:type/:active/.svg', (req, res) => {
    const activeType = (req.params.active === 'true') ? '-active' : ''
    console.log(`./images/markers/${req.params.type+activeType}.svg`)
    res.status(200)
        .sendFile(path.resolve(path.join(__dirname,`./images/markers/${req.params.type+activeType}.svg`)))
})
app.listen(5000, () => console.log('сервер заупщен на localhost:5000'));
