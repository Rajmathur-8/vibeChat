import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from '../utils/cloudinary.js'; // adjust this path based on your setup


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try{
        const {id:userToChatId} = req.params
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId:myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(messages);
    }catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, image, video } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!text && !image && !video) {
            return res.status(400).json({ message: "Cannot send an empty message" });
        }

        let imageUrl;
        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (err) {
                return res.status(500).json({ message: "Image upload failed" });
            }
        }

        let videoUrl;
        if (video) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(video, {
                    resource_type: "video"
                });
                videoUrl = uploadResponse.secure_url;
            } catch (err) {
                return res.status(500).json({ message: "Video upload failed" });
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
            video: videoUrl
        });

        await newMessage.save();
        res.status(200).json(newMessage);

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
