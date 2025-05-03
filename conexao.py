import os 
from supabase import create_client, Client

try:
    url: str = os.getenv('SUPABASE_URL')
    key: str = os.getenv('SUPABASE_KEY')
    supabase: Client = create_client(url, key)
    print("Conexão com Supabase estabelecida com sucesso!")
except Exception as e:
        print("Error creating Supabase client:", e)
        exit(1)
        
        

    
