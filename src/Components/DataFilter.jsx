import { useState } from "react";

export const DataFilter = ({ fileContent, isFileUploaded }) => {

    const [filteredRows, setFilteredRows] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    const filterRows = () => {
        const rows = fileContent.split('\n');
        const filtered = rows.filter(row => row.includes('|01|ANTIOQUIA|') || row.includes('|56|SAN ANDRES|') || row.includes('|60|AMAZONAS|'));
        setFilteredRows(filtered);
        setIsFiltered(true);
    };

    const downloadFilteredFile = () => {
        const content = filteredRows.join('\n');
        const latin1Encoder = new TextEncoder("iso-8859-1");
        const encodedContent = latin1Encoder.encode(content);
        const blob = new Blob([encodedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filtered_file.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <div className="file-type-group mt-2 flex justify-center">
                <div className="inline">
                    <input type="radio" id="option1" name="file-type" value="candidatos" />
                    <label className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="option1">Candidatos</label>
                    <input type="radio" id="option2" name="file-type" value="candidatos" className="ml-3" />
                    <label className=" ms-1 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="option2">Divipol</label>
                    <input type="radio" id="option3" name="file-type" value="candidatos" className="ml-3" />
                    <label className=" ms-1 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="option3">Transporte</label>
                </div>
            </div>

            <button
                onClick={filterRows}
                type="button"
                className={`block mx-auto mt-4 bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg ${isFileUploaded ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!isFileUploaded}
            >Generar Filtro</button>

            <button
                onClick={downloadFilteredFile}
                type="button"
                className={`block mx-auto mt-4 bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg ${isFiltered ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!isFiltered}
            >Descargar archivo filtrado</button>

            <pre>{filteredRows.join('\n')}</pre>
        </>
    )
}
