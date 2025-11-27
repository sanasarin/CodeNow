# CodeNext

[![Checks](https://github.com/CSC301H5/finalprojectw23-jason-s-juniors/actions/workflows/checks.yml/badge.svg?branch=dev)](https://github.com/CSC301H5/finalprojectw23-jason-s-juniors/actions/workflows/checks.yml)

Preparing for technical interviews for software engineering positions can be a daunting process. The most common approach is to practice problems at [leetcode.com](http://leetcode.com/). However, with thousands of problems on the platform, it can get overwhelming for someone who has no idea where to start. Furthermore, even if you create your own plan for Leetcode problems, it quickly becomes cumbersome to track and manage your progress as you work through your plan. Lastly, it's important to take into account [Ebbinghaus's Forgetting Curve](https://www.mindtools.com/a9wjrjw/ebbinghauss-forgetting-curve) in your interview preparation. However, doing this manually is tedious and takes a lot of manual overhead.

CodeNow aims to improve the interview preparation workflow by providing the user with a customized Leetcode preparation plan based on the user's strengths and weaknesses with common technical interview concepts. CodeNow allows the user to create daily learning goals and schedules Leetcode problems for them to complete every day, while taking into account [Ebbinghaus's Forgetting Curve](https://www.mindtools.com/a9wjrjw/ebbinghauss-forgetting-curve). Additionally, CodeNow allows the user to visually see their progress as they work through their plan.

## Installation

First, you need to clone this repository and `cd` into it

```bash
git clone https://github.com/CSC301H5/finalprojectw23-jason-s-juniors.git
cd finalprojectw23-jason-s-juniors
```

Below are the steps needed to set up the backend.
### Backend Setup
Before continuing, make sure you have `pip` or `pip3` installed

First, `cd` into the `backend`.
```bash
cd backend
```
Now, we will install `pipenv` which is going to manage our python packages for us.

```bash
pip3 install pipenv
```

Next, let's create the virtual environment and install all of the dependencies.

```bash
pipenv shell
pipenv install
```

That should install everything for you. Let's verify that everything works by running our Django server.

```bash
python3 manage.py runserver
```

That's it!

### Frontend

Before continuing, make sure you have `npm` installed.

Simply `cd` into `frontend`:
```bash
cd frontend
```

And run the following command:

```bash
npm install
```

That's it! You can verify that your client is working by running

```bash
npm start
```

## Usage

### Backend
Make sure that you activate your `pipenv` if it is not activated. To do this, you can `cd` into `backend` and run the following command:

```
pipenv shell
```

Then, you can run the Django server using the following command:
```
python3 manage.py runserver
```

### Database
We are using sqlite for our database. To set up an sqlite database run the following command in the `backend` folder.

```
python3 manage.py migrate
```

You should now see an SQLite database in your directory.


### Frontend
`cd` into `frontend` and run the following command:

```
npm start
```


## Contributing
<!-- Should I add commands? -->
#### Gitflow
We utilize the [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow. We have two primary branches, `dev` and `main`.

### `dev`

The `dev` branch contains our development code.

If you want to contribute to our project, you need to create your feature branch from the `dev` branch.

Once you are done making changes, please submit a pull request.

Your pull request must be reviewed by at least two people to be merged into the `dev` branch.

#### Naming Convention for feature branches
Please ensure that your branch name directly follows the name of the feature. For example, if you are working on adding a calendar into the app, your branch name would be `calendar`.

### `main`
The `main` branch contains our official release.

<!-- Should I mention that the dev branch will be merged? -->
Merges to this branch will be made through a pull request at the end of every sprint. The pull request must be thoroughly reviewed and requires the approval of at least 4 members of the team.

### Ticketing System
We will be using Trello to track our issues.
