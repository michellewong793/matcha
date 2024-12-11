import axios from 'axios';

/** Processes user scores from program mappings */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { preferences, score } = req.body;

    try {
      // Example of sending data to Leo contract
      const response = await axios.post('https://aleo-api-endpoint.com/add-user', {
        id: Math.floor(Math.random() * 1000), // Unique user ID
        preferences,
        score,
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error interacting with Leo program:', error);
      res.status(500).json({ message: 'Error processing preferences' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}