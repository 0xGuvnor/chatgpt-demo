import { useDebounce } from "@/hooks/useDebounce";
import { usePostAiAssistMutation } from "@/redux/api";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import MessageFormUI from "./MessageFormUI";

interface Props {
  props: MessageFormProps;
  activeChat: ChatObject | undefined;
}

const AiAssist = ({ props, activeChat }: Props) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File>();
  const [trigger, result] = usePostAiAssistMutation();
  const debouncedValue = useDebounce(message, 1000);
  const [appendText, setAppendText] = useState("");

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
    setMessage("");
    setAttachment(undefined);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      setMessage(`${message} ${appendText}`);
    }
    setAppendText("");
  };

  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      trigger(form);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (result.data?.text) {
      setAppendText(result.data?.text);
    }
  }, [result]);

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};
export default AiAssist;
