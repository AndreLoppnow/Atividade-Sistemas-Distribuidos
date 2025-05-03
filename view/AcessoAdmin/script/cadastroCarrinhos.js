let carrinhos = [] // Simulação inicial, substituir por fetch ao backend
    let modoEdicao = false
    let carrinhoSelecionadoId = null

    function renderTabela() {
      const tbody = document.querySelector("#tabela-carrinhos tbody")
      tbody.innerHTML = ""

      carrinhos.forEach((item, index) => {
        const tr = document.createElement("tr")
        tr.onclick = () => selecionarCarrinho(index)
        if (carrinhoSelecionadoId === index) {
          tr.classList.add("selected")
        }

        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.idCarrinho}</td>
          <td>${item.dataRegistro}</td>
          <td>${item.status}</td>
        `
        tbody.appendChild(tr)
      })
    }

    function salvarCarrinho() {
      const input = document.getElementById("id-carrinho")
      const valor = input.value.trim()
      if (!valor) return alert("Informe o Id do Carrinho")

      if (modoEdicao && carrinhoSelecionadoId !== null) {
        carrinhos[carrinhoSelecionadoId].idCarrinho = valor
        // Aqui você atualizaria no banco de dados
      } else {
        const novo = {
          id: carrinhos.length + 1,
          idCarrinho: valor,
          dataRegistro: new Date().toLocaleString(),
          status: "Ativo"
        }
        carrinhos.push(novo)
        // Aqui você enviaria ao backend
      }

      limparFormulario()
      renderTabela()
    }

    function cancelarEdicao() {
      limparFormulario()
    }

    function limparFormulario() {
      document.getElementById("id-carrinho").value = ""
      document.querySelector(".btn-save").textContent = "Salvar"
      carrinhoSelecionadoId = null
      modoEdicao = false
      renderTabela()
    }

    function selecionarCarrinho(index) {
      const carrinho = carrinhos[index]
      document.getElementById("id-carrinho").value = carrinho.idCarrinho
      document.querySelector(".btn-save").textContent = "Atualizar"
      carrinhoSelecionadoId = index
      modoEdicao = true
      renderTabela()
    }

    // Inicializa com dados fictícios
    carrinhos = [
      { id: 1, idCarrinho: "C123", dataRegistro: "2025-04-23 10:30", status: "Ativo" },
      { id: 2, idCarrinho: "C124", dataRegistro: "2025-04-23 11:00", status: "Inativo" }
    ]
    renderTabela()