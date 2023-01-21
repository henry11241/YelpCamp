const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('Database connected')
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000 )
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '63a1a9fc41ddb78cbd7f0134',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dc8cffvvj/image/upload/v1672902082/YelpCamp/nfnvxivjnmfg5ej8cfrw.jpg',
                    filename: 'YelpCamp/nfnvxivjnmfg5ej8cfrw',
                },
                {
                    url: 'https://res.cloudinary.com/dc8cffvvj/image/upload/v1672902081/YelpCamp/z7epywo1o2bq6yw1qt5p.jpg',
                    filename: 'YelpCamp/z7epywo1o2bq6yw1qt5p',
                }        
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ab modi sequi ipsum suscipit cum tenetur soluta officia magnam accusantium laudantium animi, quae temporibus provident velit dolorum dolor in unde!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})