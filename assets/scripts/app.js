class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();



const repositories = document.querySelector('#cards')

function getApiGitHub() {
    fetch('https://api.github.com/users/geelio/repos')
     .then(async res => {
        if( !res.ok){
            throw new Error(res.status)
        }
        let data = await res.json()
        data.map( item => {
            let project = document.createElement('div')


            function formatarData(dataISO) {
                const data = new Date(dataISO);
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês é zero-indexado
                const ano = data.getFullYear();
                return `${dia}/${mes}/${ano}`;
            }


            project.innerHTML = `
            <div class="card h-70">
            <div class="card-body">
                <h5 class="card-title"><a href="${ item.html_url}" target="_blank">${ item.name}</a></h5>
                <p class="card-text">${ item.full_name}
                </p>
                <div class="datacriacao">${formatarData(item.created_at)}</div>
                <hr>
                <div class="seguidores-repositorios">
                <div class="divstar">
                    <i class="fa-solid fa-star"></i>
                    <p>${Math.floor(Math.random() * 100)}</p>
                    </div>
                    <div class="divseguidor">
                    <i class="fa-solid fa-user fa-lg"></i>
                    <p>${Math.floor(Math.random() * 100)}</p>
                    </div>
                    
                    
            
            
            `

            repositories.appendChild(project)
        })
     })
}
getApiGitHub()


function carregarColegas() {
    fetch('http://localhost:3000/colegas')
        .then(response => response.json())
        .then(colegas => {
            const containerColegas = document.querySelector(".cardColegas");

            colegas.forEach(colega => {
                const cardColegas = document.createElement("div");
                cardColegas.classList.add("card");

                const linkColega = document.createElement("a");
                linkColega.href = colega.url_github;
                linkColega.target = "_blank";

                const imgColegas = document.createElement("img");
                imgColegas.src = colega.url_foto;
                imgColegas.alt = colega.nome;

                const nomeColega = document.createElement("h4");
                nomeColega.textContent = colega.nome;

                linkColega.appendChild(imgColegas);
                cardColegas.appendChild(linkColega);
                cardColegas.appendChild(nomeColega);
                containerColegas.appendChild(cardColegas);
            });
        })
        .catch(error => console.error('Error carregando colegas:', error));
}
carregarColegas();

function carregarConteudo() {
    fetch('http://localhost:3000/conteudos')
        .then(response => response.json())
        .then(conteudos => {
            const containerConteudos = document.querySelector(".carousel-inner");

            conteudos.forEach(conteudo => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add("carousel-item");
                if (conteudo === conteudos[0]) {
                    carouselItem.classList.add("active");
                }

                carouselItem.innerHTML = `
                    <a href="${conteudo.url_conteudo}"target="_blank"> <img src="${conteudo.url_capa}" class="d-block w-100 rounded" id="imgcarrosel" alt="${conteudo.titulo}"></a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${conteudo.titulo}</h5>
                        <p>${conteudo.descricao}</p>
                    </div>
                `;

                containerConteudos.appendChild(carouselItem);
            });
        })
        .catch(error => console.error('Error carregando conteudo:', error));
}
carregarConteudo();
