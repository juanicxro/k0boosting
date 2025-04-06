import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, UserRoundCog } from "lucide-react";

export default function NavProfiledDropdownMenu() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <User /> Nintwnage
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6 min-w-40">
          <DropdownMenuLabel className="flex flex-col">
            <p className="text-base text-foregroud">Nintwnage</p>
            <p className="text-xs text-muted-foreground">juanicxro@gmail.com</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserRoundCog className="text-foreground" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-400">
            <LogOut className="text-red-400" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
