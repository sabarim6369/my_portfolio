const Poll = require("../models/pollschema");
const mongoose = require("mongoose");

exports.createPoll = async (req, res) => {
  console.log(req.body)
  try {
    const { question, options,userId } = req.body;
    
    const newPoll = new Poll({
      question,
      options: options.map((option) => ({ text: option, votes: 0 })),
      createdBy:userId,
    });

    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.votePoll = async (req, res) => {
  try {
    const { pollId, optionText } = req.body;
    const poll = await Poll.findById(pollId);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const option = poll.options.find((opt) => opt.text === optionText);
    if (!option) return res.status(400).json({ message: "Invalid option" });

    option.votes += 1;
    await poll.save();

    res.status(200).json({ message: "Vote recorded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };
  exports.getallpollofuser= async (req, res) => {
    try {
        const userId = req.params.userId;

        const polls = await Poll.find({ createdBy: userId });
        res.status(200).json(polls);
    } catch (error) {
        console.error("Error fetching polls:", error);
        res.status(500).json({ message: "Error fetching polls." });
    }
  };
  exports.getallpoll = async (req, res) => {
    console.log("Fetching polls...");
    try {
      const userId = req.params.userId;  
      console.log("User ID:", userId);
  
      const userObjectId = new mongoose.Types.ObjectId(userId);
  
      const polls = await Poll.find({ createdBy: { $ne: userObjectId } })
        .populate('createdBy', '_id username email phoneNumber dob friends');  // Specify the fields you want from the user collection
  
      console.log(polls);
  
     const profileImages = [
        "https://randomuser.me/api/portraits/women/1.jpg", // Profile 1
        "https://randomuser.me/api/portraits/men/1.jpg",   // Profile 2
        "https://randomuser.me/api/portraits/women/2.jpg", // Profile 3
      ];
  
      // Format the fetched polls data
      const formattedPolls = polls.map(poll => {
        // Calculate the total votes for the poll
        const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
        const optionsWithPercentages = poll.options.map(option => {
          const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(2) : 0; // Ensure no division by zero
          return {
            text: option.text,
            votes: percentage, // Store the percentage
          };
        });
  
        const randomProfileImage = profileImages[Math.floor(Math.random() * profileImages.length)];
  
        return {
          id: poll._id.toString(),
          user: poll.createdBy.username, // Get the username from the populated createdBy field
          question: poll.question,
          options: optionsWithPercentages,  // Send the options with percentage votes
          profileImage: randomProfileImage, 
          userid:poll.createdBy._id
        };
      });
  
      console.log(formattedPolls);
      res.status(200).json(formattedPolls);  // Return the formatted polls
    } catch (err) {
      console.error("Error fetching polls:", err);
      res.status(500).json({ message: "Error fetching polls." });
    }
  };
  
