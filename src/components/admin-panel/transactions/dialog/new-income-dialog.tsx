import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Transaction } from "shared/types/transaction";
import NewIncomeForm from "../form/new-income-form";

const NewIncomeDialog = ({
    _onSubmit
}: {
    _onSubmit: (transaction: Transaction) => void
}) => {
    return (
        <Dialog modal>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 sm">
                Add Income
            </DialogTrigger>

            <DialogContent>
                <DialogDescription>
                    Fill out the details below to create a new income in your account.
                </DialogDescription>
                <DialogTitle>
                    Create a new income
                </DialogTitle>

                <NewIncomeForm _onSubmit={_onSubmit} />
            </DialogContent>
        </Dialog >
    )
}

export default NewIncomeDialog;
