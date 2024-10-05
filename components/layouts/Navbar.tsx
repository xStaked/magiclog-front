import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoginDialog } from "../auth/LoginDialog";

const Navbar = () => {
  return (
    <nav className="bg-background border-b w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-evenly h-16">
          <div className="flex-1 flex justify-center">
            <span className="text-2xl font-bold text-primary">Marketplace</span>
          </div>
          <div className="flex-shrink-0">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <LoginDialog />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
