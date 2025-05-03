from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
import conexao

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/usuarios/cadastrar', methods=['POST'])
def inserir_usuario():
    try:
        dados = request.get_json()
        dados['data_registro'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        resposta = conexao.supabase.table('usuarios').insert(dados).execute()
        return jsonify(resposta.data), 201
    except Exception as e:
        print(f"Erro ao inserir usuário: {e}")
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/api/carrinhos/cadastrar', methods=['POST'])   
def cadastrar_carrinho():
    try:
        dados = request.get_json()
        dados['data_registro'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        resposta = conexao.supabase.table('carrinhos').insert(dados).execute()
        return jsonify(resposta.data), 201
    except Exception as e:
        print(f"Erro ao cadastrar carrinho: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/sorteios/cadastrar', methods=['POST'])
def cadastrar_sorteio():
    try:
        dados = request.get_json()
        dados['data_registro'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        resposta = conexao.supabase.tabele('sorteios').insert(dados).execute()
        return jsonify(resposta.data), 201
    except Exception as e:
        print(f"Erro ao cadastrar sorteio: {e}")
        return jsonify({"error": str(e)}), 500 

    
    
"""---------------------fim da API de cadastrar-------------------"""    
    
@app.route('/api/usuarios/buscar', methods=['GET'])
def buscar_usuarios():
    try:
        cpf = request.args.get('cpf')
        if not cpf:
            return jsonify({"error": "CPF é obrigatório"}), 400
        resposta = conexao.supabase.table('usuarios').select('*').eq('cpf', cpf).execute()
        
        if resposta.data:
            return jsonify({"usuario_existe": True}), 200
        else:
            return jsonify({"usuario_existe": False}), 404
        
    except Exception as e:
        print(f"Erro ao buscar usuário: {e}")
        return jsonify({"error": str(e)}), 500
    


if __name__ == '__main__':
    app.run(debug=True)
