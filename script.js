// Variáveis globais
let currentSlideIndex = 0;
let totalSlides = 13;
let isFullscreen = false;
let autoAdvanceTimer = null;
let isAutoAdvance = false;

// Elementos DOM
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const progressFill = document.querySelector('.progress-fill');
const presentationContainer = document.querySelector('.presentation-container');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    setupEventListeners();
    setupKeyboardNavigation();
    setupTouchNavigation();
    updateUI();
});

// Configuração inicial da apresentação
function initializePresentation() {
    totalSlides = slides.length;
    totalSlidesSpan.textContent = totalSlides;
    
    // Marcar primeiro slide como ativo
    slides[0].classList.add('active');
    
    // Configurar animações iniciais
    setupSlideAnimations();
    
    // Verificar suporte a fullscreen
    checkFullscreenSupport();
    
    console.log('Apresentação inicializada com', totalSlides, 'slides');
}

// Configurar event listeners
function setupEventListeners() {
    // Botões de navegação
    prevBtn.addEventListener('click', () => previousSlide());
    nextBtn.addEventListener('click', () => nextSlide());
    fullscreenBtn.addEventListener('click', () => toggleFullscreen());
    
    // Clique nos slides para avançar
    slides.forEach(slide => {
        slide.addEventListener('click', (e) => {
            if (e.target === slide || e.target.closest('.slide-content')) {
                nextSlide();
            }
        });
    });
    
    // Mudanças de fullscreen
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    // Redimensionamento da janela
    window.addEventListener('resize', handleResize);
    
    // Visibilidade da página
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Navegação por teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
            case 'f':
            case 'F11':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'Escape':
                if (isFullscreen) {
                    exitFullscreen();
                }
                break;
            case 'p':
                e.preventDefault();
                toggleAutoAdvance();
                break;
            case 'r':
                e.preventDefault();
                goToSlide(0);
                break;
            default:
                // Números para ir diretamente ao slide
                if (e.key >= '1' && e.key <= '9') {
                    const slideNumber = parseInt(e.key) - 1;
                    if (slideNumber < totalSlides) {
                        goToSlide(slideNumber);
                    }
                }
        }
    });
}

// Navegação por touch (dispositivos móveis)
function setupTouchNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;
    
    presentationContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    presentationContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Verificar se é um swipe horizontal
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                previousSlide();
            } else {
                nextSlide();
            }
        }
    }
}

// Configurar animações dos slides
function setupSlideAnimations() {
    slides.forEach((slide, index) => {
        // Adicionar classe de animação
        slide.classList.add('slide-transition');
        
        // Configurar animações específicas por tipo de slide
        if (slide.querySelector('.objectives-list')) {
            setupObjectivesAnimation(slide);
        }
        
        if (slide.querySelector('.osi-model')) {
            setupOSIAnimation(slide);
        }
        
        if (slide.querySelector('.dns-process')) {
            setupDNSAnimation(slide);
        }
    });
}

// Animação da lista de objetivos
function setupObjectivesAnimation(slide) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.fade-in-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    });
    
    observer.observe(slide);
}

// Animação do modelo OSI
function setupOSIAnimation(slide) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const layers = entry.target.querySelectorAll('.layer');
                layers.forEach((layer, index) => {
                    setTimeout(() => {
                        layer.style.transform = 'translateY(0)';
                        layer.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    });
    
    observer.observe(slide);
}

// Animação do processo DNS
function setupDNSAnimation(slide) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = entry.target.querySelectorAll('.dns-step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.transform = 'translateX(0)';
                        step.style.opacity = '1';
                    }, index * 300);
                });
            }
        });
    });
    
    observer.observe(slide);
}

// Navegar para o próximo slide
function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        goToSlide(currentSlideIndex + 1);
    }
}

// Navegar para o slide anterior
function previousSlide() {
    if (currentSlideIndex > 0) {
        goToSlide(currentSlideIndex - 1);
    }
}

// Ir para um slide específico
function goToSlide(index) {
    if (index >= 0 && index < totalSlides && index !== currentSlideIndex) {
        // Remover classe ativa do slide atual
        slides[currentSlideIndex].classList.remove('active');
        slides[currentSlideIndex].classList.add('slide-out');
        
        // Atualizar índice
        currentSlideIndex = index;
        
        // Ativar novo slide
        setTimeout(() => {
            slides.forEach(slide => slide.classList.remove('slide-out'));
            slides[currentSlideIndex].classList.add('active', 'slide-in');
            
            setTimeout(() => {
                slides[currentSlideIndex].classList.remove('slide-in');
            }, 500);
        }, 100);
        
        // Atualizar UI
        updateUI();
        
        // Trigger de eventos customizados
        triggerSlideChangeEvent();
        
        // Log para debug
        console.log('Navegando para slide', index + 1);
    }
}

// Atualizar interface do usuário
function updateUI() {
    // Atualizar contador
    currentSlideSpan.textContent = currentSlideIndex + 1;
    
    // Atualizar barra de progresso
    const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressFill.style.width = progress + '%';
    
    // Atualizar estado dos botões
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    
    // Atualizar ícone do botão fullscreen
    const icon = fullscreenBtn.querySelector('i');
    icon.className = isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!isFullscreen) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

// Entrar em fullscreen
function enterFullscreen() {
    const element = presentationContainer;
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Sair do fullscreen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Manipular mudanças de fullscreen
function handleFullscreenChange() {
    isFullscreen = !!(document.fullscreenElement || 
                     document.webkitFullscreenElement || 
                     document.mozFullScreenElement || 
                     document.msFullscreenElement);
    
    presentationContainer.classList.toggle('fullscreen', isFullscreen);
    updateUI();
    
    console.log('Fullscreen:', isFullscreen);
}

// Verificar suporte a fullscreen
function checkFullscreenSupport() {
    const element = document.documentElement;
    const isSupported = !!(element.requestFullscreen || 
                          element.webkitRequestFullscreen || 
                          element.mozRequestFullScreen || 
                          element.msRequestFullscreen);
    
    if (!isSupported) {
        fullscreenBtn.style.display = 'none';
        console.warn('Fullscreen não suportado neste navegador');
    }
}

// Manipular redimensionamento
function handleResize() {
    // Ajustar elementos responsivos se necessário
    updateUI();
}

// Manipular mudanças de visibilidade
function handleVisibilityChange() {
    if (document.hidden) {
        pauseAutoAdvance();
    } else {
        resumeAutoAdvance();
    }
}

// Toggle auto-avanço
function toggleAutoAdvance() {
    isAutoAdvance = !isAutoAdvance;
    
    if (isAutoAdvance) {
        startAutoAdvance();
        showNotification('Auto-avanço ativado (5s por slide)');
    } else {
        stopAutoAdvance();
        showNotification('Auto-avanço desativado');
    }
}

// Iniciar auto-avanço
function startAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
    }
    
    autoAdvanceTimer = setInterval(() => {
        if (currentSlideIndex < totalSlides - 1) {
            nextSlide();
        } else {
            stopAutoAdvance();
            showNotification('Fim da apresentação');
        }
    }, 5000);
}

// Parar auto-avanço
function stopAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
    isAutoAdvance = false;
}

// Pausar auto-avanço
function pauseAutoAdvance() {
    if (isAutoAdvance && autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
}

// Retomar auto-avanço
function resumeAutoAdvance() {
    if (isAutoAdvance && !autoAdvanceTimer) {
        startAutoAdvance();
    }
}

// Disparar evento de mudança de slide
function triggerSlideChangeEvent() {
    const event = new CustomEvent('slidechange', {
        detail: {
            currentSlide: currentSlideIndex,
            totalSlides: totalSlides,
            slideElement: slides[currentSlideIndex]
        }
    });
    
    document.dispatchEvent(event);
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar estilos de animação para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Funções utilitárias
const utils = {
    // Formatar tempo
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    
    // Detectar dispositivo móvel
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Copiar texto para clipboard
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copiado para a área de transferência');
        }).catch(() => {
            showNotification('Erro ao copiar');
        });
    },
    
    // Salvar progresso localmente
    saveProgress: () => {
        localStorage.setItem('presentation-progress', JSON.stringify({
            currentSlide: currentSlideIndex,
            timestamp: Date.now()
        }));
    },
    
    // Carregar progresso salvo
    loadProgress: () => {
        const saved = localStorage.getItem('presentation-progress');
        if (saved) {
            const data = JSON.parse(saved);
            const hoursSince = (Date.now() - data.timestamp) / (1000 * 60 * 60);
            
            // Só restaurar se foi salvo nas últimas 24 horas
            if (hoursSince < 24) {
                return data.currentSlide;
            }
        }
        return 0;
    }
};

// Event listeners adicionais
document.addEventListener('slidechange', (e) => {
    // Salvar progresso automaticamente
    utils.saveProgress();
    
    // Log detalhado
    console.log('Slide mudou:', e.detail);
});

// Carregar progresso ao inicializar
document.addEventListener('DOMContentLoaded', () => {
    const savedSlide = utils.loadProgress();
    if (savedSlide > 0) {
        setTimeout(() => {
            if (confirm(`Continuar da onde parou (slide ${savedSlide + 1})?`)) {
                goToSlide(savedSlide);
            }
        }, 1000);
    }
});

// Atalhos de teclado adicionais
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + teclas
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'c':
                e.preventDefault();
                utils.copyToClipboard(window.location.href + '#slide-' + (currentSlideIndex + 1));
                break;
            case 's':
                e.preventDefault();
                utils.saveProgress();
                showNotification('Progresso salvo');
                break;
        }
    }
});

// Suporte a âncoras URL
function handleURLHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#slide-')) {
        const slideNumber = parseInt(hash.replace('#slide-', '')) - 1;
        if (slideNumber >= 0 && slideNumber < totalSlides) {
            goToSlide(slideNumber);
        }
    }
}

// Atualizar URL quando slide muda
document.addEventListener('slidechange', (e) => {
    const slideNumber = e.detail.currentSlide + 1;
    window.history.replaceState(null, null, '#slide-' + slideNumber);
});

// Inicializar URL hash
window.addEventListener('load', handleURLHash);
window.addEventListener('hashchange', handleURLHash);

// Prevenção de zoom acidental em dispositivos móveis
if (utils.isMobile()) {
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Exportar funções para uso externo
window.PresentationAPI = {
    nextSlide,
    previousSlide,
    goToSlide,
    toggleFullscreen,
    toggleAutoAdvance,
    getCurrentSlide: () => currentSlideIndex,
    getTotalSlides: () => totalSlides,
    utils
};

// Mostrar ajuda inicial
setTimeout(() => {
    if (!localStorage.getItem('presentation-help-shown')) {
        showNotification('Use ← → para navegar, F para tela cheia, P para auto-avanço');
        localStorage.setItem('presentation-help-shown', 'true');
    }
}, 2000);

console.log('Script da apresentação carregado com sucesso!');
console.log('Atalhos: ← → (navegar), F (fullscreen), P (auto-avanço), ESC (sair), 1-9 (slides diretos)');
console.log('API disponível em window.PresentationAPI');