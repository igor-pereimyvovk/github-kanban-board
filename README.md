## Github Kanban Board

### Links

-   Solution URL: https://github.com/igor-pereimyvovk/github-kanban-board
-   Live Site URL: https://igor-pereimyvovk.github.io/github-kanban-board

### Users should be able to

-   User should enter repo URL in the input on top of the page and press "Load". For example: https://github.com/ facebook/react
-   App loads issues for the repo using Github API.
-   App contains 3 columns: ToDo (all new issues), In Progress (opened issues with assignee), Done (closed issues)
-   User should be able to drag-n-drop between the columns and change the order of issues
-   Current issue position (column and order) should be stored between search and browser sessions. When the user loads issues for Repo1 -> Repo2 -> Repo1 he should see all changes he did for Repo1
-   User should be able to visit the profile of the owner of the repo and visit the repo as well by links under the input

### Built with

-   React
-   TypeScript
-   CSS-Modules
-   Redux Toolkit
-   Axios
-   React-Testing-Library
-   dnd-kit
-   date-fns
