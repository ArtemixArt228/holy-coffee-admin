import { login, signup } from './actions'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


export default function LoginPage() {
    return (
        <section className='w-full h-dvh grid place-items-center'>
            <form className="w-full max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email:
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password:
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center justify-between space-x-4">
                    <Button
                        type="submit"
                        variant="secondary"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                        formAction={login}
                    >
                        Log in
                    </Button>
                    <Button
                        type="submit"
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                        formAction={signup}
                    >
                        Sign up
                    </Button>
                </div>
            </form>
        </section>
)
}