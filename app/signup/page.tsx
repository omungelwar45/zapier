"use client";
import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold error messages
    const [loading, setLoading] = useState(false); // State to indicate loading

    const handleSignup = async () => {
        setLoading(true); // Set loading to true when starting the signup
        setError(""); // Clear any previous errors
        try {
            const res = await axios.post(`${BACKEND_URL}/signup`, {
                username: email,
                password,
                name
            });
            // Handle successful signup here, e.g., redirect to login page
            router.push("/login");
        } catch (error) {
            // Handle error
            setError(error.response?.data?.message || "An error occurred during signup.");
        } finally {
            setLoading(false); // Set loading to false after signup attempt
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="flex pt-8 max-w-4xl">
                    <div className="flex-1 pt-20 px-4">
                        <div className="font-semibold text-3xl pb-4">
                            Join millions worldwide who automate their work using Zapier.
                        </div>
                        <div className="pb-6 pt-4">
                            <CheckFeature label={"Easy setup, no coding required"} />
                        </div>
                        <div className="pb-6">
                            <CheckFeature label={"Free forever for core features"} />
                        </div>
                        <CheckFeature label={"14-day trial of premium features & apps"} />
                    </div>
                    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                        <Input
                            label={"Name"}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            placeholder="Your name"
                        />
                        <Input
                            label={"Email"}
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            placeholder="Your Email"
                        />
                        <Input
                            label={"Password"}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />

                        {/* Display error message if there's an error */}
                        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                        <div className="pt-4">
                            <PrimaryButton 
                                onClick={handleSignup} 
                                size="big" 
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? "Signing up..." : "Get started free"}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
