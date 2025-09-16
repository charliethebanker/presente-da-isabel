
// Experiência Web Interativa de Presente Digital de Aniversário
// JavaScript para controlar todas as fases da experiência

class BirthdayGiftExperience {
    constructor() {
        this.currentPhase = 1;
        this.totalPhases = 5;
        this.musicPlaying = false;
        this.backgroundMusic = null;
        
        this.init();
    }
    
    init() {
        // Inicializar elementos DOM
        this.initElements();
        
        // Configurar música de fundo
        this.initMusic();
        
        // Configurar event listeners
        this.initEventListeners();
        
        // Iniciar primeira fase
        this.showPhase(1);
        
        // Adicionar efeitos especiais
        this.initSpecialEffects();
    }
    
    initElements() {
        // Fases
        this.phases = {
            1: document.getElementById('phase1'),
            2: document.getElementById('phase2'),
            3: document.getElementById('phase3'),
            4: document.getElementById('phase4'),
            5: document.getElementById('phase5')
        };
        
        // Botões
        this.openGiftBtn = document.getElementById('openGiftBtn');
        this.seeGiftBtn = document.getElementById('seeGiftBtn');
        this.finalMessageBtn = document.getElementById('finalMessageBtn');
        this.backToVoucherBtn = document.getElementById('backToVoucherBtn');
        this.musicToggle = document.getElementById('musicToggle');
        
        // Elementos especiais
        this.giftBox = document.querySelector('.gift-box');
        this.confettiContainer = document.querySelector('.confetti-container');
    }
    
    initMusic() {
        // Criar contexto de áudio para música de fundo
        this.backgroundMusic = document.getElementById('backgroundMusic');
        
        // Tentar reproduzir automaticamente (pode ser bloqueado pelo browser)
        this.backgroundMusic.volume = 0.3;
        
        // Fallback: usar Web Audio API para criar uma melodia simples
        this.createSimpleMusic();
    }
    
    createSimpleMusic() {
        // Criar uma melodia simples usando Web Audio API
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.playSimpleMelody();
        } catch (error) {
            console.log('Web Audio API não suportada');
        }
    }
    
    playSimpleMelody() {
        if (!this.audioContext) return;
        
        // Notas da melodia "Parabéns a Você" (frequências aproximadas)
        const notes = [
            { freq: 261.63, duration: 0.5 }, // C4
            { freq: 261.63, duration: 0.5 }, // C4
            { freq: 293.66, duration: 1.0 }, // D4
            { freq: 261.63, duration: 1.0 }, // C4
            { freq: 349.23, duration: 1.0 }, // F4
            { freq: 329.63, duration: 2.0 }  // E4
        ];
        
        let currentTime = this.audioContext.currentTime;
        
        notes.forEach((note, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(note.freq, currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + note.duration);
            
            currentTime += note.duration;
        });
        
        // Repetir a melodia a cada 10 segundos se a música estiver ativa
        if (this.musicPlaying) {
            setTimeout(() => {
                if (this.musicPlaying) {
                    this.playSimpleMelody();
                }
            }, 10000);
        }
    }
    
    initEventListeners() {
        // Botão para abrir presente (Fase 1 → Fase 2)
        this.openGiftBtn?.addEventListener('click', () => {
            this.startOpeningAnimation();
        });
        
        // Botão para ver presente (Fase 3 → Fase 4)
        this.seeGiftBtn?.addEventListener('click', () => {
            this.showPhase(4);
        });
        
        // Botão para mensagem final (Fase 4 → Fase 5)
        this.finalMessageBtn?.addEventListener('click', () => {
            this.showPhase(5);
            this.startConfetti();
        });
        
        // Botão para voltar ao voucher (Fase 5 → Fase 4)
        this.backToVoucherBtn?.addEventListener('click', () => {
            this.showPhase(4);
            this.stopConfetti();
        });
        
        // Controle de música
        this.musicToggle?.addEventListener('click', () => {
            this.toggleMusic();
        });
        
        // Tentar iniciar música automaticamente após primeira interação
        document.addEventListener('click', () => {
            if (!this.musicPlaying) {
                this.startMusic();
            }
        }, { once: true });
    }
    
    showPhase(phaseNumber) {
        // Esconder todas as fases
        Object.values(this.phases).forEach(phase => {
            if (phase) {
                phase.classList.remove('active');
            }
        });
        
        // Mostrar fase atual
        if (this.phases[phaseNumber]) {
            this.phases[phaseNumber].classList.add('active');
            this.phases[phaseNumber].classList.add('phase-transition');
            
            // Remover classe de transição após animação
            setTimeout(() => {
                this.phases[phaseNumber].classList.remove('phase-transition');
            }, 1000);
        }
        
        this.currentPhase = phaseNumber;
    }
    
    startOpeningAnimation() {
        // Animar a caixa de presente
        if (this.giftBox) {
            this.giftBox.style.animation = 'none';
            
            // Animar o laço desaparecendo
            const bow = this.giftBox.querySelector('.bow');
            if (bow) {
                bow.style.transition = 'all 1s ease-out';
                bow.style.transform = 'scale(0) rotate(360deg)';
                bow.style.opacity = '0';
            }
            
            // Animar a tampa abrindo
            const boxTop = this.giftBox.querySelector('.box-top');
            if (boxTop) {
                setTimeout(() => {
                    boxTop.style.transition = 'all 1s ease-out';
                    boxTop.style.transform = 'rotateX(-90deg) translateY(-50px)';
                    boxTop.style.opacity = '0.7';
                }, 500);
            }
            
            // Mostrar luz dourada
            setTimeout(() => {
                this.showPhase(2);
                
                // Após 3 segundos, ir para o cartão
                setTimeout(() => {
                    this.showPhase(3);
                }, 3000);
            }, 1500);
        }
    }
    
    startConfetti() {
        if (!this.confettiContainer) return;
        
        // Limpar confetti existente
        this.confettiContainer.innerHTML = '';
        
        // Criar múltiplos confettis
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 100);
        }
        
        // Continuar criando confetti
        this.confettiInterval = setInterval(() => {
            this.createConfetti();
        }, 300);
    }
    
    createConfetti() {
        if (!this.confettiContainer) return;
        
        const confetti = document.createElement('div');
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        const shapes = ['🎉', '🎊', '✨', '🌟', '💖', '🎈'];
        
        confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        this.confettiContainer.appendChild(confetti);
        
        // Remover confetti após animação
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
    
    stopConfetti() {
        if (this.confettiInterval) {
            clearInterval(this.confettiInterval);
        }
        if (this.confettiContainer) {
            this.confettiContainer.innerHTML = '';
        }
    }
    
    toggleMusic() {
        if (this.musicPlaying) {
            this.stopMusic();
        } else {
            this.startMusic();
        }
    }
    
    startMusic() {
        this.musicPlaying = true;
        
        // Tentar reproduzir áudio HTML
        if (this.backgroundMusic) {
            this.backgroundMusic.play().catch(() => {
                console.log('Não foi possível reproduzir áudio HTML');
            });
        }
        
        // Iniciar melodia Web Audio API
        if (this.audioContext) {
            this.playSimpleMelody();
        }
        
        // Atualizar botão
        if (this.musicToggle) {
            this.musicToggle.innerHTML = '🔊';
            this.musicToggle.style.background = 'rgba(255, 215, 0, 0.3)';
        }
    }
    
    stopMusic() {
        this.musicPlaying = false;
        
        // Parar áudio HTML
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
        
        // Atualizar botão
        if (this.musicToggle) {
            this.musicToggle.innerHTML = '🔇';
            this.musicToggle.style.background = 'rgba(255, 255, 255, 0.2)';
        }
    }
    
    initSpecialEffects() {
        // Adicionar animação CSS para confetti
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            .sparkle-effect {
                position: relative;
            }
            
            .sparkle-effect::before {
                content: '✨';
                position: absolute;
                top: -10px;
                right: -10px;
                animation: sparkleRotate 2s ease-in-out infinite;
            }
            
            @keyframes sparkleRotate {
                0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.7; }
                50% { transform: rotate(180deg) scale(1.2); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar efeito sparkle aos botões
        const buttons = document.querySelectorAll('.golden-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('sparkle-effect');
            });
            
            button.addEventListener('mouseleave', () => {
                button.classList.remove('sparkle-effect');
            });
        });
    }
}

// Inicializar a experiência quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayGiftExperience();
});

// Funcionalidades adicionais para personalização

// PERSONALIZAÇÃO: Função para adicionar fotos ao carousel
function addPhotosToCarousel(photoUrls) {
    const placeholders = document.querySelectorAll('.photo-placeholder');
    
    photoUrls.forEach((url, index) => {
        if (placeholders[index]) {
            placeholders[index].style.backgroundImage = `url(${url})`;
            placeholders[index].style.backgroundSize = 'cover';
            placeholders[index].style.backgroundPosition = 'center';
            placeholders[index].innerHTML = '';
            placeholders[index].style.border = 'none';
        }
    });
}

// PERSONALIZAÇÃO: Função para alterar a mensagem do cartão
function updateCardMessage(newMessage) {
    const messageElement = document.querySelector('.card-message p');
    if (messageElement) {
        messageElement.innerHTML = newMessage;
    }
}

// PERSONALIZAÇÃO: Função para alterar a assinatura
function updateSignature(newSignature) {
    const signatureElement = document.querySelector('.card-signature p');
    if (signatureElement) {
        signatureElement.innerHTML = newSignature;
    }
}

// Exemplo de uso das funções de personalização:
// addPhotosToCarousel(['foto1.jpg', 'foto2.jpg', 'foto3.jpg']);
// updateCardMessage('Nova mensagem personalizada ❤️');
// updateSignature('Novo Nome');

// Funcionalidade para partilha
function shareExperience() {
    if (navigator.share) {
        navigator.share({
            title: 'Presente Especial para Isabel ✨',
            text: 'Uma experiência mágica de aniversário criada especialmente para ti',
            url: window.location.href
        });
    } else {
        // Fallback: copiar URL para clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    }
}

// Adicionar botão de partilha (opcional)
function addShareButton() {
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = '📤 Partilhar';
    shareBtn.className = 'subtle-btn';
    shareBtn.style.position = 'fixed';
    shareBtn.style.bottom = '20px';
    shareBtn.style.left = '20px';
    shareBtn.style.zIndex = '1000';
    shareBtn.onclick = shareExperience;
    
    document.body.appendChild(shareBtn);
}

// Descomente a linha abaixo para adicionar botão de partilha
// addShareButton();

