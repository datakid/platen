export default {
  id: "git",
  name: "Git",
  short: "GIT",
  pigment: "git",
  family: null,
  version: "2.x",
  lexer: "bash",
  indent: 4,
  topics: [
    {
      id: "init-add-commit",
      n: 1,
      title: "init, add, commit",
      concepts: [
        {
          id: "init-repo", n: 1, title: "initialize a repository", level: 1,
          gloss: "Creates a new repository in the current folder or in a named one.",
          examples: [
            { code: `git init`, notes: [{ at: "git init", text: "creates the hidden .git folder" }] },
            { code: `git init -b main notes-app`, notes: [{ at: "-b main", text: "names the first branch" }, { at: "notes-app", text: "new folder for the repository" }] },
            { code: `git init --bare shared.git`, notes: [{ at: "--bare", text: "no working tree, for sharing" }] }
          ]
        },
        {
          id: "stage-files", n: 2, title: "stage changes", level: 1,
          gloss: "Stages file changes so the next commit includes them.",
          examples: [
            { code: `git add README.md`, notes: [{ at: "git add", text: "moves changes to the index" }] },
            { code: `git add src/ docs/`, notes: [{ at: "src/ docs/", text: "whole folders at once" }] },
            { code: `git add -A`, notes: [{ at: "-A", text: "new, changed and deleted files" }] },
            { code: `git add -u`, notes: [{ at: "-u", text: "tracked files only" }] }
          ]
        },
        {
          id: "commit-changes", n: 3, title: "commit", level: 1,
          gloss: "Records the staged changes as a commit with a message.",
          examples: [
            { code: `git commit -m "Add login form"`, notes: [{ at: "-m", text: "message given inline" }] },
            { code: `git commit -am "Fix typo in README"`, notes: [{ at: "-a", text: "stages tracked files first" }] },
            { code: `git commit -m "Add retry logic" -m "Retries failed calls three times."`, notes: [{ at: "\"Retries failed calls three times.\"", text: "becomes the message body" }] }
          ]
        },
        {
          id: "amend-commit", n: 4, title: "amend the last commit", level: 2,
          gloss: "Rewrites the latest commit to fix its message or add forgotten files.",
          examples: [
            { code: `git commit --amend -m "Add login form with validation"`, notes: [{ at: "--amend", text: "replaces the last commit" }] },
            { code: `git add src/auth.py
git commit --amend --no-edit`, notes: [{ at: "--no-edit", text: "keeps the old message" }] },
            { code: `git commit --amend --reset-author --no-edit`, notes: [{ at: "--reset-author", text: "author becomes the current user" }] }
          ]
        }
      ]
    },
    {
      id: "status-diff",
      n: 2,
      title: "status & diff",
      concepts: [
        {
          id: "status-view", n: 1, title: "view status", level: 1,
          gloss: "Shows which files are staged, modified or untracked.",
          examples: [
            { code: `git status`, notes: [{ at: "git status", text: "staged, modified and untracked" }] },
            { code: `git status -s`, notes: [{ at: "-s", text: "short two column format" }] },
            { code: `git status -sb`, notes: [{ at: "-sb", text: "adds the branch line" }] },
            { code: `git status --ignored`, notes: [{ at: "--ignored", text: "lists ignored files too" }] }
          ]
        },
        {
          id: "diff-unstaged", n: 2, title: "unstaged changes", level: 1,
          gloss: "Compares the working tree with the index to show edits that are not staged.",
          examples: [
            { code: `git diff`, notes: [{ at: "git diff", text: "unstaged changes only" }] },
            { code: `git diff src/app.py`, notes: [{ at: "src/app.py", text: "limits the diff to one file" }] },
            { code: `git diff --stat`, notes: [{ at: "--stat", text: "summary of changed lines" }] },
            { code: `git diff --word-diff`, notes: [{ at: "--word-diff", text: "marks changed words" }] }
          ]
        },
        {
          id: "diff-staged", n: 3, title: "staged changes", level: 2,
          gloss: "Compares the index with the last commit to preview what the next commit holds.",
          examples: [
            { code: `git diff --staged`, notes: [{ at: "--staged", text: "what the next commit will hold" }] },
            { code: `git diff --staged src/app.py`, notes: [{ at: "src/app.py", text: "one file only" }] },
            { code: `git diff --cached --stat`, notes: [{ at: "--cached", text: "same as --staged" }] },
            { code: `git diff --staged --name-only`, notes: [{ at: "--name-only", text: "file names without changes" }] }
          ]
        },
        {
          id: "diff-commits", n: 4, title: "compare commits", level: 2,
          gloss: "Compares two commits, branches or tags.",
          examples: [
            { code: `git diff main..feature/login`, notes: [{ at: "..", text: "changes between the two tips" }] },
            { code: `git diff HEAD~1 HEAD`, notes: [{ at: "HEAD~1", text: "the commit before the tip" }] },
            { code: `git diff main...feature/login --stat`, notes: [{ at: "...", text: "since the common ancestor" }] },
            { code: `git diff v1.0.0 HEAD --name-only`, notes: [{ at: "v1.0.0", text: "a tag works like any ref" }] }
          ]
        }
      ]
    },
    {
      id: "log-show",
      n: 3,
      title: "log & show",
      concepts: [
        {
          id: "log-oneline", n: 1, title: "compact log", level: 1,
          gloss: "Lists commits one per line with a short hash and the subject.",
          examples: [
            { code: `git log --oneline`, notes: [{ at: "--oneline", text: "short hash and subject" }] },
            { code: `git log --oneline -5`, notes: [{ at: "-5", text: "the last five commits" }] },
            { code: `git log --oneline --graph --all`, notes: [{ at: "--graph", text: "draws the branch lines" }, { at: "--all", text: "every branch, not just this one" }] },
            { code: `git log --oneline --decorate`, notes: [{ at: "--decorate", text: "shows branch and tag names" }] }
          ]
        },
        {
          id: "log-filter", n: 2, title: "filter commits", level: 1,
          gloss: "Narrows the log by author, date, message or path.",
          examples: [
            { code: `git log --author="Ada"`, notes: [{ at: "--author", text: "matches name or email" }] },
            { code: `git log --since="2 weeks ago"`, notes: [{ at: "--since", text: "accepts relative dates" }] },
            { code: `git log --grep="login"`, notes: [{ at: "--grep", text: "searches commit messages" }] },
            { code: `git log --oneline -- src/app.py`, notes: [{ at: "--", text: "separates paths from options" }] }
          ]
        },
        {
          id: "log-format", n: 3, title: "log formats", level: 2,
          gloss: "Controls the layout with pretty formats, stats and patches.",
          examples: [
            { code: `git log --pretty=format:"%h %an %s"`, notes: [{ at: "%h", text: "short hash" }, { at: "%an", text: "author name" }, { at: "%s", text: "subject line" }] },
            { code: `git log --stat -3`, notes: [{ at: "--stat", text: "files changed per commit" }] },
            { code: `git log -p -1`, notes: [{ at: "-p", text: "full patch of each commit" }] },
            { code: `git log --format="%h %ad" --date=short`, notes: [{ at: "%ad", text: "author date" }, { at: "--date=short", text: "year-month-day" }] }
          ]
        },
        {
          id: "log-range", n: 4, title: "commit ranges", level: 2,
          gloss: "Selects the commits reachable from one ref but not from another.",
          examples: [
            { code: `git log main..feature/login`, notes: [{ at: "main..feature/login", text: "only on the feature branch" }] },
            { code: `git log origin/main..HEAD`, notes: [{ at: "origin/main..HEAD", text: "local commits not pushed yet" }] },
            { code: `git log --oneline v1.0.0..HEAD`, notes: [{ at: "v1.0.0..HEAD", text: "everything since the tag" }] },
            { code: `git log --left-right main...feature/login`, notes: [{ at: "--left-right", text: "marks which side each commit is on" }] }
          ]
        },
        {
          id: "show-object", n: 5, title: "show an object", level: 1,
          gloss: "Shows the message and changes of a commit, tag or file at a ref.",
          examples: [
            { code: `git show`, notes: [{ at: "git show", text: "the latest commit" }] },
            { code: `git show HEAD~1`, notes: [{ at: "HEAD~1", text: "one commit back" }] },
            { code: `git show v1.0.0`, notes: [{ at: "v1.0.0", text: "tag details and its commit" }] },
            { code: `git show main:README.md`, notes: [{ at: "main:README.md", text: "the file as it is on main" }] }
          ]
        }
      ]
    },
    {
      id: "branches",
      n: 4,
      title: "branches",
      concepts: [
        {
          id: "branch-create", n: 1, title: "create and switch", level: 1,
          gloss: "Creates a branch and moves to it with switch.",
          examples: [
            { code: `git switch -c feature/login`, notes: [{ at: "-c", text: "creates the branch first" }] },
            { code: `git switch main`, notes: [{ at: "git switch", text: "moves to an existing branch" }] },
            { code: `git switch -`, notes: [{ at: "-", text: "the previous branch" }] },
            { code: `git branch hotfix/payment`, notes: [{ at: "git branch", text: "creates without switching" }] }
          ]
        },
        {
          id: "branch-list", n: 2, title: "list branches", level: 1,
          gloss: "Lists local, remote or merged branches.",
          examples: [
            { code: `git branch`, notes: [{ at: "git branch", text: "local branches, current starred" }] },
            { code: `git branch -vv`, notes: [{ at: "-vv", text: "upstream and last commit" }] },
            { code: `git branch -a`, notes: [{ at: "-a", text: "local and remote branches" }] },
            { code: `git branch --merged main`, notes: [{ at: "--merged", text: "already contained in main" }] }
          ]
        },
        {
          id: "branch-rename-delete", n: 3, title: "rename and delete", level: 2,
          gloss: "Renames a branch or deletes it once it is merged or abandoned.",
          examples: [
            { code: `git branch -m old-name new-name`, notes: [{ at: "-m", text: "renames the branch" }] },
            { code: `git branch -d feature/login`, notes: [{ at: "-d", text: "refuses if unmerged" }] },
            { code: `git branch -D experiment`, notes: [{ at: "-D", text: "deletes even if unmerged" }] }
          ]
        },
        {
          id: "branch-start-point", n: 4, title: "start points", level: 2,
          gloss: "Creates a branch from a tag, a remote branch or an older commit.",
          examples: [
            { code: `git switch -c hotfix/payment v1.0.0`, notes: [{ at: "v1.0.0", text: "branch starts at the tag" }] },
            { code: `git switch -c review/orders origin/main`, notes: [{ at: "origin/main", text: "starts from a remote branch" }] },
            { code: `git branch backup HEAD~2`, notes: [{ at: "HEAD~2", text: "two commits before the tip" }] },
            { code: `git switch -c release/1.1 main`, notes: [{ at: "main", text: "explicit start point" }] }
          ]
        }
      ]
    },
    {
      id: "merge",
      n: 5,
      title: "merge",
      concepts: [
        {
          id: "merge-basic", n: 1, title: "merge a branch", level: 1,
          gloss: "Merges another branch into the current one.",
          examples: [
            { code: `git switch main
git merge feature/login`, notes: [{ at: "git merge", text: "brings the branch into main" }] },
            { code: `git merge origin/main`, notes: [{ at: "origin/main", text: "merges the remote branch" }] },
            { code: `git merge feature/login -m "Merge login feature"`, notes: [{ at: "-m", text: "sets the merge commit message" }] }
          ]
        },
        {
          id: "merge-no-ff", n: 2, title: "merge commits", level: 2,
          gloss: "Forces a merge commit even when a fast-forward is possible.",
          examples: [
            { code: `git merge --no-ff feature/login`, notes: [{ at: "--no-ff", text: "always creates a merge commit" }] },
            { code: `git merge --no-ff -m "Merge login feature" feature/login`, notes: [{ at: "-m", text: "message for the merge commit" }] },
            { code: `git merge --no-ff --no-edit feature/login`, notes: [{ at: "--no-edit", text: "accepts the default message" }] }
          ]
        },
        {
          id: "merge-ff-only", n: 3, title: "fast-forward only", level: 2,
          gloss: "Refuses to merge unless the branch can simply fast-forward.",
          examples: [
            { code: `git merge --ff-only feature/login`, notes: [{ at: "--ff-only", text: "fails instead of making a merge" }] },
            { code: `git merge --ff-only origin/main`, notes: [{ at: "origin/main", text: "keeps history linear" }] },
            { code: `git pull --ff-only origin main`, notes: [{ at: "git pull", text: "fetch plus fast-forward" }] }
          ]
        },
        {
          id: "merge-squash", n: 4, title: "squash merges", level: 2,
          gloss: "Combines a branch into one staged change that you commit yourself.",
          examples: [
            { code: `git merge --squash feature/login
git commit -m "Add login"`, notes: [{ at: "--squash", text: "stages the changes, no commit yet" }] },
            { code: `git merge --squash experiment`, notes: [{ at: "experiment", text: "source branch is left alone" }] },
            { code: `git switch main
git merge --squash feature/login
git commit -m "Add login feature"`, notes: [{ at: "git commit", text: "creates the single commit" }] }
          ]
        },
        {
          id: "merge-conflicts", n: 5, title: "resolve conflicts", level: 2,
          gloss: "Stops a conflicted merge, takes one side of a file or finishes after resolving.",
          examples: [
            { code: `git merge --abort`, notes: [{ at: "--abort", text: "returns to the pre-merge state" }] },
            { code: `git restore --theirs src/app.py
git add src/app.py`, notes: [{ at: "--theirs", text: "takes the incoming version" }] },
            { code: `git restore --ours src/app.py
git add src/app.py
git commit --no-edit`, notes: [{ at: "--ours", text: "keeps the current branch version" }] }
          ]
        }
      ]
    },
    {
      id: "rebase",
      n: 6,
      title: "rebase",
      concepts: [
        {
          id: "rebase-branch", n: 1, title: "rebase onto a branch", level: 1,
          gloss: "Replays the current branch's commits on top of another branch.",
          examples: [
            { code: `git rebase main`, notes: [{ at: "git rebase", text: "replays commits on main" }] },
            { code: `git switch feature/login
git rebase main`, notes: [{ at: "git switch", text: "run the rebase from the feature" }] },
            { code: `git rebase origin/main`, notes: [{ at: "origin/main", text: "rebases on the remote branch" }] },
            { code: `git rebase --onto main feature/base feature/login`, notes: [{ at: "--onto", text: "moves a range to a new base" }] }
          ]
        },
        {
          id: "rebase-interactive", n: 2, title: "interactive rebase", level: 2,
          gloss: "Edits recent commits by reordering, squashing or rewording them in a todo list.",
          examples: [
            { code: `git rebase -i HEAD~3`, notes: [{ at: "-i", text: "opens the todo list" }, { at: "HEAD~3", text: "the last three commits" }] },
            { code: `git rebase -i main`, notes: [{ at: "main", text: "every commit since main" }] },
            { code: `git rebase -i --autosquash main`, notes: [{ at: "--autosquash", text: "orders fixup commits for you" }] }
          ]
        },
        {
          id: "rebase-fixup", n: 3, title: "fixup commits", level: 2,
          gloss: "Marks a commit as a fix of an earlier one and squashes it in with autosquash.",
          examples: [
            { code: `git commit --fixup=HEAD~1
git rebase -i --autosquash HEAD~3`, notes: [{ at: "--fixup", text: "names the commit being fixed" }] },
            { code: `git commit --squash=HEAD~2`, notes: [{ at: "--squash", text: "lets you edit the combined message" }] },
            { code: `git config --global rebase.autoSquash true`, notes: [{ at: "rebase.autoSquash", text: "always on for interactive rebases" }] }
          ]
        },
        {
          id: "rebase-control", n: 4, title: "continue, skip, abort", level: 2,
          gloss: "Resumes a rebase that stopped on a conflict, or skips or abandons it.",
          examples: [
            { code: `git add src/app.py
git rebase --continue`, notes: [{ at: "--continue", text: "after resolving and staging" }] },
            { code: `git rebase --skip`, notes: [{ at: "--skip", text: "drops the conflicting commit" }] },
            { code: `git rebase --abort`, notes: [{ at: "--abort", text: "restores the original branch" }] }
          ]
        },
        {
          id: "pull-rebase", n: 5, title: "pull with rebase", level: 2,
          gloss: "Rebases local commits on top of fetched ones instead of merging.",
          examples: [
            { code: `git pull --rebase origin main`, notes: [{ at: "--rebase", text: "no merge commit" }] },
            { code: `git fetch origin
git rebase origin/main`, notes: [{ at: "git fetch", text: "the same thing in two steps" }] },
            { code: `git pull --rebase --autostash`, notes: [{ at: "--autostash", text: "stashes and restores local edits" }] }
          ]
        }
      ]
    },
    {
      id: "remotes",
      n: 7,
      title: "remotes",
      concepts: [
        {
          id: "remote-add", n: 1, title: "add a remote", level: 1,
          gloss: "Registers a named remote repository by its url.",
          examples: [
            { code: `git remote add origin git@github.com:acme/orders.git`, notes: [{ at: "origin", text: "usual name for the main remote" }] },
            { code: `git remote add upstream https://github.com/acme/orders.git`, notes: [{ at: "upstream", text: "the project you forked from" }] },
            { code: `git remote -v`, notes: [{ at: "-v", text: "shows fetch and push urls" }] }
          ]
        },
        {
          id: "remote-manage", n: 2, title: "rename, repoint, remove", level: 2,
          gloss: "Changes the name or address of a remote, or removes it.",
          examples: [
            { code: `git remote rename origin upstream`, notes: [{ at: "rename", text: "branch tracking is updated too" }] },
            { code: `git remote set-url origin https://github.com/acme/orders.git`, notes: [{ at: "set-url", text: "switches the remote address" }] },
            { code: `git remote remove upstream`, notes: [{ at: "remove", text: "forgets the remote and its branches" }] },
            { code: `git remote show origin`, notes: [{ at: "show", text: "branches and tracking details" }] }
          ]
        },
        {
          id: "clone-repo", n: 3, title: "clone", level: 1,
          gloss: "Copies a remote repository and checks out its default branch.",
          examples: [
            { code: `git clone https://github.com/acme/orders.git`, notes: [{ at: "git clone", text: "creates an orders folder" }] },
            { code: `git clone --depth 1 https://github.com/acme/orders.git`, notes: [{ at: "--depth 1", text: "latest commit only" }] },
            { code: `git clone -b develop git@github.com:acme/orders.git orders-dev`, notes: [{ at: "-b develop", text: "checks out that branch" }, { at: "orders-dev", text: "custom folder name" }] }
          ]
        },
        {
          id: "fetch-pull", n: 4, title: "fetch and pull", level: 1,
          gloss: "Downloads remote changes with fetch, or fetches and merges them with pull.",
          examples: [
            { code: `git fetch origin`, notes: [{ at: "fetch", text: "downloads without changing files" }] },
            { code: `git fetch --all --prune`, notes: [{ at: "--prune", text: "drops deleted remote branches" }] },
            { code: `git pull`, notes: [{ at: "pull", text: "fetch then merge" }] },
            { code: `git pull origin main`, notes: [{ at: "origin main", text: "names remote and branch" }] }
          ]
        },
        {
          id: "push-branch", n: 5, title: "push", level: 1,
          gloss: "Uploads local commits to a branch on a remote.",
          examples: [
            { code: `git push origin main`, notes: [{ at: "origin main", text: "remote then branch" }] },
            { code: `git push -u origin feature/login`, notes: [{ at: "-u", text: "remembers the upstream branch" }] },
            { code: `git push --force-with-lease`, notes: [{ at: "--force-with-lease", text: "fails if the remote moved" }] },
            { code: `git push origin --delete feature/login`, notes: [{ at: "--delete", text: "removes the remote branch" }] }
          ]
        },
        {
          id: "tracking-branches", n: 6, title: "upstream tracking", level: 2,
          gloss: "Links a local branch to a remote branch for pull and push.",
          examples: [
            { code: `git branch --set-upstream-to=origin/main main`, notes: [{ at: "--set-upstream-to", text: "links main to origin/main" }] },
            { code: `git switch --track origin/develop`, notes: [{ at: "--track", text: "creates a local tracking branch" }] },
            { code: `git push --set-upstream origin feature/login`, notes: [{ at: "--set-upstream", text: "long form of -u" }] },
            { code: `git branch -vv`, notes: [{ at: "-vv", text: "shows ahead and behind counts" }] }
          ]
        }
      ]
    },
    {
      id: "stash",
      n: 8,
      title: "stash",
      concepts: [
        {
          id: "stash-save", n: 1, title: "stash changes", level: 1,
          gloss: "Sets aside uncommitted changes so the working tree matches the last commit.",
          examples: [
            { code: `git stash`, notes: [{ at: "git stash", text: "saves tracked changes" }] },
            { code: `git stash push -m "wip login form"`, notes: [{ at: "-m", text: "labels the stash entry" }] },
            { code: `git stash push -u`, notes: [{ at: "-u", text: "includes untracked files" }] },
            { code: `git stash push src/app.py`, notes: [{ at: "src/app.py", text: "only this path is stashed" }] }
          ]
        },
        {
          id: "stash-list", n: 2, title: "list and inspect", level: 1,
          gloss: "Lists stash entries and shows what one of them contains.",
          examples: [
            { code: `git stash list`, notes: [{ at: "list", text: "newest entry first" }] },
            { code: `git stash show`, notes: [{ at: "show", text: "summary of the latest entry" }] },
            { code: `git stash show -p stash@{1}`, notes: [{ at: "-p", text: "full patch" }, { at: "stash@{1}", text: "second newest entry" }] },
            { code: `git stash show --stat stash@{0}`, notes: [{ at: "stash@{0}", text: "the newest entry" }] }
          ]
        },
        {
          id: "stash-apply", n: 3, title: "apply and pop", level: 1,
          gloss: "Brings stashed changes back, keeping the entry with apply or removing it with pop.",
          examples: [
            { code: `git stash pop`, notes: [{ at: "pop", text: "applies and drops the entry" }] },
            { code: `git stash apply`, notes: [{ at: "apply", text: "applies and keeps the entry" }] },
            { code: `git stash apply stash@{1}`, notes: [{ at: "stash@{1}", text: "pick an older entry" }] },
            { code: `git stash pop --index`, notes: [{ at: "--index", text: "restores the staged state too" }] }
          ]
        },
        {
          id: "stash-drop", n: 4, title: "drop and clear", level: 2,
          gloss: "Deletes one stash entry or all of them.",
          examples: [
            { code: `git stash drop`, notes: [{ at: "drop", text: "removes the latest entry" }] },
            { code: `git stash drop stash@{1}`, notes: [{ at: "stash@{1}", text: "removes a chosen entry" }] },
            { code: `git stash clear`, notes: [{ at: "clear", text: "removes every entry" }] }
          ]
        },
        {
          id: "stash-branch", n: 5, title: "stash to a branch", level: 3,
          gloss: "Creates a branch from the stash's base commit and applies the stash there.",
          examples: [
            { code: `git stash branch feature/login-wip`, notes: [{ at: "branch", text: "applies and drops the stash" }] },
            { code: `git stash branch fix/typo stash@{1}`, notes: [{ at: "stash@{1}", text: "uses an older entry" }] },
            { code: `git stash push -m "before rebase" && git rebase main`, notes: [{ at: "&&", text: "rebase only if the stash worked" }] }
          ]
        }
      ]
    },
    {
      id: "reset-restore",
      n: 9,
      title: "reset & restore",
      concepts: [
        {
          id: "restore-file", n: 1, title: "restore files", level: 1,
          gloss: "Discards working tree changes to a file or restores it from another commit.",
          examples: [
            { code: `git restore src/app.py`, notes: [{ at: "git restore", text: "discards unstaged edits" }] },
            { code: `git restore .`, notes: [{ at: ".", text: "every file under here" }] },
            { code: `git restore --source=HEAD~1 src/app.py`, notes: [{ at: "--source", text: "reads from an older commit" }] },
            { code: `git restore --source=v1.0.0 README.md`, notes: [{ at: "v1.0.0", text: "a tag works as the source" }] }
          ]
        },
        {
          id: "unstage-file", n: 2, title: "unstage files", level: 1,
          gloss: "Unstages a file while keeping its edits in the working tree.",
          examples: [
            { code: `git restore --staged src/app.py`, notes: [{ at: "--staged", text: "edits stay in the working tree" }] },
            { code: `git restore --staged .`, notes: [{ at: ".", text: "unstages everything" }] },
            { code: `git reset HEAD src/app.py`, notes: [{ at: "reset HEAD", text: "older way to unstage" }] },
            { code: `git restore --staged --worktree src/app.py`, notes: [{ at: "--worktree", text: "also discards the edits" }] }
          ]
        },
        {
          id: "reset-modes", n: 3, title: "reset modes", level: 2,
          gloss: "Moves the branch back and keeps or drops the changes depending on the mode.",
          examples: [
            { code: `git reset --soft HEAD~1`, notes: [{ at: "--soft", text: "keeps changes staged" }] },
            { code: `git reset HEAD~1`, notes: [{ at: "reset", text: "keeps changes unstaged" }] },
            { code: `git reset --hard HEAD~1`, notes: [{ at: "--hard", text: "discards the changes" }] },
            { code: `git reset --hard origin/main`, notes: [{ at: "origin/main", text: "matches the remote exactly" }] }
          ]
        },
        {
          id: "revert-commit", n: 4, title: "revert a commit", level: 2,
          gloss: "Creates a new commit that undoes an earlier one without rewriting history.",
          examples: [
            { code: `git revert HEAD --no-edit`, notes: [{ at: "revert", text: "adds an inverse commit" }] },
            { code: `git revert HEAD~2 --no-edit`, notes: [{ at: "HEAD~2", text: "reverts an older commit" }] },
            { code: `git revert --no-commit HEAD~1..HEAD`, notes: [{ at: "--no-commit", text: "stages the undo, no commit" }] },
            { code: `git revert -m 1 HEAD`, notes: [{ at: "-m 1", text: "keeps the first parent of a merge" }] }
          ]
        },
        {
          id: "reflog-recovery", n: 5, title: "recover with the reflog", level: 3,
          gloss: "Finds lost commits in the reflog and moves a branch back to them.",
          examples: [
            { code: `git reflog`, notes: [{ at: "reflog", text: "every place head has been" }] },
            { code: `git reset --hard HEAD@{1}`, notes: [{ at: "HEAD@{1}", text: "where head was one move ago" }] },
            { code: `git branch recovered HEAD@{3}`, notes: [{ at: "recovered", text: "new branch at the lost commit" }] },
            { code: `git reflog show feature/login`, notes: [{ at: "show", text: "history of one branch tip" }] }
          ]
        }
      ]
    },
    {
      id: "tags",
      n: 10,
      title: "tags",
      concepts: [
        {
          id: "tag-light", n: 1, title: "lightweight tags", level: 1,
          gloss: "Marks a commit with a name and nothing else.",
          examples: [
            { code: `git tag v1.0.1`, notes: [{ at: "git tag", text: "names the current commit" }] },
            { code: `git tag v1.0.2 HEAD~2`, notes: [{ at: "HEAD~2", text: "tags an older commit" }] },
            { code: `git tag build-2026-11-07`, notes: [{ at: "build-2026-11-07", text: "any name works" }] }
          ]
        },
        {
          id: "tag-annotated", n: 2, title: "annotated tags", level: 1,
          gloss: "Creates a tag object that stores an author, a date and a message.",
          examples: [
            { code: `git tag -a v1.1.0 -m "Release 1.1.0"`, notes: [{ at: "-a", text: "makes an annotated tag" }, { at: "-m", text: "message stored in the tag" }] },
            { code: `git tag -a v1.0.3 -m "Hotfix for payments" HEAD~1`, notes: [{ at: "HEAD~1", text: "tags the previous commit" }] },
            { code: `git tag -a v2.0.0-rc1 -m "Release candidate 1"`, notes: [{ at: "-rc1", text: "pre-release suffix" }] }
          ]
        },
        {
          id: "tag-list", n: 3, title: "list and inspect", level: 1,
          gloss: "Lists tags, filters them by pattern and shows what a tag points to.",
          examples: [
            { code: `git tag`, notes: [{ at: "git tag", text: "lists in alphabetical order" }] },
            { code: `git tag -l "v1.*"`, notes: [{ at: "-l", text: "filters by pattern" }] },
            { code: `git show v1.0.0`, notes: [{ at: "git show", text: "tag details and its commit" }] },
            { code: `git describe --tags`, notes: [{ at: "--tags", text: "nearest tag and the distance" }] }
          ]
        },
        {
          id: "tag-push", n: 4, title: "share tags", level: 2,
          gloss: "Pushes one tag or all tags to a remote, since push skips tags by default.",
          examples: [
            { code: `git push origin v1.0.0`, notes: [{ at: "v1.0.0", text: "pushes a single tag" }] },
            { code: `git push origin --tags`, notes: [{ at: "--tags", text: "every local tag" }] },
            { code: `git push --follow-tags`, notes: [{ at: "--follow-tags", text: "annotated tags on pushed commits" }] }
          ]
        },
        {
          id: "tag-delete", n: 5, title: "delete and move", level: 2,
          gloss: "Deletes a tag locally and on the remote, or moves it to another commit.",
          examples: [
            { code: `git tag -d v1.0.0`, notes: [{ at: "-d", text: "deletes the local tag" }] },
            { code: `git push origin --delete v1.0.0`, notes: [{ at: "--delete", text: "deletes the remote tag" }] },
            { code: `git tag -f v1.0.0 HEAD~1`, notes: [{ at: "-f", text: "moves an existing tag" }] },
            { code: `git push origin :refs/tags/v1.0.0`, notes: [{ at: ":refs", text: "leading colon deletes the remote ref" }] }
          ]
        }
      ]
    },
    {
      id: "cherry-pick-bisect",
      n: 11,
      title: "cherry-pick & bisect",
      concepts: [
        {
          id: "cherry-pick", n: 1, title: "cherry-pick", level: 1,
          gloss: "Applies the changes of a chosen commit onto the current branch.",
          examples: [
            { code: `git cherry-pick feature/login`, notes: [{ at: "feature/login", text: "picks the tip of the branch" }] },
            { code: `git cherry-pick feature/login~1`, notes: [{ at: "~1", text: "the commit before the tip" }] },
            { code: `git cherry-pick -x feature/login`, notes: [{ at: "-x", text: "records the source commit" }] },
            { code: `git cherry-pick feature/login~1..feature/login`, notes: [{ at: "..", text: "a range, first commit excluded" }] }
          ]
        },
        {
          id: "cherry-pick-options", n: 2, title: "cherry-pick options", level: 2,
          gloss: "Stages the changes without committing or picks several commits in one command.",
          examples: [
            { code: `git cherry-pick --no-commit feature/login`, notes: [{ at: "--no-commit", text: "leaves the changes staged" }] },
            { code: `git cherry-pick feature/login~1 feature/login`, notes: [{ at: "feature/login~1 feature/login", text: "applied in order" }] },
            { code: `git cherry-pick -n -x feature/login`, notes: [{ at: "-n", text: "short form of --no-commit" }] }
          ]
        },
        {
          id: "cherry-pick-control", n: 3, title: "continue or abort", level: 2,
          gloss: "Resumes a cherry-pick that stopped on a conflict, or skips or abandons it.",
          examples: [
            { code: `git add src/app.py
git cherry-pick --continue`, notes: [{ at: "--continue", text: "commits after you resolve" }] },
            { code: `git cherry-pick --skip`, notes: [{ at: "--skip", text: "drops the current commit" }] },
            { code: `git cherry-pick --abort`, notes: [{ at: "--abort", text: "restores the earlier state" }] }
          ]
        },
        {
          id: "bisect-start", n: 4, title: "start a bisect", level: 1,
          gloss: "Starts a binary search for the commit that introduced a bug.",
          examples: [
            { code: `git bisect start`, notes: [{ at: "start", text: "begins a bisect session" }] },
            { code: `git bisect start HEAD v1.0.0`, notes: [{ at: "HEAD", text: "known bad" }, { at: "v1.0.0", text: "known good" }] },
            { code: `git bisect start -- src/`, notes: [{ at: "-- src/", text: "only commits touching src" }] }
          ]
        },
        {
          id: "bisect-mark", n: 5, title: "mark commits", level: 1,
          gloss: "Marks the current commit as good or bad so git narrows the range.",
          examples: [
            { code: `git bisect bad`, notes: [{ at: "bad", text: "the bug is present here" }] },
            { code: `git bisect good`, notes: [{ at: "good", text: "the bug is absent here" }] },
            { code: `git bisect good v1.0.0`, notes: [{ at: "v1.0.0", text: "mark a given ref instead" }] },
            { code: `git bisect skip`, notes: [{ at: "skip", text: "this commit cannot be tested" }] }
          ]
        },
        {
          id: "bisect-run", n: 6, title: "automate a bisect", level: 2,
          gloss: "Runs a script at each step and marks commits from its exit status.",
          examples: [
            { code: `git bisect run ./test.sh`, notes: [{ at: "./test.sh", text: "exit 0 is good, 1 to 127 is bad" }] },
            { code: `git bisect run python -m pytest -x`, notes: [{ at: "-x", text: "stops at the first failure" }] },
            { code: `git bisect run sh -c "! grep -q TODO src/app.py"`, notes: [{ at: "sh -c", text: "inline test command" }] }
          ]
        },
        {
          id: "bisect-finish", n: 7, title: "finish a bisect", level: 2,
          gloss: "Shows what bisect found and returns to the original branch.",
          examples: [
            { code: `git bisect log`, notes: [{ at: "log", text: "steps taken so far" }] },
            { code: `git bisect reset`, notes: [{ at: "reset", text: "back to the starting branch" }] },
            { code: `git bisect reset main`, notes: [{ at: "main", text: "end the session on this branch" }] },
            { code: `git bisect log > bisect.txt`, notes: [{ at: ">", text: "saves the log to a file" }] }
          ]
        }
      ]
    },
    {
      id: "config-aliases",
      n: 12,
      title: "config & aliases",
      concepts: [
        {
          id: "config-identity", n: 1, title: "identity", level: 1,
          gloss: "Sets the name and email that are recorded on your commits.",
          examples: [
            { code: `git config --global user.name "Ada Lovelace"`, notes: [{ at: "--global", text: "applies to every repository" }] },
            { code: `git config --global user.email "ada@example.com"`, notes: [{ at: "user.email", text: "shown in the commit log" }] },
            { code: `git config --local user.email "ada@acme.example"`, notes: [{ at: "--local", text: "this repository only" }] },
            { code: `git config user.name`, notes: [{ at: "user.name", text: "no value prints the current one" }] }
          ]
        },
        {
          id: "config-defaults", n: 2, title: "defaults", level: 1,
          gloss: "Sets defaults for the first branch name, the editor, the pager and colors.",
          examples: [
            { code: `git config --global init.defaultBranch main`, notes: [{ at: "init.defaultBranch", text: "name used by git init" }] },
            { code: `git config --global core.editor "nano"`, notes: [{ at: "core.editor", text: "opens for commit messages" }] },
            { code: `git config --global core.pager "less -FRX"`, notes: [{ at: "-FRX", text: "quits early, keeps colors" }] },
            { code: `git config --global color.ui auto`, notes: [{ at: "auto", text: "colors only in a terminal" }] }
          ]
        },
        {
          id: "config-behavior", n: 3, title: "everyday behavior", level: 2,
          gloss: "Turns on pull rebasing, push tracking, pruning and a clearer conflict style.",
          examples: [
            { code: `git config --global pull.rebase true`, notes: [{ at: "pull.rebase", text: "pull rebases by default" }] },
            { code: `git config --global push.autoSetupRemote true`, notes: [{ at: "autoSetupRemote", text: "first push sets the upstream" }] },
            { code: `git config --global fetch.prune true`, notes: [{ at: "fetch.prune", text: "drops deleted remote branches" }] },
            { code: `git config --global merge.conflictStyle zdiff3`, notes: [{ at: "zdiff3", text: "shows the base version in conflicts" }] }
          ]
        },
        {
          id: "config-inspect", n: 4, title: "inspect settings", level: 1,
          gloss: "Reads settings and shows which file each one comes from.",
          examples: [
            { code: `git config --list`, notes: [{ at: "--list", text: "every setting in effect" }] },
            { code: `git config --list --show-origin`, notes: [{ at: "--show-origin", text: "adds the config file path" }] },
            { code: `git config --get user.email`, notes: [{ at: "--get", text: "one value" }] },
            { code: `git config --global --unset core.editor`, notes: [{ at: "--unset", text: "removes the setting" }] }
          ]
        },
        {
          id: "git-aliases", n: 5, title: "aliases", level: 1,
          gloss: "Defines short aliases for long commands in the git config.",
          examples: [
            { code: `git config --global alias.st "status -sb"`, notes: [{ at: "alias.st", text: "runs as git st" }] },
            { code: `git config --global alias.co "switch"`, notes: [{ at: "alias.co", text: "a shorter switch" }] },
            { code: `git config --global alias.lg "log --oneline --graph --decorate"`, notes: [{ at: "alias.lg", text: "compact history graph" }] },
            { code: `git config --global alias.unstage "restore --staged"`, notes: [{ at: "restore --staged", text: "arguments are appended" }] }
          ]
        },
        {
          id: "alias-shell", n: 6, title: "shell aliases", level: 3,
          gloss: "Defines aliases that run shell commands by starting the value with an exclamation mark.",
          examples: [
            { code: `git config --global alias.root "rev-parse --show-toplevel"`, notes: [{ at: "rev-parse --show-toplevel", text: "prints the repository root" }] },
            { code: `git config --global alias.sync \\
    '!git fetch --all --prune && git pull --ff-only'`, notes: [{ at: "'!", text: "runs in the shell" }] },
            { code: `git config --global alias.cleanup \\
    '!git branch --merged main | grep -v main | xargs -r git branch -d'`, notes: [{ at: "--merged main", text: "only fully merged branches" }, { at: "xargs -r", text: "does nothing with no input" }] }
          ]
        }
      ]
    }
  ]
};
