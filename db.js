const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb+srv://mernuser:raksmernuser123@cluster0.cbfkawc.mongodb.net/gofoodMern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            ssl: true,
            tlsAllowInvalidCertificates: false,
        });

        // Event listeners for connection events
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Failed to connect to MongoDB:', err);
        });

        // Fetch data once connected
        const fetchedData = await mongoose.connection.db.collection("food_items");
        global.food_items = await fetchedData.find({}).toArray(async function(err,data)
        {
            const foodCategory=await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function(err,catData){
                if (err) console.log(err)
                else{
            global.food_items=data;
            global.foodCategory=catData;
        }
            })
            //console.log('Fetched data:', global.food_items);

        });
        
        

    } catch (err) {
        console.error('Connection error:', err);
        throw err; // Rethrow the error to handle it in the caller
    }
};

module.exports = mongoDB;
