const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const {buildSchema} = require('graphql');
const {readFileSync} = require('fs');
const path = require('path')

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
        type: 'river',
        name: 'Маршрут по рекам: Койва и Чусовая',
        descr: "Стремительная и маленькая Койва впадает в Чусовую. Недалеко от впадения Койвы можно залезть на Красный камень",
        photo_url: "https://static.tildacdn.com/tild6133-3030-4039-b165-653265366134/koiva-34.jpg",
        rating: 3
    },
    {
        id: 1,
        x: 55.211979,
        y: 58.884820,
        type: 'river',
        name: 'Маршрут по реке Ай от деревни Асылгужино до села Лаклы',
        descr: "Попадая в круг, в первую очередь включи Михаила Круга",
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
        descr: "На вершине поле иван-чая и замечательный вид на бескрайние леса",
        photo_url: "https://sportishka.com/uploads/posts/2022-11/thumbs/1667556934_9-sportishka-com-p-reka-chusovaya-vkontakte-9.jpg",
    },
    {
        id: 1,
        routeId: 0,
        x: 58.278377,
        y: 58.212342,
        type: "Другое",
        name: "Почтовый ящик",
        descr: "Можете оставить здесь своё письмо или почитать почту от других туристов",
        photo_url: "https://i.ibb.co/cJ4WG4F/IMG-20220729-110036.jpg",
    },
    {
        id: 2,
        x: 31.232303,
        y: 60.234233,
        type: "Перекат",
        name: "Перекат - камни и водоросли",
        descr: "Обплывать с правой стороны, прямо у берега",
        photo_url: "http://s2.fotokto.ru/photo/full/643/6436933.jpg",
    }
];
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
app.get('/src/images/maps/:id/:z/:x/:y',(req,res)=>{
    res.status(200).type('image/png').sendFile(path.resolve(`./Maps/${req.params.id}/${req.params.z}/${req.params.x}/${req.params.y}.png`))
})
app.listen(5000, () => console.log('сервер заупщен на localhost:5000'));
