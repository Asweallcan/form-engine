export declare const usePendingEvents: () => {
    wait: (promise: Promise<void>) => Promise<void>;
    addPendingEvent: (key: string) => {
        key: string;
        promise: Promise<void>;
        resolve: () => void;
        canceled: boolean;
    };
};
