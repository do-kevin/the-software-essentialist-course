> examples generated from ChatGPT

```
Give me an example of MVC architecture in typescript server
```

- src
  - controllers
    - UserController.ts
  - models
    - User.ts
  - views
    - UserView.ts
  - app.ts

```ts
// UserController.ts
import { Request, Response } from "express";
import User from "../models/User";
import UserView from "../views/UserView";

class UserController {
  public static getUser(req: Request, res: Response) {
    const userId = req.params.id;
    // Assuming we have a User model and a database
    const user = User.findById(userId);
    const userView = UserView.render(user);
    res.json(userView);
  }

  public static createUser(req: Request, res: Response) {
    const userData = req.body;
    // Assuming we have a User model and a database
    const newUser = User.create(userData);
    const userView = UserView.render(newUser);
    res.json(userView);
  }
}

export default UserController;
```

```ts
// User.ts
interface User {
  id: number;
  name: string;
  email: string;
  // ... other properties
}

export default User;
```

```ts
// UserView.ts
import User from "../models/User";

class UserView {
  public static render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      // ... other properties
    };
  }
}

export default UserView;
```

```ts
// app.ts
import express from "express";
import UserController from "./controllers/UserController";

const app = express();

app.use(express.json());

app.get("/users/:id", UserController.getUser);
app.post("/users", UserController.createUser);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

```
Give me example code of a MVC server where View is the React application
```

- src
  - controllers
    - UserController.ts
  - models
    - User.ts
  - views
    - index.html
  - app.ts

```ts
// UserController.ts
import { Request, Response } from "express";
import User from "../models/User";

class UserController {
  public static getUser(req: Request, res: Response) {
    const userId = req.params.id;
    // Assuming we have a User model and a database
    const user = User.findById(userId);
    res.json(user);
  }

  public static createUser(req: Request, res: Response) {
    const userData = req.body;
    // Assuming we have a User model and a database
    const newUser = User.create(userData);
    res.json(newUser);
  }
}

export default UserController;
```

```ts
// User.ts
interface User {
  id: number;
  name: string;
  email: string;
  // ... other properties
}

export default User;
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

```ts
// app.ts
import express from "express";
import path from "path";
import UserController from "./controllers/UserController";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

app.get("/users/:id", UserController.getUser);
app.post("/users", UserController.createUser);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```
