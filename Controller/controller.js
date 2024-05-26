const { User, News } = require("../Model/model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { createToken, verifyToken } = require("../jwt/jwt");

exports.getOldestNewsArticleByType = async (req, res) => {
  try {
    const { liveUpdateType } = req.params;
   // console.log("liveUpdateType: ", liveUpdateType);
    // Construct the query based on liveUpdateType
    // const query = liveUpdateType ? { liveUpdateType } : {};

    const oldestNewsArticle = await News.findOne({
      liveUpdateType: liveUpdateType,
    }).sort({ createdAt: 1 });

    if (!oldestNewsArticle) {
      return res.status(404).json({ message: "No news articles found." });
    }

    res.json(oldestNewsArticle);
  } catch (error) {
    console.error("Error fetching oldest news article by type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getNewsByLiveUpdateType = async (req, res) => {
  const { liveUpdateType } = req.params;
 // console.log("liveUpdateType :", liveUpdateType);
  try {
    // Find the last document with the specified liveUpdateType
    const newsByLiveUpdateType = await News.find({
      liveUpdateType: liveUpdateType,
      isLiveUpdate: true, // Make sure it's a live update
    }).sort({ createdAt: -1 }); // Sort in descending order based on creation time
    //console.log("newsByLiveUpdateType :", newsByLiveUpdateType);
    if (newsByLiveUpdateType) {
      res.json(newsByLiveUpdateType);
    } else {
      res.status(404).json({ error: "Live update not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.mainSearch = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const searchText = req.query.searchText;

    const query = {
      $or: [
        { title: { $regex: searchText, $options: "i" } }, // Case-insensitive search on title
        { newsCategory: { $regex: searchText, $options: "i" } }, // Case-insensitive search on newsCategory
        { subCategory: { $regex: searchText, $options: "i" } }, // Case-insensitive search on subCategory
        // Add more fields as needed
      ],
    };

    const options = {
      page: page,
      limit: pageSize,
      sort: { createdAt: -1 }, // Adjust the sorting based on your requirements
    };

    const paginatedNews = await News.paginate(query, options);

    res.json({
      news: paginatedNews.docs,
      totalPages: paginatedNews.totalPages,
    });
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.isAuth = async (req, res) => {
  const authHeader = req.headers['authorization'];
  //console.log(authHeader);
 if (!authHeader || !authHeader.startsWith('Bearer ')) {
   return res.status(401).json({ error: 'No valid token provided' });
 }else{
   const token = authHeader.slice(7);
   const userInfo=verifyToken(token)
    const {data}=userInfo
   if (data === "Admin") {
    // do something for Admin users
    res.status(200).json({ Role: data});
  } else if (data === "Editor") {
    // do something for Editor users
    res.status(200).json({ Role: data});
  } else if (data === "Writer") {
    // do something for Writer users
    res.status(200).json({ Role: data });
  } else {
    // do something for other users
    res.status(200).json({ Role: false });
  }
 } 
  
 
};

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const token=createToken(user?.role)
   
    // const token=jwt.sign({
    //   data:user?.role
    // },process.env.secret_key, { expiresIn: '1h' });
    // req.session.userid = user?._id;
    // if (user.role) {
    //   req.session.userRole = user.role;
    // }
    // req.session.save();

    //console.log("req.session :", req.session);
    // console.log(token);
    // console.log(process.env.secret_key);
    res.status(200).json({ message: "Login Successful",user:{_id:user._id,bio:user.bio,username:user.username},token:token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.register = async function (req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special  character, and be at least 8 character long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ validationErrors });
    }
    console.log(error);
  }
  //console.log("Its a post request to register a user.");
  //console.log("req is: ", req.body);
};
