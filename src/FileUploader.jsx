import React, { useState } from 'react';

export function FileUploader() {
    const [fileContent, setFileContent] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const latin1Decoder = new TextDecoder("iso-8859-1");
            const content = latin1Decoder.decode(new Uint8Array(event.target.result));
            setFileContent(content);
        };

        reader.readAsArrayBuffer(file);
    };

    const filterRows = () => {
        const rows = fileContent.split('\n');
        const filtered = rows.filter(row => row.includes('|01|ANTIOQUIA|') || row.includes('|56|SAN ANDRES|')|| row.includes('|60|AMAZONAS|'));
        setFilteredRows(filtered);
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
        <div>
            <h2>Filter App</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={filterRows}>Generar Filtro</button>
            <button onClick={downloadFilteredFile}>Descargar archivo filtrado</button>
            <div>
                <h3>Archivo filtrado:</h3>
                <pre>{filteredRows.join('\n')}</pre>
            </div>
        </div>
    );
}

export default FileUploader;