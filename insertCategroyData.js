const { Category } = require("./Model/model");

const mongoose = require("mongoose");

async function populateDatabase(data) {
  try {
    await Category.deleteMany({});
    await Category.insertMany(data);
    //console.log("All data stored successfully");
  } catch (error) {
    console.log(error.message);
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB atlas");

    const categoryData = [
      {
        title: "World",
        items: [
          { name: "Africa" },
          { name: "Americas" },
          { name: "Asia" },
          { name: "Australia" },
          { name: "China" },
          { name: "Europe" },
          { name: "India" },
          { name: "Middle East" },
          { name: "United Kingdom" },
        ],
      },
      {
        title: "US Politics",
        items: [
          { name: "The Biden Presidency" },
          { name: "Facts First" },
          { name: "2024 Elections" },
        ],
      },
      {
        title: "Business",
        items: [
          { name: "Markets" },
          { name: "Tech" },
          { name: "Media" },
          { name: "Calculators" },
          { name: "Videos" },
        ],
      },
      {
        title: "Health",
        items: [
          { name: "Life, But Better" },
          { name: "Fitness" },
          { name: "Food" },
          { name: "Sleep" },
          { name: "Mindfulness" },
          { name: "Relationships" },
        ],
      },
      {
        title: "Entertainment",
        items: [
          { name: "Movies" },
          { name: "Television" },
          { name: "Celebrity" },
        ],
      },
      {
        title: "Tech",
        items: [
          { name: "Innovate" },
          { name: "Gadget" },
          { name: "Foreseeable Future" },
          { name: "Mission: Ahead" },
          { name: "Upstarts" },
          { name: "Work Transformed" },
          { name: "Innovative Cities" },
        ],
      },
      {
        title: "Style",
        items: [
          { name: "Arts" },
          { name: "Design" },
          { name: "Fashion" },
          { name: "Architecture" },
          { name: "Luxury" },
          { name: "Beauty" },
          { name: "Video" },
        ],
      },
      {
        title: "Travel",
        items: [
          { name: "Destinations" },
          { name: "Food & Drink" },
          { name: "Stay" },
          { name: "News" },
          { name: "Videos" },
        ],
      },
      {
        title: "Sports",
        items: [
          { name: "Football" },
          { name: "Tennis" },
          { name: "Golf" },
          { name: "Motorsport" },
          { name: "US Sports" },
          { name: "Olympics" },
          { name: "Climbing" },
          { name: "Esports" },
          { name: "Hockey" },
        ],
      },
      {
        title: "Watch",
        items: [
          { name: "Live TV" },
          { name: "Digital Studios" },
          { name: "CNN Films" },
          { name: "HLN" },
          { name: "TV Schedule" },
          { name: "TV Shows A-Z" },
          { name: "CNNVR" },
        ],
      },
      {
        title: "Features",
        items: [
          { name: "As Equals" },
          { name: "Call to Earth" },
          { name: "Freedom Project" },
          { name: "Impact Your World" },
          { name: "Inside Africa" },
          { name: "2 Degrees" },
          { name: "CNN Heroes" },
          { name: "All Features" },
        ],
      },
      {
        title: "Weather",
        items: [
          { name: "Climate" },
          { name: "Wildfire Tracker" },
          { name: "Video" },
        ],
      },
      {
        title: "More",
        items: [
          { name: "Photos" },
          { name: "Longform" },
          { name: "Investigations" },
          { name: "CNN Profiles" },
          { name: "CNN Leadership" },
          { name: "CNN Newsletters" },
          { name: "Work for CNN" },
        ],
      },
    ];

    populateDatabase(categoryData);
  });
