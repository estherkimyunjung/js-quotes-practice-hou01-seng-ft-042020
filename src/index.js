
// {
//   id: 1,
//   quote: "The here and now is all we have, and if we play it right it's all we'll need.",
//   author: "Ann Richards",
//   likes: [
//     {
//       id: 1,
//       quoteId: 1,
//       createdAt: 1558524356
//     }
//   ]
// }

const url = ' http://localhost:3000/quotes?_embed=likes'

fetch(url)
.then(res => res.json())
.then(quotesList => {
  for(const quote of quotesList){
   showQuotes(quote)
  }
})

const ulQuoteList = document.querySelector('#quote-list')

function showQuotes(quote){

  const liQuoteCard = document.createElement('li')
  liQuoteCard.className = 'quote-card'

  const blockQ = document.createElement('blockquote')
  blockQ.className = 'blockquote'

  const pQuote = document.createElement('p')
  pQuote.className = 'mb-0'
  pQuote.innerText = quote.quote

  const footer = document.createElement('footer')
  footer.className = 'blockquote-footer'
  footer.innerText = quote.author

  const br = document.createElement('br')

  const btnLike = document.createElement('button')
  btnLike.className = 'btn-success'
  btnLike.innerText = 'Likes : '
  btnLike.dataset.quoteLikeId = quote.id


  const spanLikeNum = document.createElement('span')
  // spanLikeNum.innerText = 0
  btnLike.append(spanLikeNum)

  const btnDelete = document.createElement('button')
  btnDelete.className = 'btn-danger'
  btnDelete.innerText = 'Delete'

  btnDelete.dataset.quoteDeleteId = quote.id

  blockQ.append(pQuote, footer, br, btnLike, btnDelete)
  liQuoteCard.append(blockQ)
  ulQuoteList.append(liQuoteCard)

}

const form = document.querySelector('#new-quote-form')
let inputQuote = document.querySelector('#new-quote')
let inputAuthor = document.querySelector('#author')
const btnSubmit = document.querySelector('.btn')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  
  inputQuote = e.target[0].value
  inputAuthor = e.target[1].value

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      quote: inputQuote,
      author: inputAuthor,
      // likes: likeQuote
    })
  }
  fetch(url, options)
  .then(res => res.json())
  .then(newQuote => {
    showQuotes(newQuote)
    form.reset()
  })
  
})

ulQuoteList.addEventListener('click', e => {

  if (e.target.className === "btn-danger"){
  
    const quoteDeleteId = e.target.dataset.quoteDeleteId
    // debugger
    const options = {
      method: 'DELETE'
    }
    
    // console.log(`${url}/${quoteDeleteId}`)
    fetch(`http://localhost:3000/quotes/${quoteDeleteId}`, options)
    .then(res => res.json())
    .then(deletedQuote => {
      // console.log(quoteDeleteId)
      const deleteEle = document.querySelector
        (`[data-quote-delete-id="${quoteDeleteId}"]`).parentElement.parentElement
      deleteEle.remove()
    })
  
  } else {
    console.log("test like button!")
  
    const quoteLikeId = e.target.dataset.quoteLikeId
    let spanLikeNum = e.target.children.value
    // console.log(e.target, quoteLikeId)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "quoteId": quoteLikeId,
        "createdAt": Date.now()  
      })
    }

    fetch('http://localhost:3000/likes', options)
    .then(res => res.json())
    .then(likeQuote => {
      console.log(showQuotes)
      // showQuotes(likeQuote)
    })
  
  }
  
})
