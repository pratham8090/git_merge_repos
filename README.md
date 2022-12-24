As per discussion our API takes three parameters 
1. Git URL where we need to merge both the repos (merge_repo).
2. Repo1 URL (repo1)
3. Repo2 URL (repo2)

Once the API is called with the required parameters it will clone the merge_repo and create another branch with random name and then in this branch it will merge repo1 + repo 2 and push it.