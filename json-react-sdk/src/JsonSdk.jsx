import React, { useState, useEffect } from "react";
import { fetchData } from "./sdk";

const JsonSdk = ({ dataType, id, fields }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // For dynamic mode (UI controls)
    const [localType, setLocalType] = useState("users");
    const [localId, setLocalId] = useState("");
    const [localFields, setLocalFields] = useState("");

    // If props are passed, fetch automatically (static mode)
    useEffect(() => {
        if (dataType) {
            handleFetch(dataType, id, fields);
        }
    }, [dataType, id, fields]);

    const handleFetch = async (type, idValue, fieldsValue) => {
        setLoading(true);

        const data = await fetchData({
            dataType: type,
            id: idValue ? Number(idValue) : null,
            fields: fieldsValue
                ? Array.isArray(fieldsValue)
                    ? fieldsValue
                    : fieldsValue.split(",").map((f) => f.trim())
                : [],
        });

        setResult(data);
        setLoading(false);
    };

    // Render Static Mode
    if (dataType) {
        return (
            <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
                <h2>JSON SDK (Static Mode)</h2>
                {loading && <p>Loading...</p>}
                <pre
                    style={{
                        background: "#f4f4f4",
                        padding: "10px",
                        borderRadius: "5px",
                        maxHeight: "400px",
                        overflow: "auto",
                    }}
                >
                    {result ? JSON.stringify(result, null, 2) : "Fetching data..."}
                </pre>
            </div>
        );
    }

    // Render Dynamic Mode (with UI controls)
    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h2>JSON SDK (Dynamic Mode)</h2>

            {/* Controls */}
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                }}
            >
                <select
                    value={localType}
                    onChange={(e) => setLocalType(e.target.value)}
                >
                    <option value="users">Users</option>
                    <option value="posts">Posts</option>
                    <option value="photos">Photos</option>
                </select>

                <input
                    type="number"
                    placeholder="Optional ID"
                    value={localId}
                    onChange={(e) => setLocalId(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Fields (comma separated)"
                    value={localFields}
                    onChange={(e) => setLocalFields(e.target.value)}
                />

                <button
                    onClick={() => handleFetch(localType, localId, localFields)}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Fetch"}
                </button>
            </div>

            {/* Result */}
            <h3>Result</h3>
            <pre
                style={{
                    background: "#f4f4f4",
                    padding: "10px",
                    borderRadius: "5px",
                    maxHeight: "400px",
                    overflow: "auto",
                }}
            >
                {result ? JSON.stringify(result, null, 2) : "No data fetched yet"}
            </pre>
        </div>
    );
};

export default JsonSdk;
