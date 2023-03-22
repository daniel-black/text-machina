import MessageInput from "./message-input";
import Thread from "./thread";

export default function Chat() {
  return (
    <main className="h-screen flex flex-col">
      <Thread />
      <MessageInput />
    </main>
  );
}


// User hits "enter" to send new message
//
// If (firstMessage)
//    make call to API to get ChatGPT response
//    parse stream
//    update local messages
//    make call to API to create new Chat in DB (w/ both user and assistant messages)
//    update local chatId
//
// If (notFirstMessage)
//    make call to API to create new Chat in DB (w/ user message)
//    make call to API to get ChatGPT response
//    parse stream
//    update local messages
//    make call to API to update current Chat in DB