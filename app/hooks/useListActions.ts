"use client"

import { useState } from "react";

export function useListActions(listId: number) {
    const [pinned, setPinned] = useState(false);

    const handleEdit = () => {
        console.log("Editing list:", listId);
        // open modal, navigate, etc.
    };

    const handlePin = () => {
        console.log("Pin or Unpin list:", listId);
        setPinned(!pinned);
        // Toggle Pin property of the list (API call if needed)
    };

    const handleDuplicate = () => {
        console.log("Duplicating list:", listId);
        // call API, update state
    };

    const handleDelete = () => {
        console.log("Deleting list:", listId);
        // confirm + delete
    };

    const handleShare = () => {
        console.log("Sharing list:", listId);
        // open share dialog
    };

    return {
        pinned,
        setPinned,
        handleEdit,
        handlePin,
        handleDuplicate,
        handleDelete,
        handleShare,
    };
}