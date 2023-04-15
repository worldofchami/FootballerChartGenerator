import { useEffect, useState } from "react";

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
    const [loading, setLoading] = useState<boolean>(false);
    const [validQuery, setValidQuery] = useState<boolean>(true);

    const handleSubmit = (): void => {
        setLoading((loading) => !loading);

        const submit = async (): Promise<void> => {
            const name = playerName.replaceAll(' ', '-').trim().toLowerCase();
            const response = await fetch(`${SERVER_URL}/${name}`);
            const data = await response.json();

            if(data.ok) {
                setLoading((loading) => !loading);

                const imageURL = `${FIREBASE_URL}/${data.fileName.replaceAll(" ", "-")}`;

                const imageResponse = await fetch(imageURL);
                const blob = await imageResponse.blob();

                if(URL.createObjectURL(blob) === imageURL) {
                    setImage(
                        <img
                            src={URL.createObjectURL(blob)}
                            alt={`${playerName}'s Chart`}
                            className="w-full object-cover"
                        />
                    );
                }

                else {
                    setValidQuery(false);
                }
            }
        }

        submit();
    };

    return (
        <>
            <div className="w-full h-screen flex flex-col gap-y-8 items-center justify-center">
                <div className="w-16 h-8 flex gap-x-4">
                    <a href="https://github.com/worldofchami/FootballerChartGenerator" target="_blank">
                        <div className="flex-grow-1 h-full flex justify-center items-center">
                            <img src="/github.png" alt="My GitHub" />
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/tino-chaminuka-803b8622b/" target="_blank">
                        <div className="flex-grow-1 h-full flex justify-center items-center">
                            <img src="/linkedin.png" alt="My LinkedIn" />
                        </div>
                    </a>
                </div>
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
                {
                    loading &&
                    <span className="text-base text-white absolute mx-auto left-0 right-0 bottom-5 text-center">generating...</span>
                }
                {
                    !validQuery &&
                    <span className="text-base text-white absolute mx-auto left-0 right-0 bottom-5 text-center">No data exists for that player! Try again...</span>
                }
            </div>
            {
                    image &&
                    <>
                        <div className="w-full h-fit px-8">
                            {image}
                        </div>
                        <div className="w-full h-screen px-8 text-white flex flex-col justify-center">
                            <h1 className="text-2xl font-bold">Stat Explanations:</h1>
                            <br />
                            <span>Stat(#) {"->"} Per 90 percentile score among players in a similar position across Europe's top leagues over the last 365 days.</span>
                            <br />
                            <small>e.g. PC% (95) means the player is in the 95th percentile for pass completion rate per 90.</small>
                            <br />
                            <br />
                            <span className="font-bold italic">Stat Abbreviations:</span>
                            <br />
                            <small>xAG {"->"} Expected Assisted Goals</small>
                            <br />
                            <small>ST {"->"} Shots Total</small>
                            <br />
                            <small>NPx {"->"} Non-Penalty Expected Goals</small>
                            <br />
                            <small>NPG {"->"} Non Penalty Goals</small>
                            <br />
                            <small>PPR {"->"} Progressive Passes Received</small>
                            <br />
                            <small>TAP {"->"} Touches (Opposition Penalty Area)</small>
                            <br />
                            <small>STO {"->"} Touches (Opposition Penalty Area)</small>
                            <br />
                            <small>PC {"->"} Successful Passes</small>
                            <br />
                            <small>PC% {"->"} Pass Completion Rate</small>
                            <br />
                            <small>SCA {"->"} Shot-Creating Actions</small>
                        </div>
                    </>
            }
        </>
    );
};