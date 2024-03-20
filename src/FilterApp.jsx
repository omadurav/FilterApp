import React, { useState } from 'react';
import { DataFilter } from './Components/DataFilter';

export function FilterApp() {
    const [fileContent, setFileContent] = useState('');
    const [isFileUploaded, setIsFileUploaded] = useState(false);


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const latin1Decoder = new TextDecoder("iso-8859-1");
            const content = latin1Decoder.decode(new Uint8Array(event.target.result));
            setFileContent(content);
            setIsFileUploaded(true);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto my-6'>
            <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Filter App</h2>


            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                        className="hidden"
                        id="dropzone-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            <div>
                <DataFilter fileContent={fileContent} isFileUploaded={isFileUploaded} />
            </div>
        </div>
    );
}