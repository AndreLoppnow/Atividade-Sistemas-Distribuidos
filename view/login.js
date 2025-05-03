document.addEventListener('DOMContentLoaded', () => {
  const cpfInput = document.getElementById('cpf');
  const loginForm = document.getElementById('login-form');
  const registrarButton = document.getElementById('registrar');
  const modal = document.getElementById('modal');

  IMask(cpfInput, {
    mask: '000.000.000-00'
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cpf = cpfInput.value;

    fetch(`http://127.0.0.1:5000/api/usuarios/buscar?cpf=${encodeURIComponent(cpf)}`)
      .then(async response => {
        const data = await response.json();

        if (data.usuario_existe) {
          mostrarModalPagamento();
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

function mostrarModalPagamento() {
  const qrCodeURL = 'QRCode.svg';

  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <h2>Pagamento Pix, leia o QRCode</h2>
    <img src="${qrCodeURL}" alt="QR Code Pix" style="margin: 1rem auto; max-width: 100%;" />
    <p>O valor para liberação do carrinho de compras é de <strong>R$5,00</strong></p>
    <button id="modal-ok">Ok!</button>
  `;
  modal.style.display = 'flex';

  document.getElementById('modal-ok').addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
