import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import Header from "../Header";
import StandardMessageForm from "../customMessageForms/StandardMessageForm";

const Chat = () => {
  const chatProps = useMultiChatLogic(
    process.env.NEXT_PUBLIC_PROJECT_ID!,
    "SamAltman",
    "1234"
  );

  return (
    <div>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chatHeaderProps) => (
          <Header props={chatHeaderProps} />
        )}
        renderMessageForm={(messageFormProps) => (
          <StandardMessageForm
            props={messageFormProps}
            activeChat={chatProps.chat}
          />
        )}
      />
    </div>
  );
};
export default Chat;
