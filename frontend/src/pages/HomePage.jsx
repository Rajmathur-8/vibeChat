import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200 pt-16 pb-4"> {/* ✅ Add bottom padding here */}
      <div className="mx-auto max-w-7xl h-[calc(100vh-4rem)] border border-base-300 rounded-xl shadow-md overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-20 lg:w-72 border-r border-base-300 bg-base-100">
          <Sidebar />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-base-100">
          <div className="flex-1 overflow-hidden flex flex-col">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
