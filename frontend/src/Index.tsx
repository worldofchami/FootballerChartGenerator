import { useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const FIREBASE_URL = import.meta.env.VITE_FIREBASE_URL;

export interface ResponseData {
    ok?: boolean;
    name?: string;
    fileName?: string;
}

export function Index() {
    const [playerName, setPlayername] = useState<string>('');
    const [image, setImage] = useState<JSX.Element | null>(null);

    const handleSubmit = async(): Promise<void> => {
        const name = playerName.replaceAll(' ', '-').trim().toLowerCase();
        const response = await fetch(`${SERVER_URL}/${name}`);
        const data = await response.json();

        // TODO: when final server build pushed, remove replaceAll and add / between URL and name
        if(data.ok) {
            setImage(
                <img src={`${FIREBASE_URL}${data.fileName.replaceAll('/public', '')}`} alt={`${playerName} Chart`} className="w-full object-cover" />
            )
        }
    };

    return (
        <>
            <div className="w-full h-screen flex flex-col gap-y-8 items-center justify-center">
                <h1 className="text-white font-bold text-9xl max-sm:text-6xl max-md:text-8xl">Welcome.</h1>
                <span className="text-white text-xl">Enter a footballer's name:</span>
                <div className="w-96 max-md:w-72 h-10 rounded-full glow z-0">
                    <input
                        type="text"
                        value={playerName}
                        onChange={({ target }) => setPlayername(target.value)}
                        className="h-full w-full rounded-full pl-4 text-white absolute bg-transparent z-10"
                    />
                </div>
                <button className="w-28 h-8 rounded-full font-bold" onClick={handleSubmit}>CREATE</button>
            </div>
            {
                    image &&
                    <div className="w-full h-fit px-8">
                        <h1 className="text-white text-3xl font-bold">{playerName} Chart</h1>
                        <br />
                        {image}
                    </div>
                }
        </>
    );
};