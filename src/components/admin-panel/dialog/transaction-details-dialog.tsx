import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { capitalizeFirstLetter, formatDate } from "@/lib/utils";
import { Expense, paymentMethodsDetails, Transaction } from "@/types/transaction";
import { Upload } from "lucide-react";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";

interface TransactionDetailsDialogProps {
  transaction: Transaction;
}

export function TransactionDetailsDialog({
  transaction
}: TransactionDetailsDialogProps) {
  return (
    <Dialog modal>
      <DialogTrigger>
        View Details
      </DialogTrigger>

      <DialogContent>
        <DialogDescription>

        </DialogDescription>
        <DialogTitle>
          Transaction Details
        </DialogTitle>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {transaction.category === "expense" && (() => {
              const card = (transaction as Expense).cardBrand;

              if (!card) {
                return null;
              }

              return <PaymentIcon type={card} format="mono" width={45} />
            })()}

            <div className="flex flex-col">
              <span className="text-zinc-500 text-sm">Account</span>
              <span className="font-medium">Default</span>
            </div>
          </div>
          <span className="text-zinc-500">
            {formatDate(transaction.date)}
          </span>
        </div>

        <Separator />

        <div className="flex w-full justify-between">
          <span className="text-2xl font-semibold">
            {transaction.category === "expense" ? "-" : "+"}${transaction.amount}
          </span>
          {transaction.category === "expense" && (() => {
            const expense = transaction as Expense;
            const formattedMethod = paymentMethodsDetails[expense.paymentMethod];

            const type = expense.type;

            const color: Record<string, string> = {
              debit: "bg-green-400 dark:bg-green-600",
              credit: ""
            }

            const colorMethod = expense.paymentMethod.replace("_", "");

            return (
              <div className="flex space-x-2">
                {type &&
                  <Badge className={`hover:` + color[type] + " " + color[type]}>
                    {capitalizeFirstLetter(type)}
                  </Badge>
                }
                {formattedMethod &&
                  <Badge style={{ backgroundColor: `var(--color-${colorMethod.toString()})` }}>
                    {formattedMethod.label}
                  </Badge>
                }
              </div>
            );
          })()}
        </div>

        <div className="rounded-md border p-5">
          <Label htmlFor="description">Description</Label>
          <p id="description">{transaction.description}</p>

          <Separator className="my-4" />

          <Label htmlFor="notes">Notes</Label>
          <p id="notes">{transaction.notes}</p>

          <Separator className="my-4" />

          <div className="flex justify-between w-full items-center">
            <Label htmlFor="recurring">Recurring</Label>
            <Switch disabled id="recurring" checked={transaction.recurring} />
          </div>
        </div>

        <div className="rounded-md border p-5">
          <Label>Receipts</Label>
          <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2">
            <div className="border-2 border-dashed rounded-lg flex flex-col gap-1 items-center justify-center mt-1 w-20 h-20 overflow-hidden">
              <img
                width={56}
                height={56}
                src="/receipt.jpeg"
                alt="receipt.jpe"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="border-2 border-dashed rounded-lg flex flex-col gap-1 p-4 items-center justify-center mt-1 w-20 h-20">
              <Upload className="w-6 h-6 text-zinc-700" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  );
}
