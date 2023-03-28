import { usePostAiCodeMutation } from "@/redux/api";
import { ChangeEvent, useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import MessageFormUI from "./MessageFormUI";

interface Props {
  props: MessageFormProps;
  activeChat: ChatObject | undefined;
}

const AiCode = ({ props, activeChat }: Props) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File>();
  const [trigger] = usePostAiCodeMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const att = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: att,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat!.id,
    };

    props.onSubmit(form);
    trigger(form);
    setMessage("");
    setAttachment(undefined);
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
export default AiCode;
