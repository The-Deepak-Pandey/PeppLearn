import { Menu, MenuIcon, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);

    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Logged out successfully");
            navigate("/login");
        }
    }, [isSuccess]);

    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50'>
            {/* Desktop */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>PeppLearn</h1>
                </div>
                {/* User icons and dark mode icon */}
                <div className='flex items-center gap-4'>
                    {
                        user ? (<DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem><Link to="my-learning">My Learnings</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutHandler} >Log Out</DropdownMenuItem>
                                </DropdownMenuGroup>
                                {
                                    user.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                        </>
                                    )
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/login")}>Signup</Button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>
            </div>
            {/* Mobile Device */}
            <div className='flex md:hidden items-center justify-between h-full px-4'>
                <School size={"30"} />
                <h1 className='font-extrabold text-2xl'>PeppLearn</h1>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar

const MobileNavbar = () => {
    const role = "instructor"

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gray-300" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader className="flex flex-row items-center justify-between mt-2 mb-4">
                    <School size={"30"} />
                    <SheetTitle>PeppLearn</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className='mr-2' />
                <nav className='flex flex-col space-y-4'>
                    <span>My Learning</span>
                    <span>Edit Profile</span>
                    <p>Log Out</p>
                </nav>
                {
                    role === "instructor" && (
                        <SheetFooter className="mt-4">
                            <SheetClose asChild>
                                <Button type="submit">Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
            </SheetContent>
        </Sheet>
    )
}