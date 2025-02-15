"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOffRampTransaction } from "../app/lib/actions/createOfframpTransaction";
import { useRouter } from "next/navigation";
import LoadingIndicator from './Loader';
import FeedbackModal from './FeedbackModal';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const RemoveMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    const [loading,setLoading]=useState(false);

    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(null);

    const handleFeedbackClose = () => {
        setFeedbackMessage(null);
        setFeedbackType(null);
    };


    const router=useRouter()
    return <Card title="Withdraw Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setValue(Number(val))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");//bank ki url
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");//bank provider name set
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                setLoading(true);
                try {
                    const result = await createOffRampTransaction(provider, value);
                    setFeedbackMessage(result.message);
                    setFeedbackType('success');
                    router.refresh();
                } catch (error) {
                    console.error("Error during transaction:", error);
                    setFeedbackMessage("An error occurred during the transaction.");
                    setFeedbackType('error');
                } finally {
                    setLoading(false);
                }
            }}>
            Withdraw
            </Button>
            <LoadingIndicator loading={loading} text="Processing..." />
        </div>
        <FeedbackModal 
                message={feedbackMessage} 
                type={feedbackType} 
                onClose={handleFeedbackClose} 
            />
    </div>
</Card>
}