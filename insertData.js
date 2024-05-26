const mongoose = require("mongoose");
const { Role, Tag, Type } = require("./Model/model");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://emon:12345@cluster0.tfzr2.mongodb.net/cnn-news?retryWrites=true&w=majority"
);

// Data for roles, tags, and news types
const rolesData = [
  {
    name: "Admin",
    description: "Administrator role with full access",
    permissions: [
      "READ USERS",
      "WRITE USERS",
      "READ ARTICLES",
      "WRITE ARTICLES",
    ],
  },
  {
    name: "Editor",
    description: "Editor role with limited access",
    permissions: ["READ ARTICLES", "WRITE ARTICLES"],
  },
  {
    name: "Writer",
    description: "Writer role with article creation access",
    permissions: ["WRITE ARTICLES"],
  },
];

const tagsData = [{ name: "Analysis" }, { name: "Opinion" }, { name: "Watch" }];

const newsTypesData = [
  { name: "General" },
  { name: "Breaking" },
  { name: "Featured" },
  { name: "Video Tiles" },
  { name: "Photo Tiles" },
  { name: "Paid Content" },
  { name: "Advertisement" },
  { name: "LiveUpdate" },
];

// Function to insert data
 async function insertData() {
  try {
    // Insert roles
    const insertedRoles = await Role.insertMany(rolesData);
    //console.log(`${insertedRoles.length} roles saved successfully`);

    // Insert tags
    const insertedTags = await Tag.insertMany(tagsData);
   // console.log(`${insertedTags.length} tags saved successfully`);

    // Insert news types
    const insertedNewsTypes = await Type.insertMany(newsTypesData);
    //console.log(`${insertedNewsTypes.length} news types saved successfully`);
  } catch (error) {
    console.error("Error saving data:", error.message);
  } finally {
    // Close the connection to the database
    mongoose.connection.close();
  }
}

module.exports = { insertData };
// Call the function to insert data
//insertData();
// server.js (or your backend entry point)
