import { ChatHeaderProps } from "react-chat-engine-advanced";
import { HiChatBubbleLeftRight, HiPhone } from "react-icons/hi2";

interface Props {
  props: ChatHeaderProps;
}

const Header = ({ props }: Props) => {
  return (
    <div className="flex items-center justify-between px-8 py-[15px] border-b">
      <div className="flex space-x-2">
        <HiChatBubbleLeftRight className="w-7 h-7" />
        <h3 className="text-lg font-bold">{props.title}</h3>
      </div>

      <div className="flex space-x-2">
        <HiPhone className="w-6 h-6" />
        {props.description === "⬅️ ⬅️ ⬅️" ? (
          <p>No chat selected</p>
        ) : (
          <p>{props.description}</p>
        )}
      </div>
    </div>
  );
};
export default Header;
