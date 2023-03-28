import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import Header from "../Header";
import StandardMessageForm from "../customMessageForms/StandardMessageForm";
import { useEffect, useState } from "react";
import Ai from "../customMessageForms/Ai";
import AiAssist from "../customMessageForms/AiAssist";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Chat = () => {
  const [mounted, setMounted] = useState(false);
  const username = useSelector((state: RootState) => state.auth.user);
  const secret = useSelector((state: RootState) => state.auth.secret);
  const chatProps = useMultiChatLogic(
    process.env.NEXT_PUBLIC_PROJECT_ID!,
    username,
    secret
  );

  // Check if component is mounted to prevent hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chatHeaderProps) => (
          <Header props={chatHeaderProps} />
        )}
        renderMessageForm={(messageFormProps) =>
          chatProps.chat?.title.startsWith("AI") ? (
            <Ai props={messageFormProps} activeChat={chatProps.chat} />
          ) : chatProps.chat?.title.startsWith("AI_Auto") ? (
            <AiAssist props={messageFormProps} activeChat={chatProps.chat} />
          ) : (
            <StandardMessageForm
              props={messageFormProps}
              activeChat={chatProps.chat}
            />
          )
        }
      />
    </>
  ) : null;
};
export default Chat;
