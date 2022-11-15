import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import styles from './Dropdown.module.css'

interface DropdownProps {
    userName?: string | null
    picture?: string | null
}

export const Dropdown = (props: DropdownProps) => {
    const [open, setOpen] = useState(false)
    const onOpenChange = (open: boolean) => setOpen(open)

    return (
        <DropdownMenu.Root onOpenChange={onOpenChange}>
            <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
                <div className="flex flex-auto items-center justify-items-center justify-center md:justify-end">
                    <div className="w-12 flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                        <img className="rounded-full h-10 w-10 object-cover" src={props.picture || "/profile.jpg"} alt="user profile picture" />
                    </div>
                    <DropdownMenu.Trigger asChild>
                        <p className="flex items-center ml-2 text-white relative cursor-pointer">
                            <span>{props.userName || "John Doe"}</span>
                            {open &&
                                <ChevronDownIcon className="h-5 w-5 text-white" />
                            }
                            {!open &&
                                <ChevronRightIcon className="h-5 w-5 text-white" />
                            }
                        </p>
                    </DropdownMenu.Trigger>
                </div>
            </div>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={25}>
                    <DropdownMenu.Item className="DropdownMenuItem">
                        <Link href="/api/auth/logout">Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}