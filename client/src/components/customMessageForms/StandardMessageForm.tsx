import Image from "next/image";
import { useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import Dropzone from "react-dropzone";
import { GrClose } from "react-icons/gr";
import { HiPaperAirplane, HiPaperClip } from "react-icons/hi2";

interface Props {
  props: MessageFormProps;
  activeChat: ChatObject | undefined;
}

const StandardMessageForm = ({ props, activeChat }: Props) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File>();
  const [preview, setPreview] = useState("");

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

  return (
    <div className="flex px-4 space-x-2">
      {preview && (
        <div className="flex items-center space-x-1">
          <Image
            src={preview}
            alt="Attachment preview"
            width={40}
            height={40}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <GrClose
            onClick={() => {
              setPreview("");
              setAttachment(undefined);
            }}
            className="p-1 rounded-full cursor-pointer w-7 h-7 hover:bg-slate-300"
          />
        </div>
      )}
      <div className="flex items-center flex-1 pr-2 space-x-2 border">
        <div className="flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="w-full p-2 outline-none"
          />
        </div>
        <div className="flex items-center">
          <Dropzone
            accept={{ "image/png": [".png", ".jpg", ".jpeg"] }}
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <HiPaperClip
                  onClick={open}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            )}
          </Dropzone>

          <hr className="h-5 mx-2 border-[0.5px] border-slate-500" />
          <HiPaperAirplane
            onClick={() => {
              setPreview("");
              handleSubmit();
            }}
            className="w-6 h-6 cursor-pointer text-sky-500"
          />
        </div>
      </div>
    </div>
  );
};
export default StandardMessageForm;
