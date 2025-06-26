import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-base-100">
      <div className="text-center space-y-5 max-w-md px-6">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-2xl font-bold text-base-content">Welcome to VibeChat 👋</h2>
          <p className="text-base-content/70">
            Select a contact from the sidebar to start a conversation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
