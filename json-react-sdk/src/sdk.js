// src/sdk.js
export const fetchData = async ({ dataType, id = null, fields = [] }) => {
    try {
        // Build API URL
        let url = `https://jsonplaceholder.typicode.com/${dataType}`;
        if (id) {
            url += `/${id}`;
        }

        // Fetch data
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching ${dataType}`);
        }

        let data = await response.json();

        // If fields are provided, pick only those fields
        if (fields.length > 0) {
            const pickFields = (obj) => {
                return fields.reduce((acc, field) => {
                    if (obj.hasOwnProperty(field)) {
                        acc[field] = obj[field];
                    }
                    return acc;
                }, {});
            };

            // If it's an array (all records), map through
            if (Array.isArray(data)) {
                data = data.map(pickFields);
            } else {
                data = pickFields(data);
            }
        }

        return data;
    } catch (err) {
        console.error("SDK Fetch Error:", err.message);
        return null;
    }
};
