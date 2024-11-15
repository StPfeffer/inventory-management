import { useReducer } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { moneyFormatters } from "@/lib/money-formatter";

type MoneyInputProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder?: string;
};

const moneyFormatter = moneyFormatters.en_US;

export default function MoneyInput({ form, name, label, placeholder }: MoneyInputProps) {
    const initialValue = form.getValues()[name]
        ? moneyFormatter.format(Number(form.getValues()[name]) || 0)
        : "";

    const [value, setValue] = useReducer((_: string, next: string) => {
        const digits = next.replace(/\D/g, "");
        return moneyFormatter.format(Number(digits) / 100);
    }, initialValue);

    function handleChange(onChange: (value: number) => void, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, "");
        const numericValue = Number(digits) / 100;
        onChange(numericValue);
    }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                const { onChange, value: fieldValue } = field;

                return (
                    <FormItem className="w-full">
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                type="text"
                                value={value || moneyFormatter.format(Number(fieldValue) || 0)}
                                onChange={(ev) => {
                                    const inputValue = ev.target.value;
                                    setValue(inputValue);
                                    handleChange(onChange, inputValue);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
