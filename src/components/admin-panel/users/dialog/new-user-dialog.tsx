import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NewUserForm from "../form/new-user-form";
import { User } from "shared/types/user";

interface NewUserDialogProps {
    isOpen: boolean,
    onOpenChange: (value: boolean) => void;
    user: User | null;
}

const NewUserDialog = ({
    isOpen,
    onOpenChange,
    user
}: NewUserDialogProps) => {
    return (
        <Dialog
            modal
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 sm">
                Add User
            </DialogTrigger>

            <DialogContent>
                <DialogDescription>
                    {user
                        ? "Update the fields below to modify the user's information in your account."
                        : "Enter the required details to add a new user."}
                </DialogDescription>
                <DialogTitle>
                    {user ? "Editing the user info" : "Create a new user"}
                </DialogTitle>

                <NewUserForm
                    user={user}
                    _onSubmit={() => { onOpenChange(false) }}
                />
            </DialogContent>
        </Dialog >
    )
}

export default NewUserDialog;
