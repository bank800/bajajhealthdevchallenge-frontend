import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = JSON.parse(jsonInput);
            const res = await axios.post('https://bajajhealthdevchallenge.herokuapp.com/bfhl', payload);
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError('Invalid JSON or API Error');
        }
    };

    return (
        <div className="App">
            <h1>Bajaj Health Dev Challenge</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="10"
                    cols="50"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Enter JSON here"
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h3>API Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
