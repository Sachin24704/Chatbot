import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  List,
  ListItem,
  Modal,
  Box,
} from "@material-ui/core";

//import { Send } from "react-icons/md";

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [open, setOpen] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Add user's question to chat history
    setChatHistory([...chatHistory, { message: inputText, sender: "user" }]);
    setInputText("");

    try {
      // Make request to OpenAI API
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: chatHistory.map((entry) => entry.message).join("\n"),
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_OPENAI_API_KEY",
          },
        }
      );

      const answer = response.data.choices[0].text.trim();

      // Add OpenAI's answer to chat history
      setChatHistory([...chatHistory, { message: answer, sender: "chatbot" }]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",

          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-between",
            // height: "100%",
            // padding: "16px",
            // backgroundColor: "#f4f4f4",

            backgroundColor: "skyblue",
            width: "400px",
            p: "16px",
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          <List
            sx={{
              height: "calc(100% - 112px)",
              overflowY: "auto",
            }}
          >
            {chatHistory.map((entry, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    entry.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  sx={{
                    backgroundColor:
                      entry.sender === "user" ? "#4CAF50" : "#2196F3",
                    color: "#fff",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    maxWidth: "80%",
                    wordBreak: "break-word",
                  }}
                >
                  {entry.sender === "user" ? "You: " : "chatbot: "}
                  {entry.message}
                </div>
              </ListItem>
            ))}
          </List>
          <form
            onSubmit={handleFormSubmit}
            style={{ display: "flex", marginBottom: "8px" }}
          >
            <TextField
              label="How Can I help You"
              variant="outlined"
              fullWidth
              value={inputText}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Chatbot;
