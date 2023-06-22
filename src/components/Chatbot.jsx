import React, { useState } from "react";
import axios from "axios";
import Msg from "./Msg";
// import dotenv from "dotenv";
import {
  TextField,
  Button,
  List,
  ListItem,
  Modal,
  Box,
  Container,
} from "@material-ui/core";
// import { gptAPI } from "gpt-3.axios";
// import { Configuration, OpenAIApi } from "openai";

//import { Send } from "react-icons/md";

const ChatbotContainer = () => {
  // dotenv.config();
  // const apiKey = "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";
  // const openai = gptAPI(configuration.apiKey);
  // const configuration = new Configuration({
  //   apiKey: "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",
  // });
  // const openai = new OpenAIApi(configuration);

  // console.log(completion.data.choices[0].message);

  const [inputText, setInputText] = useState("");
  const [thinking, setThinking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    { content: "hi", role: "assistant" },
  ]);
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
    let text = inputText;
    setInputText("");
    setThinking(true);
    // Add user's question to chat history
    // setChatHistory([...chatHistory, { role: "user", content: inputText }]);
    // setInputText("");

    try {
      // const completion = await openai.createChatCompletion({
      //   model: "gpt-3.5-turbo",
      //   messages: [
      //     {
      //       role: "system",
      //       content: "You are HealthGPT helpful assistant health coach",
      //     },
      //     ...chatHistory,
      //   ],
      // });
      // Make request to OpenAI API

      const params = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "you are a helpful health coach" },
          ...chatHistory,
          { role: "user", content: text },
        ],
        temperature: 1,
        top_p: 1,
        n: 1,
        stream: false,
        max_tokens: 50,
        presence_penalty: 0,
        frequency_penalty: 0,
      };
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        params,
        // {
        //   prompt: chatHistory.map((entry) => entry.message).join("\n"),
        //   model: "gpt-3.5-turbo",
        //   max_tokens: 50,
        //   temperature: 0.5,
        // },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer API",
          },
        }
      );

      const answer = response.data.choices[0].message.content;
      // const answer = completion.data.choices[0].message;

      // Add OpenAI's answer to chat history
      // setChatHistory([...chatHistory, { content: answer, role: "assistant" }]);
      setChatHistory([
        ...chatHistory,
        { role: "user", content: text },
        { role: "assistant", content: answer },
      ]);

      setInputText("");
    } catch (error) {
      console.log("Error:", error);
    }
    setThinking(false);
  };
  const containerStyle = {
    //border: "2px dashed blue",
    backgroundColor: "lightgray",
    padding: "10px",
    borderRadius: "10px",
    display: "",
    justifyContent: "",
    width: size ? "400px" : "",
    height: size ? "400px" : "680px",
    position: "relative",
  };

  return (
    <>
      {" "}
      {isOpen && (
        <div
          className="chatbot-container border flex flex-col overflow-auto"
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
              right: "80px",
              top: "10px",
            }}
          >
            minimize
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
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
            close
          </Button>
          <h1 className="text-red-600 my-3">Chatbot </h1>
          <div className="flex break-words flex-col items-start space-y-2 mt-4">
            {/* <Msg /> */}

            {chatHistory.map((chat, index) =>
              // <Msg key={index} props={chat} />
              chat.role === "user" ? (
                <div
                  key={index}
                  className="bg-blue-500 w-2/3 break-words ml-auto text-white py-2 px-4 rounded-lg"
                >
                  <p className="text-left">{chat.content}</p>
                </div>
              ) : (
                <div
                  key={index}
                  className="bg-blue-500 w-2/3 break-words mr-auto text-white py-2 px-4 rounded-lg"
                >
                  <p className="text-left">{chat.content}</p>
                </div>
              )
            )}
          </div>

          <div className="mt-auto w-full border-solid border-2 border-purple-600">
            <form className="w-full" onSubmit={handleFormSubmit}>
              <TextField
                className="w-full no-underline hover:no-underline"
                label="Enter Msg Here"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                disabled={thinking}
              >
                Enter Text Here
              </TextField>
              {thinking && <p>Thinking...</p>}
            </form>
          </div>
        </div>
      )}
      {!isOpen && (
        <div>
          <button onClick={() => setIsOpen(!isOpen)}>
            logo
            {/* Chatbot logo */}
          </button>
        </div>
      )}
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
