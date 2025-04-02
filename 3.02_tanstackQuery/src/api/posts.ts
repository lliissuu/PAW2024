const API_URL = "https://jsonplaceholder.typicode.com";

// Pobieranie listy postów
export const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
};

// Pobieranie szczegółów posta i użytkownika
export const fetchPostDetails = async (id: string) => {
  const postRes = await fetch(`${API_URL}/posts/${id}`);
  const post = await postRes.json();

  const userRes = await fetch(`${API_URL}/users/${post.userId}`);
  const user = await userRes.json();

  return { post, user };
};
