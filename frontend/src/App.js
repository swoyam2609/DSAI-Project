import React, { useState } from "react";
import axios from "axios";

function App(props) {
    const [withGlobal, setWithGlobal] = useState(true);
    const [withIndia, setWithIndia] = useState(false);
    const [csv, setCsv] = useState(null);
    const [result, setResult] = useState(null);
    const [processing, setProcessing] = useState(false);

    const predict = async () => {
        setProcessing(true);
        const data = new FormData();
        data.append("file", csv);
        try {
            const res = await axios.post(
                `predict?withGlobal=${withGlobal}&withIndia=${withIndia}`,
                data
            );
            setResult(res.data);
        } catch (error) {
            console.log(error);
        }
        setProcessing(false);
    };

    return (
        <div className="bg-gray-100 min-h-[100vh] pb-10">
            <div className="flex flex-col items-center pt-10 p-2">
                <div className="text-xl bg-blue-700 text-white p-2 px-10 mb-2 rounded-full">
                    DSAI Project
                </div>
                <div className="text-3xl font-bold text-center">
                    Predictive Modelling for Epidemic Outbreaks
                </div>

                <div className="flex gap-4 mt-10 items-start p-8 rounded-xl shadow-md bg-white flex-col md:flex-row md:items-end">
                    <div class="flex items-center justify-center w-full sm:w-80">
                        <label
                            for="dropzone-file"
                            class="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    class="w-8 h-8 mb-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16">
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>

                                {csv == null ? (
                                    <>
                                        <p class="mb-2 text-sm text-gray-500 px-4 text-center">
                                            <span class="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p class="text-xs text-gray-500 ">
                                            Epidemic data in CSV
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-2 text-sm text-gray-500 px-4 text-center">
                                            <span class="font-semibold">
                                                {csv.name}
                                            </span>{" "}
                                            file selected
                                        </p>
                                        <p class="text-xs text-gray-500 ">
                                            Click to upload or drop another csv
                                            to replace
                                        </p>
                                    </>
                                )}
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                class="hidden"
                                accept=".csv"
                                onChange={(e) => setCsv(e.target.files[0])}
                            />
                        </label>
                    </div>

                    <div className="">
                        <label class="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                class="sr-only peer"
                                checked={withGlobal}
                                onChange={(e) =>
                                    setWithGlobal(e.target.checked)
                                }
                            />
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span class="ms-3 text-sm font-medium text-gray-900 ">
                                Covid-19 Global
                            </span>
                        </label>

                        <label class="flex items-center cursor-pointer mt-2 mb-4">
                            <input
                                type="checkbox"
                                value=""
                                class="sr-only peer"
                                checked={withIndia}
                                onChange={(e) => setWithIndia(e.target.checked)}
                            />
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span class="ms-3 text-sm font-medium text-gray-900 ">
                                Covid-19 India
                            </span>
                        </label>

                        {!processing ? (
                            <button
                                type="button"
                                onClick={predict}
                                class="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Predict Epidemic
                            </button>
                        ) : (
                            <button
                                disabled
                                type="button"
                                class="py-3.5 px-[2.13rem] me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center cursor-not-allowed">
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    class="inline w-4 h-4 me-3 text-gray-200 animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="#1C64F2"
                                    />
                                </svg>
                                Predicting
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {result == null ? null : (
                <div className="w-[90vw] max-w-[60rem] p-2 mt-5 rounded-xl shadow-md bg-white mx-auto">
                    <img src={`data:image/jpeg;base64,${result}`} />
                </div>
            )}
        </div>
    );
}

export default App;
