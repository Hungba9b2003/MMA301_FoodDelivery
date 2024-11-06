const mongoose = require("mongoose");

// Import your models
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const Payment = require("./models/Payment");

// Connect to your MongoDB database
mongoose.connect("mongodb://localhost:27017/FoodRecipe");

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Recipe.deleteMany({});
    await User.deleteMany({});
    await Payment.deleteMany({});

    // Create Users
    const users = [
      {
        _id: new mongoose.Types.ObjectId(),
        username: "user1",
        email: "user1@example.com",
        password: "password1",
        avatarUrl: "https://example.com/avatar1.png",
        createAt: new Date(),
        role: "user",
        accountBalance: 100,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        username: "user2",
        email: "user2@example.com",
        password: "password2",
        avatarUrl: "https://example.com/avatar2.png",
        createAt: new Date(),
        role: "admin",
        accountBalance: 200,
      },
    ];

    await User.insertMany(users);
    console.log(`${users.length} users created.`);

    // Create Recipes
    const recipes = [
      {
        _id: new mongoose.Types.ObjectId(),
        createBy: users[0]._id,
        name: "Chiên Trứng",
        imageUrl: ["https://example.com/fried_egg.jpg"],
        description: "Một món ăn đơn giản và ngon miệng.",
        ingredients: [
          { name: "Trứng gà", measurement: "2 quả" },
          { name: "Dầu ăn", measurement: "1 muỗng canh" },
          { name: "Muối", measurement: "1/2 muỗng cà phê" },
          { name: "Hành lá", measurement: "Tùy chọn" },
        ],
        steps: [
          {
            imageUrl: "https://example.com/prepare_eggs.jpg",
            stepName: "Chuẩn bị Trứng",
            description: "Đập trứng vào tô, thêm muối và đánh tan.",
            time: 5,
          },
          {
            imageUrl: "https://example.com/fry_eggs.jpg",
            stepName: "Chiên Trứng",
            description: "Đun nóng chảo với dầu, đổ hỗn hợp trứng vào chiên.",
            time: 7,
          },
          {
            imageUrl: "https://example.com/finish_fried_egg.jpg",
            stepName: "Hoàn Thành",
            description: "Gắp trứng ra đĩa, trang trí với hành lá.",
            time: 3,
          },
        ],
        comments: [],
        createAt: new Date(),
        updateAt: new Date(),
        typeRecipe: "main",
        totalTime: 15,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        createBy: users[1]._id,
        name: "Thịt Kho Tàu",
        imageUrl: ["https://example.com/boiled_pork_eggs.jpg"],
        description: "Món ăn truyền thống với thịt heo và trứng.",
        ingredients: [
          { name: "Thịt ba chỉ", measurement: "500g" },
          { name: "Trứng gà", measurement: "4 quả" },
          { name: "Nước mắm", measurement: "1/4 chén" },
          { name: "Đường", measurement: "1/4 chén" },
          { name: "Nước dừa", measurement: "1/2 chén" },
          { name: "Hành tím", measurement: "1 củ" },
          { name: "Tiêu", measurement: "Tùy chọn" },
        ],
        steps: [
          {
            imageUrl: "https://example.com/prepare_meat.jpg",
            stepName: "Sơ Chế Nguyên Liệu",
            description: "Rửa thịt và luộc trứng.",
            time: 15,
          },
          {
            imageUrl: "https://example.com/cook_meat.jpg",
            stepName: "Kho Thịt",
            description: "Xào hành tím, thêm thịt và gia vị.",
            time: 30,
          },
          {
            imageUrl: "https://example.com/add_eggs.jpg",
            stepName: "Thêm Trứng",
            description: "Bóc trứng luộc và cho vào nồi thịt.",
            time: 15,
          },
          {
            imageUrl: "https://example.com/finish_dish.jpg",
            stepName: "Hoàn Thành",
            description: "Gắp ra đĩa và trang trí.",
            time: 5,
          },
        ],
        comments: [],
        createAt: new Date(),
        updateAt: new Date(),
        typeRecipe: "main",
        totalTime: 65,
      },
    ];

    await Recipe.insertMany(recipes);
    console.log(`${recipes.length} recipes created.`);

    // Create Payments
    const payments = [
      {
        _id: new mongoose.Types.ObjectId(),
        userId: users[0]._id,
        recipeId: recipes[0]._id,
        description: "Payment for Recipe 1",
        createAt: new Date(),
        amount: 10,
        paymentCode: "PAY123",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        userId: users[1]._id,
        recipeId: recipes[1]._id,
        description: "Payment for Recipe 2",
        createAt: new Date(),
        amount: 15,
        paymentCode: "PAY456",
      },
    ];

    await Payment.insertMany(payments);
    console.log(`${payments.length} payments created.`);
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
