"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SelectedInputProps } from "@/app/components/SelectInput";

export function useSelectedFilters(filters: SelectedInputProps[]) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedFilters: Record<string, string> = {};
    filters.forEach((filter) => {
        const rawValue = searchParams.get(filter.id);
        if (!rawValue) return;

        const matchedOption = filter.options.find(
            (opt) => opt.toLowerCase() === rawValue.toLowerCase()
        );

        if (matchedOption) {
            selectedFilters[filter.id] = matchedOption;
        }
    });

    const handleChange = (id: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(id, value);
        } else {
            params.delete(id);
        }
        router.push(`?${params.toString()}`);
    };

    const handleReset = () => {
        router.push(window.location.pathname);
    };

    return { selectedFilters, handleChange, handleReset };
}