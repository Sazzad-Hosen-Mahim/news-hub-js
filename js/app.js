const category = async() =>{
    

    try{
        const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    newsCategory(data.data.news_category)
    }
    catch(error){
        console.log(error);
    }
    
}

const newsCategory = cat =>{
    // console.log(cat);
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
    

    
    
}






category();




// ==========================================



const loadNews = async(news) =>{
    // console.log(news);
   try{
    const url = `https://openapi.programming-hero.com/api/news/category/0${news}`
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
   }
   catch(error){
    console.log(error);
   }
}

const displayNews = (data) => {
    // console.log(data);
    // data length work

    const newsCounter = document.getElementById('news-counter');
    newsCounter.innerHTML = `
    <h4 class="text-center bg-white p-4">${data.length} news found</h4>
    `;


    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    // console.log(data);
    data.forEach(news =>{
        const newsId = news._id;
        // console.log(news);
        const newsDiv = document.createElement('div');
        // newsDiv.classList.add('card mb-3 container');
        newsDiv.classList.add('card', 'mb-4', 'fluid', 'border-0');
        
        newsDiv.style.maxWidth = "100%";
        newsDiv.style.maxHeight = '540px';
        newsDiv.innerHTML = `
        <div onclick="newsDetails('${newsId}')" id="${newsId}" class="row g-0 p-4 mx-auto" data-bs-toggle="modal" data-bs-target="#newsModal">
        <div class="col-md-4">
          <img src="${news.thumbnail_url}" class="img-fluid" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p style="
            width: 100%; 
            overflow: hidden;
            text-overflow: ellipsis" class="card-text text-secondary">${news.details.slice(0, 500)}</p>
            <button onclick="newsDetails('${newsId}')" class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#newsModal">Show News</button>

            <div class="d-flex">
                <div class='m-4'>
                    <img width='40px' height='40px' src="${news.author.img}" style="border-radius: 50%;">
                </div>
                <div class="mt-3">
                    <h5>${news.author.name ? news.author.name : 'No author detected'}</h5>
                    <p class="text-secondary">${news.author.published_date}</p>
                </div>
                <div class="mx-5 mt-3">
                <p>Total view</p>
                <h6>${news ? news.total_view : 'No views'}</h6>
                </div>
            </div>

            

          </div>
        </div>
      </div>
        
        `;
        newsContainer.appendChild(newsDiv);
        
        
        

    })

    
}

// news details section start

// ===========================================================

const newsDetails = async id => {
    // console.log(id);
    try{
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
    }
    catch(error){
        console.log(error);
    }
}

const displayNewsDetails = details => {
    // console.log(details);
    const modalTitle = document.getElementById('newsModalLabel');
    
    modalTitle.innerText = details.title;

    const modalDetails = document.getElementById('modal-detail');
    modalDetails.innerText = details.details;
}


// news details section end 

loadNews(01);
