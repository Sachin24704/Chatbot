// import React, { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   List,
//   ListItem,
//   Modal,
//   Box,
// } from "@material-ui/core";

// //import { Send } from "react-icons/md";

// const Chatbot = () => {
//   const [inputText, setInputText] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [open, setOpen] = useState(false);

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // Add user's question to chat history
//     setChatHistory([...chatHistory, { message: inputText, sender: "user" }]);
//     setInputText("");

//     try {
//       // Make request to OpenAI API
//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/davinci-codex/completions",
//         {
//           prompt: chatHistory.map((entry) => entry.message).join("\n"),
//           max_tokens: 50,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer YOUR_OPENAI_API_KEY",
//           },
//         }
//       );

//       const answer = response.data.choices[0].text.trim();

//       // Add OpenAI's answer to chat history
//       setChatHistory([...chatHistory, { message: answer, sender: "chatbot" }]);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         style={{
//           display: "flex",
//           alignItems: "flex-end",
//           justifyContent: "flex-end",

//           backgroundColor: "white",
//         }}
//       >
//         <Box
//           sx={{
//             // display: "flex",
//             // flexDirection: "column",
//             // justifyContent: "space-between",
//             // height: "100%",
//             // padding: "16px",
//             // backgroundColor: "#f4f4f4",

//             backgroundColor: "skyblue",
//             width: "400px",
//             p: "16px",
//             borderRadius: "8px",
//             overflow: "auto",
//           }}
//         >
//           <List
//             sx={{
//               height: "calc(100% - 112px)",
//               overflowY: "auto",
//             }}
//           >
//             {chatHistory.map((entry, index) => (
//               <ListItem
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   justifyContent:
//                     entry.sender === "user" ? "flex-end" : "flex-start",
//                 }}
//               >
//                 <div
//                   sx={{
//                     backgroundColor:
//                       entry.sender === "user" ? "#4CAF50" : "#2196F3",
//                     color: "#fff",
//                     borderRadius: "4px",
//                     padding: "8px 12px",
//                     maxWidth: "80%",
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {entry.sender === "user" ? "You: " : "chatbot: "}
//                   {entry.message}
//                 </div>
//               </ListItem>
//             ))}
//           </List>
//           <form
//             onSubmit={handleFormSubmit}
//             style={{ display: "flex", marginBottom: "8px" }}
//           >
//             <TextField
//               label="How Can I help You"
//               variant="outlined"
//               fullWidth

//               value={inputText}
//               onChange={handleInputChange}
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Send
//             </Button>
//           </form>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default Chatbot;

import { useState } from "react";
// import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

function ChatbotContainer() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "400px", width: "300px" }}>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            padding: "10px",
          }}
        >
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="ChatGPT is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  console.log(message);
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
}

export default ChatbotContainer;
