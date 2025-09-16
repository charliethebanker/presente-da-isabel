# Instruções de Personalização - Experiência Web Interativa de Presente Digital

## 🎯 Visão Geral

Esta experiência web foi criada especificamente para revelar um presente de aniversário de forma interativa e mágica. A aplicação está totalmente funcional e pronta a usar, mas pode ser facilmente personalizada.

## 📱 Como Funciona

A experiência é composta por 5 fases sequenciais:

1. **Página Inicial**: Caixa de presente 3D com animação floating
2. **Animação de Abertura**: Laço desfaz-se e caixa abre com luz dourada
3. **Cartão de Aniversário**: Mensagem personalizada com espaço para fotos
4. **Voucher do Hotel**: Detalhes profissionais da reserva
5. **Mensagem Final**: Confettis animados e mensagem de encerramento

## 🎨 Personalização Rápida

### 1. Alterar a Mensagem do Cartão

No ficheiro `script.js`, encontre esta linha e descomente-a:
```javascript
// updateCardMessage('Nova mensagem personalizada ❤️');
```

Substitua por:
```javascript
updateCardMessage('A sua mensagem personalizada aqui ❤️');
```

### 2. Alterar a Assinatura

No ficheiro `script.js`, encontre esta linha e descomente-a:
```javascript
// updateSignature('Novo Nome');
```

Substitua por:
```javascript
updateSignature('O Seu Nome');
```

### 3. Adicionar Fotos ao Carousel

No ficheiro `script.js`, encontre esta linha e descomente-a:
```javascript
// addPhotosToCarousel(['foto1.jpg', 'foto2.jpg', 'foto3.jpg']);
```

Substitua por:
```javascript
addPhotosToCarousel([
    'https://link-para-sua-foto1.jpg',
    'https://link-para-sua-foto2.jpg',
    'https://link-para-sua-foto3.jpg'
]);
```

**Nota**: As fotos devem estar hospedadas online (ex: Google Drive, Dropbox, etc.) ou colocadas na pasta do projeto.

### 4. Personalizar Detalhes do Voucher

No ficheiro `index.html`, procure a secção "FASE 4: Voucher do Hotel" e edite:

- **Nome do Hotel**: Altere "Sleep & Nature Hotel"
- **Número de confirmação**: Altere "#6749102878"
- **Beneficiário**: Altere "Isabel Santos"
- **Oferta de**: Altere "Carlos Brito"
- **Datas**: Altere as datas de check-in e check-out
- **Detalhes da acomodação**: Personalize conforme necessário

### 5. Alterar o Nome da Destinatária

No ficheiro `index.html`, procure e altere:
```html
<h1 class="main-title">Um presente especial para ti, Isabel ✨</h1>
```

Para:
```html
<h1 class="main-title">Um presente especial para ti, [NOME] ✨</h1>
```

## 🎵 Controles de Música

A aplicação inclui:
- Música de fundo automática (melodia simples de "Parabéns")
- Botão de controle no canto superior direito
- Funciona mesmo se o browser bloquear áudio automático

## 📱 Responsividade

A aplicação está totalmente otimizada para:
- ✅ Telemóveis (iOS/Android)
- ✅ Tablets
- ✅ Computadores
- ✅ Partilha no WhatsApp com preview

## 🚀 Como Partilhar

1. **WhatsApp**: Copie o link e envie - o preview aparecerá automaticamente
2. **Outras redes sociais**: Use o botão de partilha nativo do browser
3. **Email**: Copie e cole o link

## 🔧 Personalização Avançada

### Alterar Cores

No ficheiro `styles.css`, procure estas variáveis de cor:
- `#9B59B6` e `#8E44AD` - Gradiente roxo de fundo
- `#E74C3C` - Cor vermelha da caixa de presente
- `#FFD700` - Cor dourada das fitas e botões

### Adicionar Mais Fotos

Para adicionar mais de 3 fotos, edite o HTML na secção do carousel:
```html
<div class="photo-carousel">
    <div class="photo-placeholder">[ADICIONAR_FOTO_1]</div>
    <div class="photo-placeholder">[ADICIONAR_FOTO_2]</div>
    <div class="photo-placeholder">[ADICIONAR_FOTO_3]</div>
    <!-- Adicione mais divs aqui -->
</div>
```

### Personalizar Animações

No ficheiro `styles.css`, pode ajustar:
- Velocidade da animação floating: altere `3s` em `animation: floating 3s`
- Duração das transições: altere valores em `transition: all 0.3s ease`

## 📞 Suporte

Se precisar de ajuda adicional com a personalização, todos os ficheiros estão bem comentados e organizados para facilitar as modificações.

## ✨ Dicas Importantes

1. **Teste sempre** após fazer alterações
2. **Faça backup** dos ficheiros originais antes de personalizar
3. **Use URLs HTTPS** para as fotos para evitar problemas de segurança
4. **Mantenha as imagens otimizadas** para carregamento rápido no telemóvel

---

**Criado com ❤️ para uma experiência mágica e inesquecível!**

