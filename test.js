const repoList =
`<ul>${response.items.map(repo => {
return (
  `<li>
    <h1>${repo.name}</h1>
    <p>${repo.description}</p>
    <a href="${repo.html_url}">${repo.html_url}</a>
    <p>${repo.owner.login}</p>
    <img src="${repo.owner.avatar_url}" height="32" width="32">
    <a href="${repo.owner.url}">${repo.owner.url}</a>
    <a href="#" data-owner="${repo.owner.login}" data-repository="${repo.name}" onClick="showCommits(this)">Show Commits</a>
  </li>`)}).join('')}
</ul>`
