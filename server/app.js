const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); // for parsing application/json

const User = require('./models/users'); // Ensure the path is correct
const Conversation = require('./models/conversations');
const Message = require('./models/messages'); // Adjust the path as needed

const url = 'mongodb+srv://sanu:admin123@cluster0.nkgmhe0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => {
    console.error('Error connecting to MongoDB:', e);
    process.exit(1);
  });

app.post('/api/users/register', async (req, res) => {
  console.log(req.body); // Debugging line

  const { fullName, password, email, token } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user without `username`
    const newUser = new User({ fullName, password: hashedPassword, email, token });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error saving user:', error);
    if (error.name === 'ValidationError') {
      res.status(400).send('Validation Error: ' + error.message);
    } else if (error.code === 11000) {
      const duplicatedKey = Object.keys(error.keyValue).map(key => `${key}: ${error.keyValue[key]}`).join(', ');
      res.status(409).send('Duplicate Error: ' + duplicatedKey);
    } else {
      res.status(500).send('Internal Server Error: ' + error.message);
    }
  }
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

app.post('/api/conversations', async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(201).json({ message: 'Conversation created successfully', conversation: savedConversation });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});
// Endpoint to get all conversations for a specific user
app.get('/api/conversations/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find conversations where the user is a member
    const conversations = await Conversation.find({ members: { $in: [userId] } });

    if (conversations.length === 0) {
      return res.status(404).send('No conversations found for this user');
    }

    // Populate conversation details with user data
    const conversationsWithUserData = await Promise.all(conversations.map(async (conversation) => {
      const receiverId = conversation.members.find((member) => member !== userId);

      if (receiverId) {
        const receiver = await User.findById(receiverId);
        return {
          conversationId: conversation._id,
          receiverEmail: receiver?.email || null, // Add receiver email
          receiverFullName: receiver?.fullName || null, // Add receiver fullName
        };
      }

      return {
        conversationId: conversation._id,
        receiverEmail: null,
        receiverFullName: null,
      }; // If no receiverId found
    }));
    res.status(200).json(conversationsWithUserData);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

app.post('/api/message', async (req, res) => {
  try {
    const { conversationId, senderId, message } = req.body;
    const newMessage = new Message({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

    


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
