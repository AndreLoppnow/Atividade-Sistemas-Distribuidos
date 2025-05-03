document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpf');
    const devolverForm = document.getElementById('devolver-form');
  
    IMask(cpfInput, {
      mask: '000.000.000-00'
    });
  
    devolverForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const cpf = cpfInput.value;
  
      fetch(`http://127.0.0.1:5000/api/usuarios/buscar?cpf=${encodeURIComponent(cpf)}`)
        .then(async response => {
          const data = await response.json();
  
          if (data.usuario_existe) {
            mostrarModal();
          } else {
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `
            <h2>Usuario não Encontrado</h2>
            <p>Redirecionando para tela de cadastro!</p>
          `;
          modal.style.display = 'flex';
  
            setTimeout(() => {
              window.location.href = '/view/registrar.html';
            }, 2000);
          }
        })
        .catch(error => {
          console.error('Erro ao buscar usuário:', error);
          alert('Erro ao conectar com o servidor.');
        });
    });
  });
  
  function mostrarModal() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
      <h2>Obrigado pela Devolução❤️!</h2>
      <p>O valor pago na efetuação da retirada do carrinho será devolvido no próximo retorno das sobras!</p>
      <p>Você também está concorendo um vale compra, o sorteio será realizado no dia: {data}</p>
    `;
    modal.style.display = 'flex';
    setTimeout(() => {
      window.location.href = '/view/devolucao.html';
    }, 5000);
  }
  