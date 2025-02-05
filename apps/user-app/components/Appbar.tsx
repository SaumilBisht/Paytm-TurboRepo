import { Command } from 'lucide-react'
import { Button } from '@/components/ui/button'


interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return (
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
            <div className="flex items-center space-x-2">
                <Command className="h-6 w-6" />
                <span className="text-xl font-semibold">PayTM</span>
            </div>
            <Button
                onClick={user ? onSignout : onSignin}
                variant="ghost"
                className="text-sm font-medium"
            >
                {user ? "Logout" : "Login"}
            </Button>
        </div>
    )
}