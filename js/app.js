const category = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.news_category);
    newsCategory(data.data.news_category)
    
}

const newsCategory = cat =>{
    const categoriesContainer = document.getElementById('category-container');
    cat.forEach(category => {
        // console.log(category.category_name);
      const li = document.createElement('li');
    //   li.classList.add('d-flex p-4');
      li.innerHTML = `
      <span onclick='loadNews(${category.category_id})' class=" p-3  m-3" id="${category.category_id}">${category.category_name}</span>
      `;
      categoriesContainer.appendChild(li);
        
      
    })
    loadNews(category.category_id);

    
    
}






const categoryN = category();
// console.log(categoryN);



// ==========================================



const loadNews = async(news) =>{
    // console.log(news);
    const url = `https://openapi.programming-hero.com/api/news/category/0${news}`
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = (data) => {
    // console.log(data);
    const newsContainer = document.getElementById('news-container')
    data.forEach(news =>{
        const newsId = news._id;
        // console.log(news);
        const newsDiv = document.createElement('div');
        // newsDiv.classList.add('card mb-3 container');
        newsDiv.classList.add('card', 'mb-4', 'fluid', 'border-0');
        
        newsDiv.style.maxWidth = "840px";
        newsDiv.style.maxHeight = '540px';
        newsDiv.innerHTML = `
        <div onclick="newsDetails('${newsId}')" id="${newsId}" class="row g-0 p-4" data-bs-toggle="modal" data-bs-target="#newsModal">
        <div class="col-md-4">
          <img src="${news.thumbnail_url}" class="img-fluid" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p style="overflow: hidden; text-overflow: ellipsis;" class="card-text text-secondary">${news.details.slice(0, 500)}</p>
            <button onclick="newsDetails('${newsId}')" class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#newsModal">Show News</button>

            

          </div>
        </div>
      </div>
        
        `;
        newsContainer.appendChild(newsDiv);
        

    })

    document.getElementById('')
}

// news details section start

const newsDetails = async id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

const displayNewsDetails = details => {
    console.log(details);
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = details.title;

    const modalDetails = document.getElementById('modal-detail');
    modalDetails.innerText = details.details;
}


// news details section end 

loadNews(01);