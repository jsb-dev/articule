async function requestSaveDiagram(diagram, _id) {
  const { REACT_APP_API_URL } = process.env;

  try {
    const response = await fetch(
      `${REACT_APP_API_URL}diagram/post?_id=${_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagram }),
      }
    );

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export default requestSaveDiagram;
