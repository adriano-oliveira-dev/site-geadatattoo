// Menu hamburguer funcional
let burgerMenu = document.getElementById('burger-menu');
let navMenu = document.getElementById('nav-menu');

burgerMenu.addEventListener('click', (e) => {
    e.preventDefault();
    navMenu.classList.toggle('active');
    
    // Mudar ícone quando menu está aberto
    let menuIcon = burgerMenu.querySelector('.material-symbols-outlined');
    if (navMenu.classList.contains('active')) {
        menuIcon.textContent = 'close';
        
        burgerMenu.style.color = '#945438';
    } else {
        menuIcon.textContent = 'menu';
        

        burgerMenu.style.color = '#ffd8bc';
    }
});

// Fechar menu ao clicar em um link
let navLinks = document.querySelectorAll('#nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        let menuIcon = burgerMenu.querySelector('.material-symbols-outlined');
        menuIcon.textContent = 'menu';
        burgerMenu.style.color = '#ffd8bc';
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        let menuIcon = burgerMenu.querySelector('.material-symbols-outlined');
        menuIcon.textContent = 'menu';
        burgerMenu.style.color = '#ffd8bc';
    }
});

// Formulário de agendamento
const agendamentoForm = document.getElementById('agendamentoForm');

agendamentoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        tipoTattoo: document.getElementById('tipo-tattoo').value,
        localizacao: document.getElementById('localizacao').value,
        tamanho: document.getElementById('tamanho').value,
        descricao: document.getElementById('descricao').value,
        referencias: document.getElementById('referencias').value,
        orcamento: document.getElementById('orcamento').checked
    };
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone || !formData.descricao) {
        alert('Por favor, preencha todos os campos obrigatórios (*)');
        return;
    }
    
    // Aqui você pode:
    // 1. Enviar para um backend
    // 2. Enviar por email
    // 3. Integrar com WhatsApp
    // 4. Salvar em um banco de dados
    
    // Exemplo de integração com WhatsApp
    const mensagemWhatsApp = `
*NOVO AGENDAMENTO - GEADA TATTOO*

*Nome:* ${formData.nome}
*Email:* ${formData.email}
*Telefone:* ${formData.telefone}
*Tipo de Tattoo:* ${formData.tipoTattoo || 'Não informado'}
*Localização:* ${formData.localizacao || 'Não informado'}
*Tamanho:* ${formData.tamanho || 'Não informado'}
*Descrição:* ${formData.descricao}
*Referências:* ${formData.referencias || 'Nenhuma'}
*Solicita Orçamento:* ${formData.orcamento ? 'Sim' : 'Não'}
    `.trim();
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
    const numeroWhatsApp = '5584996261018'; // Seu número
    
    // Abrir WhatsApp (comente esta linha se não quiser)
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`, '_blank');
    
    // Mostrar mensagem de sucesso
    alert('Agendamento enviado com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    agendamentoForm.reset();
    
    // Ou mostrar mensagem na página
    // const successMessage = document.createElement('div');
    // successMessage.className = 'form-success show';
    // successMessage.innerHTML = `
    //     <i class="fas fa-check-circle"></i>
    //     <h3>Agendamento Enviado!</h3>
    //     <p>Entraremos em contato em até 24 horas para confirmar seu horário.</p>
    // `;
    // agendamentoForm.appendChild(successMessage);
});

// Máscara para telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        e.target.value = value;
    }
});

// Validação em tempo real
const camposObrigatorios = ['nome', 'email', 'telefone', 'descricao'];
camposObrigatorios.forEach(campo => {
    const input = document.getElementById(campo);
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#27ae60';
        }
    });
});

// ===== SCROLL SUAVE APENAS PARA CONTATO =====

// Adicionar evento ao link "Contato"
document.querySelectorAll('a[href="#contato"]').forEach(linkContato => {
    linkContato.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Encontrar o elemento footer ou seção de contato
        const elementoContato = document.getElementById('contato');
        const footer = document.querySelector('footer');
        const alvo = elementoContato || footer;
        
        if (alvo) {
            // Calcular posição considerando header fixo
            const headerHeight = 100;
            const posicaoContato = alvo.getBoundingClientRect().top;
            const posicaoScroll = posicaoContato + window.pageYOffset - headerHeight;
            
            // Scroll suave
            window.scrollTo({
                top: posicaoScroll,
                behavior: 'smooth'
            });
            
            // Fechar menu hamburguer no mobile
            if (window.innerWidth <= 768) {
                const navMenu = document.getElementById('nav-menu');
                const burgerMenu = document.getElementById('burger-menu');
                
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const menuIcon = burgerMenu.querySelector('.material-symbols-outlined');
                    menuIcon.textContent = 'menu';
                    burgerMenu.style.color = '#ffd8bc';
                }
            }
        }
    });
});