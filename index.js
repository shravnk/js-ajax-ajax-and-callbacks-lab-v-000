$(document).ready(function (){
});

function searchRepositories() {
  const req = new XMLHttpRequest()
  const searchTerms = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    $("#results").html(showRepositories(response))
  }).fail(error => {displayError()})
}

function showRepositories(response) {
  const repoList =
  `<ul>${response.items.map(repo => {
    return (
      `<li>
      <h2><a href="${repo.html_url}">${repo.name}</a></h2>
      <h4>Created by: ${repo.owner.login}</h4>
      <img src="${repo.owner.avatar_url}" height="32" width="32">
      <a href="#" data-owner="${repo.owner.login}" data-repository="${repo.name}" onClick="showCommits(this)">Commits</a>
      </li>`)}).join('')}
      </ul>`


  return repoList
}


function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response) {
  $("#details").html(displayCommits(response));
}).fail(error => {
  displayError()
})
}

function displayCommits(response) {
  const commitsList = response.map(commit => {
    return displayCommit(commit)
  }).join('')
  return `<ul>${commitsList}</ul>`
}

function displayCommit(commit) {
  return `<li><p>SHA: ${commit.sha}</p><p>Commit message: ${commit.commit.message}</p></li>`
}

function displayError() {
    $("#errors").html("I'm sorry, there's been an error. Please try again.");
}
