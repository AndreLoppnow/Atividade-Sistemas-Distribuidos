const telefoneInput = document.getElementById('telefone');
IMask(telefoneInput, {
  mask: '(00) 00000-0000'
});

// Máscara para CPF
const cpfInput = document.getElementById('cpf');
IMask(cpfInput, {
  mask: '000.000.000-00'
});

const loginButton = document.getElementById('login');
loginButton.addEventListener('click', function() {
  window.location.href = 'login.html';
});


const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalOkButton = document.getElementById('modal-ok');

// Abre modal com mensagem personalizada
function mostrarModal(mensagem, redirecionar = false) {
  modalMessage.textContent = mensagem;
  modal.style.display = 'flex';

  if (redirecionar) {
    // Remove botão de ação visualmente (opcional)
    modalOkButton.style.display = 'none';

    // Aguarda 1 segundo e redireciona
    setTimeout(() => {
      modal.style.display = 'none';
      window.location.href = 'login.html';
    }, 3000);
  } else {
    modalOkButton.style.display = 'inline-block'; // garante que aparece nos erros
    modalOkButton.onclick = () => {
      modal.style.display = 'none';
    };
  }
}


document.getElementById('registration-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const telefone = document.getElementById('telefone').value;
  const cpf = document.getElementById('cpf').value;

  const dados = {
    nome: usuario,
    telefone: telefone,
    cpf: cpf
  };

  try {
    const resposta = await fetch('http://127.0.0.1:5000/api/usuarios/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (resposta.ok) {
      mostrarModal('Usuário registrado com sucesso!', true);
    } else {
      mostrarModal('Opss! Tivemos um problema ao registrar o usuário.');
    }
  } catch (erro) {
    console.error('Erro:', erro);
    mostrarModal('Opss! Tivemos um problema ao conectar com o servidor.');
  }
});




