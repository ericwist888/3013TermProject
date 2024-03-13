import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  await sleep(3000); 
  res.json(posts);
});

/** This was here; now it is commented out. 
// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  // The line below should be fixed.
  res.json(posts[0]);
});
*/
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});
/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */

/// this is added
app.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex > -1) {
    const updatedPost = { ...posts[postIndex], ...req.body };
    posts[postIndex] = updatedPost;
    res.json(updatedPost);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});
//this was added for author name from email
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = findUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

//this was here
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
