# Git Basic Commands — Theory + Command

### 1. `git init`

**Theory:** Initializes Git in a project folder. It creates a `.git` folder that stores Git's tracking information.

**Command:**

```bash
git init
```

---

### 2. `git status`

**Theory:** Shows the current status of the repository, such as modified, untracked, and staged files.

**Command:**

```bash
git status
```

---

### 3. `git add`

**Theory:** Adds changed files to the **staging area**. It tells Git which changes should be included in the next commit.

**Command:**

```bash
git add .
```

For a specific file:

```bash
git add filename
```

---

### 4. `git commit`

**Theory:** Saves the staged changes as a permanent snapshot in the local Git repository. A commit should have a meaningful message.

**Command:**

```bash
git commit -m "message"
```

Example:

```bash
git commit -m "Added login page"
```

---

### 5. `git log`

**Theory:** Displays the history of commits made in the repository.

**Command:**

```bash
git log
```

Short version:

```bash
git log --oneline
```

---

### 6. `git branch`

**Theory:** A branch is a separate line of development. It allows you to work on a feature without directly affecting another branch.

**Command to see branches:**

```bash
git branch
```

**Command to create a branch:**

```bash
git branch feature
```

---

### 7. `git switch`

**Theory:** Changes your current working branch.

**Command:**

```bash
git switch feature
```

Create and switch to a new branch:

```bash
git switch -c feature
```

---

### 8. `git merge`

**Theory:** Combines the changes of one branch into the currently active branch.

**Command:**

```bash
git merge feature
```

For example, if you are on `main`, this merges `feature` into `main`.

---

### 9. `git remote`

**Theory:** Manages the connection between your local repository and a remote repository such as GitHub.

**Command:**

```bash
git remote -v
```

Add a GitHub repository:

```bash
git remote add origin URL
```

---

### 10. `git clone`

**Theory:** Creates a local copy of an existing remote repository, usually from GitHub.

**Command:**

```bash
git clone URL
```

---

### 11. `git push`

**Theory:** Uploads your local commits to the remote repository such as GitHub.

**Command:**

```bash
git push
```

First push of a new branch:

```bash
git push -u origin main
```

---

### 12. `git pull`

**Theory:** Downloads the latest changes from the remote repository and integrates them into your current local branch.

**Command:**

```bash
git pull
```

---

### 13. `git fetch`

**Theory:** Downloads information about changes from the remote repository without automatically integrating those changes into your current branch.

**Command:**

```bash
git fetch
```

**Difference:**

* `fetch` → Get remote updates, don't integrate them.
* `pull` → Get remote updates and integrate them.

---

### 14. `git diff`

**Theory:** Shows the differences between your current changes and the previous version.

**Command:**

```bash
git diff
```

---

### 15. `git restore`

**Theory:** Used to discard changes made to a file that have not yet been committed.

**Command:**

```bash
git restore filename
```

---

### 16. `git rm`

**Theory:** Removes a file from the working directory and tells Git to track its deletion.

**Command:**

```bash
git rm filename
```

---

## Most Important Commands to Remember

```bash
git init
git status
git add .
git commit -m "message"
git branch
git switch
git merge
git clone URL
git pull
git push
git fetch
```
