const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const num = Math.floor(Math.random() * 100);
        const camp = new Campground({
            author: ['63eb1314fe370a068a29a956', '63eb27b77770d5f660477940', '63eb27d9cafb53c89feea7aa'][Math.floor(Math.random() * 3)],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dgvnbh1wn/image/upload/v1676637853/Yelp-Camp/w3mutsxc34bt5kwnm3dt.jpg',
                    filename: 'Yelp-Camp/w3mutsxc34bt5kwnm3dt',

                },
                {
                    url: 'https://res.cloudinary.com/dgvnbh1wn/image/upload/v1676637859/Yelp-Camp/ijbf7iokpunorzkycosa.png',
                    filename: 'Yelp-Camp/ijbf7iokpunorzkycosa',
                }
            ],
            description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dicta distinctio debitis fuga impedit soluta quo voluptatum error tempore aut aliquam enim dolore, ipsa voluptatem praesentium placeat quis quasi fugiat.',
            price: price //or just price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})