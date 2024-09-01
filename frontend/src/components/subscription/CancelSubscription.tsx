import { useCallback } from "react";
import { Button, useNotify, useRecordContext, useUpdate } from "react-admin"

const CancelSubscription = () => {
    const record = useRecordContext() || { id: '' };
    const [update] = useUpdate();
    const notify = useNotify();

    const cancelSubscription = useCallback(() => {
        update('subscription',
            { id: record.id, data: {} },
            {
                onError: (e) => notify(`An error occurred when cancelling subscription: ${e.message}`)
            },
        );
        return true;
    }, [update, record]);
    
    return (
        <Button
            onClick={cancelSubscription}
            label="Cancel subscription"
        />
    )
};

export default CancelSubscription;
