interface ListActionLogic {
    key: string;
    handler: () => void;
}

export const getListActionLogic = (handlers: {
    onEdit: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
    onShare: () => void;
}): ListActionLogic[] => [
        { key: "edit", handler: handlers.onEdit },
        { key: "duplicate", handler: handlers.onDuplicate },
        { key: "delete", handler: handlers.onDelete },
        { key: "share", handler: handlers.onShare },
    ];

