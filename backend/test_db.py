from database import engine
try: 
    connection = engine.connect()
    print("Connection to the database was successful!")
except Exception as e:
    print("Connection Error:",e)