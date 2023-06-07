import React, { useState } from "react";
import axios from "axios";
import Msg from "./Msg";
import {
  TextField,
  Button,
  List,
  ListItem,
  Modal,
  Box,
  Container,
} from "@material-ui/core";

//import { Send } from "react-icons/md";

const ChatbotContainer = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [open, setOpen] = useState(false);
  // true =>small
  const [size, setSize] = useState(true);

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
    let temp = { message: inputText, sender: "user" };
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
  const containerStyle = {
    border: "2px dashed blue",
    backgroundColor: "lightgray",
    padding: "20px",
    borderRadius: "10px",
    display: "",
    justifyContent: "",
    width: size ? "400px" : "",
    height: size ? "400px" : "680px",
    position: "relative",
  };

  return (
    <>
      <div
        className="chatbot-container flex-col overflow-auto"
        style={containerStyle}
      >
        <Button
          onClick={() => (size ? setSize(false) : setSize(true))}
          style={{
            border: "2px solid black",
            backgroundColor: "black",
            color: "white",
            height: "",
            width: "",
            fontSize: "10px",
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
        >
          minimize
        </Button>
        <h1 className="text-red-600 my-3">hi my name </h1>
        <div className="flex flex-grow flex-col items-start space-y-2 break-words ">
          {/* <Msg /> */}
          {chatHistory.map((chat, index) => (
            <Msg key={index} props={chat} />
          ))}
        </div>

        <div className="mt-auto border-solid border-2 border-purple-600">
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Enter Msg Here"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
            >
              Enter Text Here
            </TextField>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatbotContainer;

// import { useState } from "react";
// // import "./App.css";
// import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from "@chatscope/chat-ui-kit-react";

// const API_KEY = "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";
// // "Explain things like you would to a 10 year old learning how to code."
// const systemMessage = {
//   //  Explain things like you're talking to a software professional with 5 years of experience.
//   role: "system",
//   content:
//     "Explain things like you're talking to a software professional with 2 years of experience.",
// };

// function ChatbotContainer() {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: "just now",
//       sender: "ChatGPT",
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: "outgoing",
//       sender: "user",
//     };

//     const newMessages = [...messages, newMessage];

//     setMessages(newMessages);

//     // Initial system message to determine ChatGPT functionality
//     // How it responds, how it talks, etc.
//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     // messages is an array of messages
//     // Format messages for chatGPT API
//     // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
//     // So we need to reformat

//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") {
//         role = "assistant";
//       } else {
//         role = "user";
//       }
//       return { role: role, content: messageObject.message };
//     });

//     // Get the request body set up with the model we plan to use
//     // and the messages which we formatted above. We add a system message in the front to'
//     // determine how we want chatGPT to act.
//     const apiRequestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [
//         systemMessage, // The system message DEFINES the logic of our chatGPT
//         ...apiMessages, // The messages from our chat with ChatGPT
//       ],
//     };

//     await fetch("https://api.openai1.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiRequestBody),
//     })
//       .then((data) => {
//         return data.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setMessages([
//           ...chatMessages,
//           {
//             message: data.choices[0].message.content,
//             sender: "ChatGPT",
//           },
//         ]);
//         setIsTyping(false);
//       });
//   }

//   return (
//     <div className="App">
//       <div style={{ position: "relative", height: "400px", width: "300px" }}>
//         <div
//           style={{
//             position: "absolute",
//             bottom: "0",
//             right: "0",
//             padding: "10px",
//           }}
//         >
//           <MainContainer>
//             <ChatContainer>
//               <MessageList
//                 scrollBehavior="smooth"
//                 typingIndicator={
//                   isTyping ? (
//                     <TypingIndicator content="ChatGPT is typing" />
//                   ) : null
//                 }
//               >
//                 {messages.map((message, i) => {
//                   console.log(message);
//                   return <Message key={i} model={message} />;
//                 })}
//               </MessageList>
//               <MessageInput
//                 placeholder="Type message here"
//                 onSend={handleSend}
//               />
//             </ChatContainer>
//           </MainContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatbotContainer;
