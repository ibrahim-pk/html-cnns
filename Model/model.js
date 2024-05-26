const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasSymbol = /[@$!%*?&]/.test(value);
        const isLengthValid = value.length >= 8;

        return (
          hasLowercase && hasUppercase && hasDigit && hasSymbol && isLengthValid
        );
      },
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 8 characters long",
    },
  },
  role: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

const subcategorySchema = new mongoose.Schema({
  name: { type: String },
});
const categorySchema = new mongoose.Schema({
  title: { type: String },
  items: [subcategorySchema],
});
const Category = mongoose.model("Category", categorySchema);

const TagSchema = new mongoose.Schema({
  name: { type: String },
});
const TypeSchema = new mongoose.Schema({
  name: { type: String },
});
const RoleSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  permissions: { type: [String], default: [] },
});

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    newsCategory: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    type: {
      type: String,
    },
    tag: {
      type: String,
    },
    editorText: {
      type: String,
    },
    authorName: {
      type: String,
    },
    bio:{
      type: String,
    },
    isLiveUpdate: {
      type: String,
    },
    liveUpdateType: {
      type: String,
    },
    liveUpdateHeadline: {
      type: String,
    },
  },
  { timestamps: true }
);
NewsSchema.plugin(mongoosePaginate);

const supportFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VideoLinkSchema = new mongoose.Schema({
  link: { type: String },
});

const SupportForm = mongoose.model("SupportForm", supportFormSchema);
const News = mongoose.model("News", NewsSchema);
const Tag = mongoose.model("Tag", TagSchema);
const Type = mongoose.model("Type", TypeSchema);
const Role = mongoose.model("Role", RoleSchema);
const VideoLink = mongoose.model("VideoLink", VideoLinkSchema);
module.exports = {
  User: User,
  Category: Category,
  Tag: Tag,
  Type: Type,
  Role: Role,
  News: News,
  SupportForm: SupportForm,
  VideoLink:VideoLink
};
